import * as messaging from "messaging";
import {settingsStorage} from "settings";


//global constants
let accessToken = null;
// Fetch Sleep Data from Fitbit Web API
function fetchSleepData(accessToken, numCycles) {
	let date = new Date();
	let todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; //YYYY-MM-DD
  
	fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${todayDate}.json`, {
	  method: "GET",
	  headers: {
		"Authorization": `Bearer ${accessToken}`
	  }
	})
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
      if(data.summary.totalMinutesAsleep != 0) {
        const payload = {
          sleep: data.sleep,
          inputCycles : numCycles
        }
        messaging.peerSocket.onopen = function () {
				  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
					  messaging.peerSocket.send(payload);
				  }
        }
			}
		})
		.catch(err => console.log('[FETCH]: ' + err));
}

// A user changes Settings
settingsStorage.onchange = evt => {
	if (evt.key === "oauth") {
		// Settings page sent us an oAuth token
		let data = JSON.parse(evt.newValue);
		fetchSleepData(accessToken, data);
	}
  if (evt.key === "REM" && accessToken != null) {
		// Settings page sent us an oAuth token
		let data = JSON.parse(evt.newValue);
		fetchSleepData(accessToken, data);
	}
};

// Restore previously saved settings and send to the device
function restoreSettings() {
	for (let index = 0; index < settingsStorage.length; index++) {
		let key = settingsStorage.key(index);
		if (key && key === "oauth") {
			// We already have an oauth token
			let data = JSON.parse(settingsStorage.getItem(key))
      accessToken = data.access_token;
			fetchSleepData(data.access_token);
		}
	}
}

// Message socket opens
messaging.peerSocket.onopen = () => {
	restoreSettings();
};