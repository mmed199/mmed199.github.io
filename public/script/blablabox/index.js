const NFC_NOT_SUPPORTED = {
  title : 'NFC not supported',
  button : '/'
}
const SCAN_CARD = {
  title : 'Please scan the attendee card',
  button : 'Scan'
}

const ASK_PERMISSION = {
  title : 'Please allow access to NFC to scan the attendee card',
  button : 'Give permission'
}

const title = document.getElementById('card-scanner-title');
const button = document.getElementById('card-scanner-button');

window.onload = function() {
  if (!('NDEFReader' in window)) {
    title.innerHTML = NFC_NOT_SUPPORTED.title
    button.innerHTML = NFC_NOT_SUPPORTED.button
  } else {
    navigator.permissions.query({ name: 'nfc'}).then(result => {
      if (result.state === 'granted') {
        title.innerHTML = SCAN_CARD.title
        button.innerHTML = SCAN_CARD.button
      } else {
        title.innerHTML = ASK_PERMISSION.title
        button.innerHTML = ASK_PERMISSION.button
      }
    })
  }


  button.addEventListener("click", async () => {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      title.innerHTML = SCAN_CARD.title
      button.innerHTML = SCAN_CARD.button

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

