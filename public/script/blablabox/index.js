import { attendees } from "./attendees.js";
import { notSupported, askPermission, permissionGranted } from "./helpers.js";

const title = document.getElementById('card-scanner-title');
const button = document.getElementById('card-scanner-button');

window.onload = function() {
  if (!('NDEFReader' in window)) {
    notSupported()
  } else {
    navigator.permissions.query({ name: 'nfc'}).then(result => {
      result.state === 'granted' ? permissionGranted() : askPermission()
    })
  }


  button.addEventListener("click", async () => {
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
}


async function searchAttendee(ticketNumber) {
  const attendee = attendees.find(attendee => attendee.number === ticketNumber)
  if(attendee) {
    title.innerHTML = `Welcome ${attendee.name}!`
  } else {
    title.innerHTML = "Sorry, you are not on the list"
  }
}