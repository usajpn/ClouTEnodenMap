// server info (DO NOT EDIT)
var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";
var jid = "guest@sox.ht.sfc.keio.ac.jp";
var password = "miroguest";

// (EDIT) Prepare varibles (but these cannot be used in processing.js)
var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.humid = 0;
EnoshimaSensorInfo.temperature = 0;

/*
 * (EDIT) Prepare getter methods to call from processing.js
 * To use javascript variables in processing.js
 *  you have to call by getter methods
 *
 */
function getEnoshimaCondition() {
    var comfortness = getComfortness(EnoshimaSensorInfo.temperature, EnoshimaSensorInfo.humid); 

    return comfortness;
}
function getComfortness(temperature, humid) {
    var comfortness = 0;
    var discomfortness = 0.81 * temperature + 0.01 * humid * (0.99 * temperature - 14.3) + 46.3;

    if (discomfortness > 80) {
        // not good
        comfortness = 0;
    }
    else if (discomfortness > 75) {
        // good
        comfortness = 1;
    }
    else if (discomfortness > 60) {
        // sooooo good
        comfortness = 2;
    }
    else {
        // not good
        comfortness = 0;
    }

    if (humid > 75) {
        comfortness = 0;
    }
    if (temperature < 18) {
        comfortness = 0;
    }

    return comfortness;
}

// Called when received sensor data
function eventListener(device, transducer) {
    // (EDIT) check if the DEVICE name is the one you want
    if(device=="江ノ島ヨットハーバー"){
        /*
         * (EDIT) change below statements depending on
         * which TRANSDUCER & what VALUE you want to use
         */
        if (transducer.id == "気温") {
            EnoshimaSensorInfo.temperature = transducer.sensorData.rawValue;
        }
        if (transducer.id == "湿度") {
            EnoshimaSensorInfo.humid = transducer.sensorData.rawValue;
        }
    }
}

// Create new SoxClient when page is loaded
$(document).ready(function() {
    var client = new SoxClient(boshService, xmppServer, jid, password);
    var soxEventListener = new SoxEventListener();
    soxEventListener.connected = function(soxEvent) {
        console.log("[SoxClient.js]" + soxEvent.soxClient);
        status("Connected: " + soxEvent.soxClient);
        client.unsubscribeAll();

        var device = new Device("江ノ島ヨットハーバー");

        if (!client.subscribeDevice(device)) {
            status("[SoxClient.js] Couldn't get device list: " + soxEvent.soxClient);
        }
    };
    soxEventListener.connectionFailed = function(soxEvent) {
        status("Connection Failed: " + soxEvent.soxClient);
    };
    soxEventListener.subscribed = function(soxEvent) {
        status("Subscribed: " + soxEvent.device);
    };
    soxEventListener.subscriptionFailed = function(soxEvent) {
        status("Subscription Failed: " + soxEvent.device);
    };
    soxEventListener.metaDataReceived = function(soxEvent) {
        status("Meta data received: " + soxEvent.device);
    };
    soxEventListener.sensorDataReceived = function(soxEvent) {
        status("Sensor data received: " + soxEvent.device);
        var transducers = soxEvent.device.transducers;

        transducers.forEach(function(transducer) {
            eventListener(soxEvent.device.name, transducer);
        });
    };

    client.setSoxEventListener(soxEventListener);
    client.connect();
});

function status(message) {
    // var html = (new Date().toLocaleString() + " [SoxClient.js] " + message +
    //     "<hr>\n" + $("#status").html());
    // $("#status").html(html);
    console.log("-------------------------------------");
    console.log(message);
    console.log("-------------------------------------");
}
