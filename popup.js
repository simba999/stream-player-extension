var timer = new Timer();
var time = '00:00:00';

// Create a nessage connection
var port = chrome.runtime.connect({
    name: "Sample Communication"
});

// click play and pause button
var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');

playButton.onclick = function(element) {
  playButton.style.display = 'none';
  pauseButton.style.display = 'block';

  port.postMessage({ type: "play_" });
}

pauseButton.onclick = function(element) {
  playButton.style.display = 'block';
  pauseButton.style.display = 'none';

  timer.pause();
  port.postMessage({ type: "pause_" });
}

// click volume off and on button
// var volumOnElement = document.getElementById('volume_control');
// var volumOffElement = document.getElementById('volume_control_off');
// volumOnElement.onclick = function(element) {
//   element.target.style.display = 'none';
//   volumOffElement.style.display = 'block';

//   port.postMessage({ type: "volumeOff", time: time });
// }


// volumOffElement.onclick = function(element) {
//   element.target.style.display = 'none';
//   volumOnElement.style.display = 'block';

//   port.postMessage({ type: "volumeOn", time: time });
// }

// // Create a nessage connection
// var port = chrome.runtime.connect({
//     name: "Sample Communication"
// });

port.postMessage({ type: "getTime" });

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    console.log('pop: ', msg)
    if (typeof (msg) !== "string") {
      switch (msg.type) {
        case "pauseTime":
          // document.getElementById('timeline').textContent = msg.time;
          break;

        default:
          // if (msg.audio) {
          //   playButton.style.display = 'none';
          //   pauseButton.style.display = 'block';
          // } else {
          //   // document.getElementById('timeline').textContent = msg.time;
          //   playButton.style.display = 'block';
          //   pauseButton.style.display = 'none';
          // }          
          break;
      }
    }
  });

});


// get data from storage
chrome.storage.sync.get("artist", function(obj) {
  document.getElementById('artist-name').textContent = obj.artist;
});

chrome.storage.sync.get("title", function(obj) {
  document.getElementById('title').textContent = obj.title;
});