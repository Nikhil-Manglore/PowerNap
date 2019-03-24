import document from "document";
import * as messaging from "messaging";
import { vibration } from "haptics";

let myImage = document.getElementById("myImage");
var inputCycles;
// Message is received from companion
messaging.peerSocket.onmessage = evt => {
  // Am I Tired?
  let inputCycles = settingsStorage.getItem("REM") || 0;
  var counter = 0;
	for (let index = 0; index < evt.sleep.levels.data.length; index++) {
		if (evt.sleep.levels.data.level == "wake") {
      counter++;
    }
    if (counter >= evt.inputCycles) {
      vibration.start("ring");
      break;
    }
	}
};
