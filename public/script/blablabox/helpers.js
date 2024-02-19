import { constants } from "./constants.js";

// Helpers
export async function notSupported() {
  const title = document.getElementById("card-scanner-title");
  const button = document.getElementById("card-scanner-button");

  title.innerHTML = constants.NFC_NOT_SUPPORTED_TITLE;
  button.innerHTML = constants.NFC_NOT_SUPPORTED_BUTTON;
}

export async function askPermission() {
  const title = document.getElementById("card-scanner-title");
  const button = document.getElementById("card-scanner-button");

  title.innerHTML = constants.ASK_PERMISSION_TITLE;
  button.innerHTML = constants.ASK_PERMISSION_BUTTON;
}

export async function permissionGranted() {
  const title = document.getElementById("card-scanner-title");
  const button = document.getElementById("card-scanner-button");

  title.innerHTML = constants.SCAN_CARD_TITLE;
  button.innerHTML = constants.SCAN_CARD_BUTTON;
}
