var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.weather = 0;
EnoshimaSensorInfo.temperature = 0;
EnoshimaSensorInfo.maxTemp = 0;
EnoshimaSensorInfo.minTemp = 0;
EnoshimaSensorInfo.humidity = 0;
EnoshimaSensorInfo.delay = 0;

function getEnoshimaTemperature() {
	return EnoshimaSensorInfo.temperature;
}

function getEnoshimaMaxTemp() {
	return EnoshimaSensorInfo.maxTemp;
}

function getEnoshimaMinTemp() {
	return EnoshimaSensorInfo.minTemp;
}

function getEnoshimaHumidity() {
	return EnoshimaSensorInfo.humidity;
}

/* 0: sunny, 1: cloudy, 2: rainy 3: sunny-cloudy 4:cloudy-rainy */
function getWeather() {
	console.log(EnoshimaSensorInfo.weather);
	return EnoshimaSensorInfo.weather;
}

function getNextDeparture() {
	var min;
	if (!EnoshimaSensorInfo.delay) {
		
	}
	else {
		// write when delay occurs
	}

	return min;
}

function eventListener(device, transducer, data) {
	if(device.nodeName=="江ノ島今日の天気"){
		if (transducer.name == "天気") {
			var value = String(data.rawValue);

			if (value.indexOf("晴") > -1 && value.indexOf("曇") > -1) {
				EnoshimaSensorInfo.weather = 3;
			}
			else if (value.indexOf("雨") > -1 && value.indexOf("曇") > -1) {
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

		if(transducer.name=="最高気温"){
			EnoshimaSensorInfo.maxTemp = data.rawValue;
		}

		if(transducer.name=="最低気温"){
			EnoshimaSensorInfo.minTemp = data.rawValue;
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
