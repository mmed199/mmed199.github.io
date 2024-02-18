const NFC_NOT_SUPPORTED = 'NFC not supported'

const SCAN_CARD = 'Please scan the attendee card'
const ASK_PERMISSION = 'Please allow access to NFC'

const title = document.getElementById('card-scanner-title');


window.onload = function() {
  if (!('NDEFReader' in window)) {
    title.innerHTML = NFC_NOT_SUPPORTED
  } else {
    navigator.permissions.query({ name: 'nfc'}).then(result => {
      if (result.state === 'granted') {
        title.innerHTML = SCAN_CARD
      } else {
        title.innerHTML = ASK_PERMISSION
      }
    })
  }

  const scanButton = document.getElementById('ask-permission')

  scanButton.addEventListener("click", async () => {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      title.innerHTML = 'Scan your card'

      ndef.addEventListener("readingerror", () => {
        title.innerHTML = "Argh! Cannot read data from the atendee card. Try another one?"
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        title.innerHTML = `> Serial Number: ${serialNumber}`
      });

    } catch (error) {
      title.innerHTML = "Argh! " + error
    }
  });
}

