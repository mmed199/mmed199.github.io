import { constants } from "./constants.js";

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
}

export async function permissionGranted() {
  title.innerHTML = constants.SCAN_CARD_TITLE;
  button.innerHTML = constants.SCAN_CARD_BUTTON;
  // Show the write button
  writeButton.style.display = "block";
}

writeButton.addEventListener("click", () => {
  showWriteBlock();
});

export async function showWriteBlock() {
    writeBlock.style.display = "block";
    ticketBlock.style.display = "none";
}

export async function showTicketBlock() {
    writeBlock.style.display = "none";
    ticketBlock.style.display = "block";
}

export async function hideWriteBlock() {
    writeBlock.style.display = "none";
}

export async function getTicketNumber() {
  return document.getElementById("writer-input").value;
}