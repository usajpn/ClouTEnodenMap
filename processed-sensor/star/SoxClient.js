var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";
var jid = "guest@sox.ht.sfc.keio.ac.jp";
var password = "miroguest";

var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.starInfo = "";
EnoshimaSensorInfo.starStatus = 0;

function getEnoshimaStarStatus() {
    return EnoshimaSensorInfo.starStatus;
}

function getEnoshimaStarInfo() {
    return EnoshimaSensorInfo.starInfo;
}

function eventListener(device, transducer, data) {
    if(device.nodeName=="江ノ島今日の生活指数"){
        if (transducer.name == "星空") {
            EnoshimaSensorInfo.starInfo = data.rawValue;
            console.log(data.rawValue);

            if (data.rawValue.indexOf("空一杯") >= 0 || data.rawValue.indexOf("まずまず") >= 0) {
                EnoshimaSensorInfo.starStatus = 1;
            }
            else if (data.rawValue.indexOf("期待") >= 0 || data.rawValue.indexOf("わずか") >= 0) {
                EnoshimaSensorInfo.starInfo = "星空は期待できなさそう。残念。";
                EnoshimaSensorInfo.starStatus = 0;
            }
            else {
                EnoshimaSensorInfo.starInfo = "星空は期待できなさそう。残念。";
                EnoshimaSensorInfo.starStatus = 1;
            }
        }
    }
}

$(document).ready(function() {
    var client = new SoxClient(boshService, xmppServer, jid, password);
    var soxEventListener = new SoxEventListener();
    soxEventListener.connected = function(soxEvent) {
        console.log("[SoxClient.js]" + soxEvent.soxClient);
        status("Connected: " + soxEvent.soxClient);

        var device = new Device("江ノ島今日の生活指数");

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
        status("Sensor data received: " + soxEvent.device);
        // eventListener(soxEvent.device, soxEvent.transducer, soxEvent.data);
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
