/*global Ndef */

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
        mimeType: 'text/x-vCard',
        payload: 'BEGIN:VCARD\n' +
            'VERSION:2.1\n' +
            'N:Griffin;Kevin;;;\n' +
            'FN:Kevin Griffin\n' +
            'ORG:Chariot Solutions;\n' +
            'URL:http://chariotsolutions.com\n' +
            'TEL;WORK:215-358-1780\n' +
            'EMAIL;WORK:kgriffin@chariotsolutions.com\n' +
            'END:VCARD'
    },
    {
        mimeType: 'game/rockpaperscissors',
        payload: 'Rock'
    },
    {
        mimeType: 'text/pg',
        payload: 'Hello PhoneGap'
    },
    {
        mimeType: '',
        payload: ''
    }
];

var index = 0;
function showSampleData() {
    var mimeTypeField = document.forms[0].elements["mimeType"],
      payloadField = document.forms[0].elements["payload"],
      record = data[index];
    
    index++;
    if (index >= data.length) {
        index = 0;
    }
    
    mimeTypeField.value = record.mimeType;
    payloadField.value = record.payload;    
}

document.addEventListener("menubutton", showSampleData, false);