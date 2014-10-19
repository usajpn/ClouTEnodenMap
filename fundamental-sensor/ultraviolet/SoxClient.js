var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.ultravioletValue = 0;

function getUltravioletStrength() {
	return EnoshimaSensorInfo.ultravioletValue;
}

function eventListener(device, transducer, data) {
	if(device.nodeName=="江ノ島今日の天気"){
		if (transducer.name == "紫外線") {
			var value = data.rawValue;
			if (value.indexOf("極めて強い") > -1) {
				EnoshimaSensorInfo.ultravioletValue = 4;
			} else if (value.indexOf("非常に強い") > -1) {
				EnoshimaSensorInfo.ultravioletValue = 3;
			} else if (value.indexOf("やや強い") > -1) {
				EnoshimaSneosrInfo.ultravioletValue = 1;
			} else if (value.indexOf("強い") > -1) {
				EnoshimaSensorInfo.ultravioletValue = 2;
			} else {
				EnoshimaSensorInfo.ultravioletValue = 0;
			}
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
