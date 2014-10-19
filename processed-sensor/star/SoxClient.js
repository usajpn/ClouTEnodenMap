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

            if (data.rawValue.indexOf("空いっぱい") >= 0 && data.rawValue.indexOf("まずまず") >= 0) {
                EnoshimaSensorInfo.starStatus = 1;
            }
            else if (data.rawValue.indexOf("期待") >= 0 && data.rawValue.indexOf("わずか") >= 0) {
                EnoshimaSensorInfo.starStatus = 0;
            }
            else {
                EnoshimaSensorInfo.starStatus = 1;
            }
        }
    }
}

$(document).ready(function() {
    var device = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "江ノ島今日の生活指数", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");

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
