var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.sunsetTime = "";

function getEnoshimaSunsetTime() {
	return EnoshimaSensorInfo.sunsetTime;
}

function eventListener(device, transducer, data) {
	if(device.nodeName=="江ノ島今日の天気"){
		if (transducer.name == "日の入") {
			EnoshimaSensorInfo.sunsetTime = data.rawValue;
		}
	}
}

$(document).ready(function() {
	var device = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "江ノ島今日の天気", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
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
