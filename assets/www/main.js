/*global nfc */

function unshareTag() {
    nfc.unshare(
        function () {
            navigator.notification.vibrate(100);
            setTimeout(function() {
                navigator.notification.vibrate(100);
            }, 200);
        }, function (reason) {
            alert("Failed to unshare tag " + reason);
        });
}

function shareTag() {
    var mimeType = document.forms[0].elements.mimeType.value,
        payload = document.forms[0].elements.payload.value,
        record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

    nfc.share(
        [record],
        function () {
            navigator.notification.vibrate(100);
        }, function (reason) {
            alert("Failed to share tag " + reason);
            // when NDEF_PUSH_DISABLED, open setting and enable Android Beam
        });
}

function onChange(e) {
    if (e.target.checked) {
        shareTag();
    } else {
        unshareTag();
    }
}

var ready = function () {
    document.getElementById('checkbox').addEventListener("change", onChange, false);
};

document.addEventListener('deviceready', ready, false);

var data = [
    {
        mimeType: 'text/pg',
        payload: 'Hello PhoneGap'
    },
    {
        mimeType: 'game/rockpaperscissors',
        payload: 'Rock'
    },
    {
        mimeType: 'text/x-vCard',
        payload: 'BEGIN:VCARD\n' +
            'VERSION:2.1\n' +
            'N:Coleman;Don;;;\n' +
            'FN:Don Coleman\n' +
            'ORG:Chariot Solutions;\n' +
            'URL:http://chariotsolutions.com\n' +
            'TEL;WORK:215-358-1780\n' +
            'EMAIL;WORK:dcoleman@chariotsolutions.com\n' +
            'END:VCARD'
    },
    {
        mimeType: '',
        payload: ''
    }
];

var index = 0;
function showSampleData() {
    var mimeTypeField = document.forms[0].elements.mimeType,
      payloadField = document.forms[0].elements.payload,
      record = data[index];
    
    index++;
    if (index >= data.length) {
        index = 0;
    }
    
    mimeTypeField.value = record.mimeType;
    payloadField.value = record.payload;    
}
