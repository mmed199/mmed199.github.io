import { constants } from "./constants.js";
import { attendees } from "./attendees.js";


const title = document.getElementById("card-scanner-title");
const button = document.getElementById("card-scanner-button");
const writeButton = document.getElementById("card-writer-button");
const writeBlock = document.getElementById("write-block");
const ticketBlock = document.getElementById("ticket-block");

// Helpers
export async function notSupported() {
  title.innerHTML = constants.NFC_NOT_SUPPORTED_TITLE;
  button.innerHTML = constants.NFC_NOT_SUPPORTED_BUTTON;
  // Hide the write button
  writeButton.style.display = "none";

  // writeBlock.style.display = "none";
  // ticketBlock.style.display = "none";
}

export async function askPermission() {
  title.innerHTML = constants.ASK_PERMISSION_TITLE;
  button.innerHTML = constants.ASK_PERMISSION_BUTTON;
  // Hide the write button
  writeButton.style.display = "none";
  writeBlock.style.display = "none";
  ticketBlock.style.display = "none";
}

export async function permissionGranted() {
  title.innerHTML = constants.SCAN_CARD_TITLE;
  button.innerHTML = constants.SCAN_CARD_BUTTON;
  // Show the write button
  writeButton.style.display = "flex";

    writeBlock.style.display = "none";
    ticketBlock.style.display = "none";
}

writeButton.addEventListener("click", () => {
  showWriteBlock();
});

export async function showWriteBlock() {
  writeBlock.style.display = "flex";
  ticketBlock.style.display = "none";
}

export async function showTicketBlock() {
  writeBlock.style.display = "none";
  ticketBlock.style.display = "flex";
}

export async function hideAll() {
    permissionGranted();
  writeBlock.style.display = "none";
  ticketBlock.style.display = "none";
}

export function getTicketNumber() {
  return document.getElementById("writer-input").value;
}

export function searchAttendee(ticketNumber) {
    const attendee = attendees.find(attendee => attendee.number === ticketNumber)
    
    const name = document.getElementById("attendee-name");
    const email = document.getElementById("attendee-email");
    const github = document.getElementById("attendee-github");
    const number = document.getElementById("attendee-ticket-number");

    if(attendee) {
        name.innerHTML = attendee.name;
        email.innerHTML = attendee.email;
        github.innerHTML = attendee.github;
        number.innerHTML = 'N ' + attendee.number;
        showTicketBlock();
    } else {
        title.innerHTML = "Attendee not found. Try another one?";
    }
}