var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.amount = 2;

function getEnoshimaShirasuAmount() {
    return EnoshimaSensorInfo.amount;
}

function eventListener(device, transducer, data) {
    var today = getToday();

    if(device.nodeName=="しらすの入荷情報湘南"){
        if (transducer.name == "入荷情報") {
            EnoshimaSensorInfo.shirasu = data.rawValue;

            if (data.rawValue.indexOf(today) < 0) {
                // 未入荷
                EnoshimaSensorInfo.amount = 1;

                return;
            }

            if (data.rawValue.indexOf("未入荷") >= 0) {
                // 未入荷
                EnoshimaSensorInfo.amount = 1;
            }
            else if (data.rawValue.indexOf("入荷") >= 0) {
                if (data.rawValue.indexOf("僅か") >= 0) {
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

// $(document).ready(function() {
window.onload = function() {
    var client = new SoxClient("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
    var soxEventListener = new SoxEventListener();
    soxEventListener.connected = function(soxEvent) {
        console.log("[SoxClient.js]" + soxEvent.soxClient);
        status("Connected: " + soxEvent.soxClient);

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
        console.log("-------------------------------------");
        console.log("subscribed: " + soxEvent.device);
        console.log("-------------------------------------");
    };
    soxEventListener.subscriptionFailed = function(soxEvent) {
        status("Subscription Failed: " + soxEvent.device);
    };
    soxEventListener.metaDataReceived = function(soxEvent) {
        status("Meta data received: " + soxEvent.device);
        console.log("-------------------------------------");
        console.log("meta data: " + soxEvent.device);
        console.log("-------------------------------------");
    };
    soxEventListener.sensorDataReceived = function(soxEvent) {
        console.log("-------------------------------------");
        console.log("sensor device: " + soxEvent.device);
        console.log("sensor transducer: " + soxEvent.device.transducers.length);
        console.log("-------------------------------------");
        // eventListener(soxEvent.device, soxEvent.transducer, soxEvent.data);
    };

    client.setSoxEventListener(soxEventListener);
    client.connect();

    /*
    var device = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "しらすの入荷情報湘南", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
    try {
        device.subscribe();
        device.setSensorDataListener(eventListener);
    } catch(e) {
        alert("Failed to subscribe " + e.toString());
        if (e.stack) {
            console.log(e.stack);
        }
    }
    */
};
