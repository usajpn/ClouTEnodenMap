var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.weather = 0;
EnoshimaSensorInfo.temperature = "-- ";
EnoshimaSensorInfo.humidity = "-- ";
EnoshimaSensorInfo.delay = 0;

function getEnoshimaTemperature() {
	return EnoshimaSensorInfo.temperature;
}

function getEnoshimaHumidity() {
	return EnoshimaSensorInfo.humidity;
}

/* 0: sunny, 1: cloudy, 2: rainy */
function getWeather() {
	return EnoshimaSensorInfo.weather;
}

function eventListener(device, transducer, data) {
	if(device.nodeName=="江ノ島今日の天気"){
		if (transducer.name == "天気") {
			var value = String(data.rawValue);

			if (value.indexOf("晴時々曇") > -1 || value.indexOf("曇時々晴") > -1) {
				EnoshimaSensorInfo.weather = 3;
			}
			else if (value.indexOf("雨時々曇") > -1 || value.indexOf("曇時々雨") > -1) {
				EnoshimaSensorInfo.weather = 4;
			}
			else if (value.indexOf("晴") > -1) {
				EnoshimaSensorInfo.weather = 0;
			}
			else if (value.indexOf("曇") > -1) {
				EnoshimaSensorInfo.weather = 1;
			}
			else if (value.indexOf("雨") > -1) {
				EnoshimaSensorInfo.weather = 2;
			}
			else {
				EnoshimaSensorInfo.weather = 5;
			}
		}

	}
}

function eventListener2(device, transducer, data) {
	if(device.nodeName=="江ノ島ヨットハーバー"){
		if (transducer.name == "気温") {
			var value = String(data.rawValue);
			EnoshimaSensorInfo.temperature = value;
		}
		
		if (transducer.name == "湿度") {
			var value = String(data.rawValue);
			EnoshimaSensorInfo.humidity = value;
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

	setTimeout(function() {
		var device2 = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "江ノ島ヨットハーバー", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
		try {
			device2.subscribe();
			device2.setSensorDataListener(eventListener2);
		} catch(e) {
			alert("Failed to subscribe " + e.toString());
			if (e.stack) {
				console.log(e.stack);
			}
		}
	}, 5000);
	
});
