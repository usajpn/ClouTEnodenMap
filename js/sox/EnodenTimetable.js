var EnodenTimetable = [
	"5:47", "5:59",
	"6:11", "6:24", "6:36", "6:48",
	"7:00", "7:12", "7:24", "7:36", "7:48",
	"8:00", "8:12", "8:24", "8:36", "8:48",
	"9:00", "9:12", "9:24", "9:36", "9:48",
	"10:00", "10:12", "10:24", "10:36", "10:48",
	"11:00", "11:12", "11:24", "11:36", "11:48",
	"12:00", "12:12", "12:24", "12:36", "12:48",
	"13:00", "13:12", "13:24", "13:36", "13:48",
	"14:00", "14:12", "14:24", "14:36", "14:48",
	"15:00", "15:12", "15:24", "15:36", "15:48",
	"16:00", "16:12", "16:24", "16:36", "16:48",
	"17:00", "17:12", "17:24", "17:36", "17:48",
	"18:00", "18:12", "18:24", "18:36", "18:48",
	"19:00", "19:12", "19:24", "19:36", "19:48",
	"20:00", "20:12", "20:24", "20:36", "20:48",
	"21:00", "21:12", "21:24", "21:36", "21:48",
	"22:02", "22:16", "22:41",
	"23:03", "23:32", "23:55"
];

function getMinutesTilDeparture() {
	var d = new Date();
	var cTime = d.getTime();
	var result = "0";

	for(var i=0; i<EnodenTimetable.length; i++) {
		var diff = getTimeDiff(EnodenTimetable[i], cTime);
		var nextDiff;

		if (i == (EnodenTimetable.length - 1)) {
			break;
		} else {
			nextDiff = getTimeDiff(EnodenTimetable[i+1], cTime);
		}

		// float????????

		if (0 < diff && nextDiff <= 0 && (-100) < nextDiff) {
			var nextNextDiff = getTimeDiff(EnodenTimetable[i+2], cTime);
			var minTilDep = Math.floor(nextNextDiff / (1000 * 60) * -1);
			result = String(minTilDep);
			break;
		} else if (0 < diff && nextDiff <= 0) {
			var minTilDep = Math.floor(nextDiff / (1000 * 60) * -1);
			result = String(minTilDep);
			break;
		}
	}
	return result;
}

// return minus when cTime is before Enotime
// return plus when cTime is after Enotime
function getTimeDiff(StringEnoTime, cTime) {
	var etHourMin = StringEnoTime.split(":");
	var etHour = etHourMin[0];
	var etMin = etHourMin[1];
	
	var etDate = new Date();
	etDate.setHours(etHour);
	etDate.setMinutes(etMin);
	var etTime = etDate.getTime();

	var diff = cTime - etTime;
	return diff;
}