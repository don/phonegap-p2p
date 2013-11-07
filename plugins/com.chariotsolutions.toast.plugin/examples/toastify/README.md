Toastify - Example application for Toast plugin

Copy the example to a new directory.  

    $ cp -R ~/Toasty/examples/toastify ~/toastify
    
You need to copy the project to a new directory, otherwise the plugin installer will fail.

This code requires [cordova-cli](https://github.com/apache/cordova-cli), which require [node.js](http://nodejs.org)
    
    $ npm install cordova -g
    
Adding platforms generates the native projects

    $ cordova platform add android
    
Install the Toast plugin with cordova

    $ cordova plugin add ~/Toasty
    
Build and deploy to an Android device. 

    $ cordova run
    

    
