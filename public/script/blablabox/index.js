window.onload = function() {
  if ('NDEFReader' in window) {
      navigator.permissions.query({ name: 'nfc'}).then(result => {
          if (result.state === 'granted') {
              document.getElementById('card-scanner-title').innerHTML = 'Scan your card'
          } else {
            document.getElementById('card-scanner-title').innerHTML = 'Please allow access to NFC'
          }
      })
  } else {
    document.getElementById('card-scanner-title').innerHTML = 'NFC not supported'
  }
}