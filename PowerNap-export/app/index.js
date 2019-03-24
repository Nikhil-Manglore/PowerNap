import document from "document";
import * as messaging from "messaging";
import { vibration } from "haptics";

let myImage = document.getElementById("myImage");
var inputCycles;
// Message is received from companion
messaging.peerSocket.onmessage = evt => {
  // Am I Tired?
  console.log("hi");
  let inputCycles = settingsStorage.getItem("REM") || 0;
  console.log(evt);
  if (evt.sleep.levels.summary.rem.count >= inputCycles) { //add input later
    // Had required REM sleep cycle
    //myImage.href = "images/awake.jpg";
    
    vibration.start("ring");
    console.log("TRUE")
  } else {
    // not enough sleep
    //myImage.href = "images/sleepy.jpg";
        console.log("FALSE")

  }
};
