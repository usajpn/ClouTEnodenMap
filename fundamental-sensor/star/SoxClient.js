var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.windSpeed = 0;

function getEnoshimaWindSpeed() {
	return EnoshimaSensorInfo.windSpeed;
}

function eventListener(device, transducer, data) {
	if(device.nodeName=="江ノ島ヨットハーバー"){
		if (transducer.name == "平均風速") {
			EnoshimaSensorInfo.windSpeed = data.rawValue;
		}

	}
}

$(document).ready(function() {
	var device = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "江ノ島ヨットハーバー", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
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
