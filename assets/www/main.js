/*global Ndef */

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
};

document.addEventListener('deviceready', ready, false);