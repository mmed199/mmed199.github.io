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
}

