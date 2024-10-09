import { notSupported, askPermission, permissionGranted, hideAll, getTicketNumber, searchAttendee } from "./helpers.js";

const title = document.getElementById('card-scanner-title');
const buttonScan = document.getElementById('card-scanner-button');
const buttonWrite = document.getElementById('write-button');

window.onload = function() {

  // 1 - Check if the browser supports NFC
  if('NDEFReader' in window) {
    navigator.permissions.query({ name: "nfc" }).then(permissionStatus => {
      permissionStatus.state === 'granted' ? permissionGranted() : askPermission();
    });
  } else {
    notSupported();
  }


  buttonScan.addEventListener("click", async () => {
    try {
      title.innerHTML = "Scanning..."

      // 3 - Scan the NFC tag
      const ndef = new NDEFReader();
      await ndef.scan();

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        title.innerHTML = "Card found"
        for (const record of message.records) {
          
          // 4 - Read the text record
          if(record.recordType == "text") {
              const textDecoder = new TextDecoder(record.encoding)
              searchAttendee(textDecoder.decode(record.data))
          }
        }
      });

    } catch (error) {
      title.innerHTML = "Argh! " + error
    }
  });

  buttonWrite.addEventListener("click", async () => {
    title.innerHTML = 'Writing...'
    const ticketNumber = getTicketNumber();

    // 5 - Write the ticket number to the NFC tag
    const ndef = new NDEFReader();
    await ndef.write(ticketNumber);

    hideAll();
  });
}
