var EnoshimaSensorInfo = {};
EnoshimaSensorInfo.weather = 0;
EnoshimaSensorInfo.temperature = 0;
EnoshimaSensorInfo.humidity = 0;

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
	if(device.nodeName=="hogehoge"){
		if(transducer.name=="temperature"){
			if(data.rawValue > 30){
				console.log(data.rawValue + " celcius. Too Hot !!");
			}else if(data.rawValue>16){
				console.log(data.rawValue + " celcius. Good temperature.");
			}else if(data.rawValue>8){
				console.log(data.rawValue + " celcius. A little bit cold..");
			}else{
				console.log(data.rawValue + " celcius. So cold !!");
			}
			EnoshimaSensorInfo.temperature = data.rawValue;
		}

		if(transducer.name=="humidity"){
			if(data.rawValue > 50){
				EnoshimaSensorInfo.weather = 2;
			}else if(data.rawValue > 20){
				EnoshimaSensorInfo.weather = 1;
			}else{
				EnoshimaSensorInfo.weather = 0;
			}
			EnoshimaSensorInfo.humidity = data.rawValue;
		}

	}
}

$(document).ready(function() {
	var device = new Device("http://sox.ht.sfc.keio.ac.jp:5280/http-bind/", "sox.ht.sfc.keio.ac.jp", "hogehoge", "cloutfujisawa@sox.ht.sfc.keio.ac.jp", "pAnAke!o");
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
