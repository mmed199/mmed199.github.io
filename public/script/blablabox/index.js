window.onload = function() {
  if (!('NDEFReader' in window)) {
    document.getElementById('card-scanner-title').innerHTML = 'NFC not supported'
  }

  const scanButton = document.getElementById('ask-permission')

  scanButton.addEventListener("click", async () => {
    document.getElementById('card-scanner-title').innerHTML = "User clicked scan button"

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      document.getElementById('card-scanner-title').innerHTML = 'Scan your card'

      ndef.addEventListener("readingerror", () => {
        document.getElementById('card-scanner-title').innerHTML = "Argh! Cannot read data from the NFC tag. Try another one?"
      });

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        document.getElementById('card-scanner-title').innerHTML = `> Serial Number: ${serialNumber}`
      });
    } catch (error) {
      document.getElementById('card-scanner-title').innerHTML = "Argh! " + error
    }
  });
}

