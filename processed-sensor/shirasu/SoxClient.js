// server info (DO NOT EDIT)
var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";
var jid = "guest@sox.ht.sfc.keio.ac.jp";
var password = "miroguest";

// prepate varibles (these cannot be used in processing.js)
var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.amount = 2;

// prepare getter methods to call from processing.js
function getEnoshimaShirasuAmount() {
    return EnoshimaSensorInfo.amount;
}

// called when received sensor data
function eventListener(device, transducer) {
    var today = getToday();

    // check if the device name is the one you want
    if(device=="しらすの入荷情報湘南") {
        // EDIT below depending on which transducer you want to use
        if (transducer.id == "入荷情報") {
            EnoshimaSensorInfo.shirasu = transudcer.sensorData.rawValue;

            if (transudcer.sensorData.rawValue.indexOf(today) < 0) {
                // 未入荷
                EnoshimaSensorInfo.amount = 1;

                return;
            }

            if (transudcer.sensorData.rawValue.indexOf("未入荷") >= 0) {
                // 未入荷
                EnoshimaSensorInfo.amount = 1;
            }
            else if (transudcer.sensorData.rawValue.indexOf("入荷") >= 0) {
                if (transudcer.sensorData.rawValue.indexOf("僅か") >= 0) {
                    // 入荷僅か
                    EnoshimaSensorInfo.amount = 1;
                }
                else {
                    // 入荷
                    EnoshimaSensorInfo.amount = 0;
                }
            }
            else {
                // 未入荷
                EnoshimaSensorInfo.amount = 1;
            }
        }
    }
}

function getToday() {
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    var today =  month + "月" + day + "日";

    return today;
}

// create new SoxClient when page is loaded
$(document).ready(function() {
    var client = new SoxClient(boshService, xmppServer, jid, password);
    var soxEventListener = new SoxEventListener();
    soxEventListener.connected = function(soxEvent) {
        console.log("[SoxClient.js]" + soxEvent.soxClient);
        status("Connected: " + soxEvent.soxClient);
        client.unsubscribeAll();

        // change the device name depending on which device you want to subscribe
        var device = new Device("しらすの入荷情報湘南");

        if (!client.subscribeDevice(device)) {
            status("Couldn't send subscription request: " + device);
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
        // status("Sensor data received: " + soxEvent.device);
        var transducers = soxEvent.device.transudcers;

        transudcers.forEach(function(transudcer) {
            eventListener(soxEvent.device.name, transudcer);
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
