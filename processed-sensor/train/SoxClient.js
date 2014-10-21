var trainSensorInfo = {};
trainSensorInfo.shonanShinjukuInfo = "";
trainSensorInfo.shonanShinjukuStatus = 0;
trainSensorInfo.tokaidoInfo = "";
trainSensorInfo.tokaidoStatus = 0;
trainSensorInfo.yokosukaInfo = "";
trainSensorInfo.yokosukaStatus = 0;
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

function eventListener(device, transducer, data) {
    if(device.nodeName=="列車運行情報"){
        if (transducer.name == "湘南新宿ライン") {
            trainSensorInfo.shonanShinjukuInfo = data.rawValue;
            
            if (trainSensorInfo.shonanShinjukuInfo.indexOf("平常運転") >= 0) {
                trainSensorInfo.shonanShinjukuStatus = 0;
            }
            else {
                trainSensorInfo.shonanShinjukuStatus = 1;
            }
        }
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
        if (transducer.name == "小田急江ノ島線") {
            trainSensorInfo.odakyuInfo = data.rawValue;
            
            if (trainSensorInfo.odakyuInfo.indexOf("平常運転") >= 0) {
                trainSensorInfo.odakyuStatus = 0;
            }
            else {
                trainSensorInfo.odakyuStatus = 1;
            }
        }
        if (transducer.name == "湘南モノレール") {
            trainSensorInfo.shonanMonoInfo = data.rawValue;
            
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
    var device = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "列車運行情報", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
    try {
        device.subscribe();
        device.setSensorDataListener(eventListener);
    } catch(e) {
        alert("Failed to subscribe " + e.toString());
        if (e.stack) {
            console.log(e.stack);
        }
    }
});
