var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.humid = 0;
EnoshimaSensorInfo.temperature = 0;

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

    return comfortness;
}

function eventListener(device, transducer, data) {
    if(device.nodeName=="江ノ島ヨットハーバー"){
        if (transducer.name == "気温") {
            EnoshimaSensorInfo.temperature = data.rawValue;
        }
        if (transducer.name == "湿度") {
            EnoshimaSensorInfo.humid = data.rawValue;
        }
    }
}

$(document).ready(function() {
    var device1 = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "江ノ島ヨットハーバー", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
    try {
        device1.subscribe();
        device1.setSensorDataListener(eventListener);
    } catch(e) {
        alert("Failed to subscribe " + e.toString());
        if (e.stack) {
            console.log(e.stack);
        }
    }
});
