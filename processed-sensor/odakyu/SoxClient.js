var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.odakyuInfo = "";
EnoshimaSensorInfo.odakyuStatus = 0;

function getOdakyuInfo() {
    return EnoshimaSensorInfo.odakyuInfo;
}

function getOdakyuStatus() {
    return EnoshimaSensorInfo.odakyuStatus;
}

function eventListener(device, transducer, data) {
    if(device.nodeName=="小田急遅延情報"){
        if (transducer.name == "遅延情報") {
            console.log("hoge");
            EnoshimaSensorInfo.odakyuInfo = data.rawValue;
            
            if (EnoshimaSensorInfo.odakyuInfo == "小田急線は平常どおり運転しております") {
                odakyuStatus = 0;
            }
            else {
                odakyuStatus = 1;
            }
        }
    }
}

$(document).ready(function() {
    var device1 = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "小田急遅延情報", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
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
