window.onload = async function() {
  // Check if the Web NFC API is supported
  if ('NDEFReader' in window) {
    // Request NFC permission
    navigator.permissions.query({ name: 'nfc' }).then(nfcPermission => {
      const cardScannerTitle = document.querySelector('.card-scanner-title');

      if (nfcPermission.state === 'granted') {
        // NFC permission granted, you can now use the Web NFC API
        cardScannerTitle.textContent = 'NFC is supported and permission is granted';
      } else if (nfcPermission.state === 'prompt') {
        // NFC permission prompt shown, wait for user's response
        nfcPermission.onchange = () => {
          if (nfcPermission.state === 'granted') {
            cardScannerTitle.textContent = 'NFC is supported and permission is granted';
          } else {
            // NFC permission denied, handle accordingly
            cardScannerTitle.textContent = 'NFC is supported but permission is denied';
          }
        };
      } else {
        // NFC permission denied, handle accordingly
        cardScannerTitle.textContent = 'NFC is supported but permission is denied';
      }
    });
  } else {
    // Web NFC API not supported, handle accordingly
    const cardScannerTitle = document.querySelector('.card-scanner-title');
    cardScannerTitle.textContent = 'NFC is not supported';
    console.log('NFC is not supported');
  }


  const askPermissionButton = document.querySelector('.ask-permission-button');
  askPermissionButton.addEventListener('click', async () => {
    navigator.permissions.query({ name: 'nfc'}).then(async result => {
      const cardScannerTitle = document.querySelector('.card-scanner-title');

      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        log("> Scan started");
    
        ndef.addEventListener("readingerror", () => {
          log("Argh! Cannot read data from the NFC tag. Try another one?");
        });
    
        ndef.addEventListener("reading", ({ message, serialNumber }) => {
          log(`> Serial Number: ${serialNumber}`);
          log(`> Records: (${message.records.length})`);
        });
      } catch (error) {
        log("Argh! " + error);
      }
  })
  });
}

