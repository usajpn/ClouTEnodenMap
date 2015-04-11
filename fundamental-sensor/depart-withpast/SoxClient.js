var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.isDelayed = 0;

function getIsDelayed() {
	return EnoshimaSensorInfo.isDelayed;
}

function eventListener(device, transducer, data) {
	if(device.nodeName=="江ノ電遅延情報"){
		if (transducer.name == "遅延") {
			var value = String(data.rawValue);
			if (value.indexOf("平常") > -1) {
				EnoshimaSensorInfo.isDelayed = 0;
			} else {
				EnoshimaSensorInfo.isDelayed = 1;
			}
		}
	}
}

function getTimeNow() {
	var d = new Date();
	var hours = String(d.getHours());
	var minutes = String(d.getMinutes());
	if (minutes.length == 1) {
		minutes = "0" + minutes;
	}
	return hours + ":" + minutes;
}

$(document).ready(function() {
	var device = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "江ノ電遅延情報", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
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
