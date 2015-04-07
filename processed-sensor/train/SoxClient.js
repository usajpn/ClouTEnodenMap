var boshService = "http://sox.ht.sfc.keio.ac.jp:5280/http-bind/";
var xmppServer = "sox.ht.sfc.keio.ac.jp";
var jid = "guest@sox.ht.sfc.keio.ac.jp";
var password = "miroguest";

var trainSensorInfo = {};
trainSensorInfo.shonanShinjukuInfo = "";
trainSensorInfo.shonanShinjukuStatus = 0;
/*
trainSensorInfo.tokaidoInfo = "";
trainSensorInfo.tokaidoStatus = 0;
trainSensorInfo.yokosukaInfo = "";
trainSensorInfo.yokosukaStatus = 0;
*/
trainSensorInfo.shonanMonoInfo = "";
trainSensorInfo.shonanMonoStatus = 0;
trainSensorInfo.odakyuInfo = "";
trainSensorInfo.odakyuStatus = 0;

function getShonanShinjukuInfo() {
    return trainSensorInfo.shonanShinjukuInfo;
}

function getShonanShinjukuStatus() {
    return trainSensorInfo.shonanShinjukuStatus;
}

/*
function getTokaidoInfo() {
    return trainSensorInfo.tokaidoInfo;
}

function getTokaidoStatus() {
    return trainSensorInfo.tokaidoStatus;
}

function getYokosukaInfo() {
    return trainSensorInfo.yokosukaInfo;
}

function getYokosukaStatus() {
    return trainSensorInfo.yokosukaStatus;
}
*/

function getOdakyuInfo() {
    return trainSensorInfo.odakyuInfo;
}

function getOdakyuStatus() {
    return trainSensorInfo.odakyuStatus;
}

function getShonanMonoInfo() {
    return trainSensorInfo.shonanMonoInfo;
}

function getShonanMonoStatus() {
    return trainSensorInfo.shonanMonoStatus;
}

function eventListener(device, transducer) {
    if(device=="列車運行情報"){
        if (transducer.id == "湘南新宿ライン") {
            trainSensorInfo.shonanShinjukuInfo = transducer.sensorData.rawValue;
            
            if (trainSensorInfo.shonanShinjukuInfo.indexOf("平常運転") >= 0) {
                trainSensorInfo.shonanShinjukuStatus = 0;
            }
            else {
                trainSensorInfo.shonanShinjukuStatus = 1;
            }
        }
        /*
        if (transducer.name == "東海道本線") {
            trainSensorInfo.tokaidoInfo = data.rawValue;
            
            if (trainSensorInfo.tokaidoInfo.indexOf("平常運転") >= 0) {
                trainSensorInfo.tokaidoStatus = 0;
            }
            else {
                trainSensorInfo.tokaidoStatus = 1;
            }
        }
        if (transducer.name == "横須賀線") {
            trainSensorInfo.yokosukaInfo = data.rawValue;
            
            if (trainSensorInfo.yokosukaInfo.indexOf("平常運転") >= 0) {
                console.log("hoge");
                trainSensorInfo.yokosukaStatus = 0;
            }
            else {
                trainSensorInfo.yokosukaStatus = 1;
            }
        }
        */
        if (transducer.id == "小田急江ノ島線") {
            trainSensorInfo.odakyuInfo = transducer.sensorData.rawValue;
            
            if (trainSensorInfo.odakyuInfo.indexOf("平常運転") >= 0) {
                trainSensorInfo.odakyuStatus = 0;
            }
            else {
                trainSensorInfo.odakyuStatus = 1;
            }
        }
        if (transducer.id == "湘南モノレール") {
            trainSensorInfo.shonanMonoInfo = transducer.sensorData.rawValue;
            
            if (trainSensorInfo.shonanMonoInfo.indexOf("平常運転") >= 0) {
                trainSensorInfo.shonanMonoStatus = 0;
            }
            else {
                trainSensorInfo.shonanMonoStatus = 1;
            }
        }
    }
}

$(document).ready(function() {
    var client = new SoxClient("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "guest@sox.ht.sfc.keio.ac.jp", "miroguest");
    var soxEventListener = new SoxEventListener();
    soxEventListener.connected = function(soxEvent) {
        console.log("[SoxClient.js]" + soxEvent.soxClient);
        status("Connected: " + soxEvent.soxClient);
        client.unsubscribeAll();

        var device = new Device("列車運行情報");

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
