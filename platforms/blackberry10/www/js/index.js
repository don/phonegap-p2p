/*jshint quotmark: false */
/*global nfc, ndef, toast, alert, cordova, checkbox */

"use strict";

var isBlackBerry = (cordova.platformId === 'blackberry10');

function disableUI() {
    document.forms[0].elements.mimeType.disabled = true;
    document.forms[0].elements.payload.disabled = true;
}

function enableUI() {
    document.forms[0].elements.mimeType.disabled = false;
    document.forms[0].elements.payload.disabled = false;
}

function unshareMessage() {

    enableUI();

    nfc.unshare(
        function () {
            navigator.notification.vibrate(100);
            toast.showShort("Message is no longer shared.");
        }, function (reason) {
            alert("Failed to unshare message " + reason);
        });
}

function shareMessage() {
    var mimeType = document.forms[0].elements.mimeType.value,
        payload = document.forms[0].elements.payload.value,
        record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

    if (!isBlackBerry) {
        // BlackBerry's card hides the UI
        // only disable for Android
        disableUI();
    }
    
    nfc.share(
        [record],
        function () {
            if (isBlackBerry) {
                // BUG: blackberry calls this as soon as the Card appears
                checkbox.checked = false;
            } else {
                navigator.notification.vibrate(100);
                toast.showLong("Sent Message to Peer");
            }
        }, function (reason) {
            alert("Failed to share tag " + reason);
            // when NDEF_PUSH_DISABLED, open setting and enable Android Beam
        });
}

function onChange(e) {
    if (e.target.checked) {
        shareMessage();
    } else {
        unshareMessage();
    }
}

var ready = function () {
    document.getElementById('checkbox').addEventListener("change", onChange, false);
    document.getElementById('sample').addEventListener("click", showSampleData, false);
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

    if (mimeTypeField.disabled) {        
        if (toast) {
            toast.showLong("Unshare Tag to edit data");
        } else {
            alert("Unshare Tag to edit data");
        }
        return false;
    }

    index++;
    if (index >= data.length) {
        index = 0;
    }

    mimeTypeField.value = record.mimeType;
    payloadField.value = record.payload;
    return false;
}
