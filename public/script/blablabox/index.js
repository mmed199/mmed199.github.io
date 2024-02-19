import { attendees } from "./attendees.js";
import { notSupported, askPermission, permissionGranted, hideWriteBlock, showWriteBlock, getTicketNumber } from "./helpers.js";

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
      const ndef = new NDEFReader();
      await ndef.scan();

      ndef.addEventListener("readingerror", () => {
        title.innerHTML = "Argh! Cannot read data from the atendee card. Try another one?"
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
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

  buttonScan.addEventListener("click", async () => {
    const ndef = new NDEFReader();
    const ticketNumber = await getTicketNumber();
    await ndef.write(ticketNumber);
    hideWriteBlock();
  });
}


async function searchAttendee(ticketNumber) {
  const attendee = attendees.find(attendee => attendee.number === ticketNumber)
  if(attendee) {
    title.innerHTML = `Welcome ${attendee.name}!`
  } else {
    title.innerHTML = "Sorry, you are not on the list"
  }
}