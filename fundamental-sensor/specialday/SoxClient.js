var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.specialDay = "何の日";

function getSpecialDay() {
	return EnoshimaSensorInfo.specialDay;
}

function getWordCount() {
	return EnoshimaSensorInfo.specialDay.length;
}

function eventListener(device, transducer, data) {
	if(device.nodeName=="今日は何の日4"){
		if (transducer.name == "summary") {
			var value = String(data.rawValue);
			EnoshimaSensorInfo.specialDay = value;
		}
	}
}

$(document).ready(function() {
	var device = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "今日は何の日4", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
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
