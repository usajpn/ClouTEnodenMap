var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.amount = 0;

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

$(document).ready(function() {
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
});
