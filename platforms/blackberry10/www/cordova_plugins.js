cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.blackberry.invoke/www/client.js",
        "id": "com.blackberry.invoke.client",
        "clobbers": [
            "blackberry.invoke"
        ]
    },
    {
        "file": "plugins/com.chariotsolutions.nfc.plugin/www/phonegap-nfc.js",
        "id": "com.chariotsolutions.nfc.plugin.NFC",
        "runs": true
    },
    {
        "file": "plugins/com.chariotsolutions.nfc.plugin/www/phonegap-nfc.js",
        "id": "com.chariotsolutions.nfc.plugin.NFC",
        "runs": true
    },
    {
        "file": "plugins/com.chariotsolutions.nfc.plugin/www/phonegap-nfc-blackberry.js",
        "id": "com.chariotsolutions.nfc.plugin.NFCBB10",
        "runs": true
    },
    {
        "file": "plugins/com.chariotsolutions.toast.plugin/www/phonegap-toast.js",
        "id": "com.chariotsolutions.toast.plugin.Toasty",
        "clobbers": [
            "toast"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
        "id": "org.apache.cordova.vibration.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.vibration/www/blackberry10/vibrate.js",
        "id": "org.apache.cordova.vibration.vibrate",
        "clobbers": [
            "window.navigator.notification.vibrate"
        ]
    }
]
});