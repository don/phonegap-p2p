/*global Ndef */

function onChange(e) {
    if (e.target.checked) {
        shareTag();
    } else {
        unshareTag();
    }
}

function unshareTag() {
    navigator.nfc.unshareTag(
        function () {
            navigator.notification.vibrate(100);
            setTimeout(function() {
                navigator.notification.vibrate(100);
            }, 200);
        }, function () {
            alert("Failed to unshare tag.");
        });
}

function shareTag() {
    var mimeType = document.forms[0].elements["mimeType"].value,
        payload = document.forms[0].elements["payload"].value,
        record = Ndef.mimeMediaRecord(mimeType, Ndef.stringToBytes(payload));

    navigator.nfc.shareTag(
        [record],
        function () {
            navigator.notification.vibrate(100);
        }, function () {
            alert("Failed to share tag.");
        });
}

var ready = function () {
    document.getElementById('checkbox').addEventListener("change", onChange, false);
};

document.addEventListener('deviceready', ready, false);