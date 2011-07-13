/*global NdefPlugin, Ndef */

function shareTag() {
  var mimeType = document.forms[0].elements["mimeType"].value,
    payload = document.forms[0].elements["payload"].value,
    record = Ndef.mimeMediaRecord(mimeType, Ndef.stringToBytes(payload));

    navigator.nfc.p2p(
        [record], 
        function () { 
            navigator.notification.vibrate(100);
        }, function () {
            alert("Failed to share tag.");
        });   
}

var ready = function () {
  
  document.getElementById('button').addEventListener("click", shareTag, false); 
    
  function win() {
    console.log("Listening for NDEF tags");
  }
  
  function fail() {
    alert('Failed to register NFC Listener');
  }
  
  navigator.nfc.NdefPlugin.addNdefListener(function () { alert("Read NDEF Tag"); }, win, fail);          
};

// deviceready is being called before the plugins finish initializing
// add setTimeout as a kludge until the real problem is fixed
document.addEventListener('deviceready', function () { window.setTimeout(ready, 500); }, false);