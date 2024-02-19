import { notSupported, askPermission, permissionGranted, hideAll, getTicketNumber, searchAttendee } from "./helpers.js";

const title = document.getElementById('card-scanner-title');
const buttonScan = document.getElementById('card-scanner-button');
const buttonWrite = document.getElementById('write-button');

window.onload = function() {
  if (!('NDEFReader' in window)) {
    notSupported()
  } else {
    navigator.permissions.query({ name: 'nfc'}).then(result => {
      result.state === 'granted' ? permissionGranted() : askPermission()
    })
  }


  buttonScan.addEventListener("click", async () => {
    try {
      title.innerHTML = "Scanning..."
      const ndef = new NDEFReader();
      await ndef.scan();

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        title.innerHTML = "Card found"
        for (const record of message.records) {
                
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
    const ndef = new NDEFReader();
    const ticketNumber = getTicketNumber();
    await ndef.write(ticketNumber);
    hideAll();
  });
}
