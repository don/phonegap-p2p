/*jshint quotmark: false */
/*global nfc, ndef, toast, alert, cordova, checkbox, statusDiv, sample */

"use strict";

var android = (cordova.platformId === 'android'),
    windowsphone = (cordova.platformId === 'windowsphone'),
    bb10 = (cordova.platformId === 'blackberry10'),
    sampleData;

var app = {
    sampleDataIndex: 0,
    initialize: function () {
        this.bind();
    },
    bind: function () {
        document.addEventListener('deviceready', app.deviceready, false);
    },
    deviceready: function () {
        document.getElementById('checkbox').addEventListener('change', app.toggleCheckbox, false);
        sample.addEventListener('click', app.showSampleData, false);
    },
    disableUI: function () {
        document.forms[0].elements.mimeType.disabled = true;
        document.forms[0].elements.payload.disabled = true;
    },
    enableUI: function () {
        document.forms[0].elements.mimeType.disabled = false;
        document.forms[0].elements.payload.disabled = false;
    },
    shareMessage: function () {
        var mimeType = document.forms[0].elements.mimeType.value,
            payload = document.forms[0].elements.payload.value,
            record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

        app.disableUI();

        nfc.share(
            [record],
            function () {
                if (bb10) {
                    // Blackberry calls success as soon as the Card appears
                    checkbox.checked = false;
                    app.enableUI();
                } else if (windowsphone) {
                    // Windows phone calls success immediately. Bug?
                    app.notifyUser("Sharing Message");
                } else {
                    // Android call the success callback when the message is sent to peer
                    navigator.notification.vibrate(100);
                    app.notifyUser("Sent Message to Peer");
                }
            }, function (reason) {
                alert("Failed to share tag " + reason);
                checkbox.checked = false;
                app.enableUI();
            }
        );
    },
    unshareMessage: function () {
        app.enableUI();

        nfc.unshare(
            function () {
                navigator.notification.vibrate(100);
                app.notifyUser("Message is no longer shared.");
            }, function (reason) {
                alert("Failed to unshare message " + reason);
            }
        );
    },
    notifyUser: function (message) {
        if (android) {
            toast.showShort(message);
        } else {
            statusDiv.innerHTML = message;
            setTimeout(function() {
                statusDiv.innerHTML = "";
            }, 3000);
        }
    },
    showSampleData: function() {
        var mimeTypeField = document.forms[0].elements.mimeType,
          payloadField = document.forms[0].elements.payload,
          record = sampleData[app.sampleDataIndex];

        if (mimeTypeField.disabled) {
            app.notifyUser("Unshare Message to edit data");
            return false;
        }

        app.sampleDataIndex++;
        if (app.sampleDataIndex >= sampleData.length) {
            app.sampleDataIndex = 0;
        }

        mimeTypeField.value = record.mimeType;
        payloadField.value = record.payload;
        return false;
    },
    toggleCheckbox: function (e) {
        if (e.target.checked) {
            app.shareMessage();
        } else {
            app.unshareMessage();
        }
    }
};

sampleData = [
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
