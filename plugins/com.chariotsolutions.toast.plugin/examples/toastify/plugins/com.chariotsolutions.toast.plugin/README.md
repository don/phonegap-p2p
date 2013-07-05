Toasty - PhoneGap Toast Notification Plugin
===========================================

Shows an Android Toast Notification

* toast.showShort(message);
* toast.showLong(message);

Cancel an Android Toast Notification

* toast.cancel();

Supported Platforms
--------------------
* Android

Adding Toasty to your project
------------------------------

These instructions assume your project is using PhoneGap-2.8+

    $ plugman --platform android --project /path/to/your/project --plugin /path/to/toasty
    
or if you're using cordova-cli

    $ cordova plugin install /path/to/toasty

Once the the plugin is installed, toast will be available on the document object. There is no need to modify your javascript imports.
    
    toast.showLong("hello, world");
