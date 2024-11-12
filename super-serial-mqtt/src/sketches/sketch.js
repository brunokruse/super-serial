import "p5/lib/addons/p5.sound";
// pass in p5.js as function argument p5
export default function sketch(p5) {
  let mySound;
  let bgColor;
  let soundOn;
  let setRingBell;

  function canvasPressed() {
    // flip the soundOn boolean
    soundOn = !soundOn;
    if (soundOn) {
      bgColor = 0;
    } else {
      bgColor = 220;
    }
    console.log("canvasPressed soundOn", soundOn, bgColor);
    mySound.play();

    // reset the bell, can also be done with sending message from MQTT as off
    setRingBell(false);

    // draw the background color
    p5.background(bgColor);
    p5.text("tap anywhere to play sound", 10, 20);
  }

  p5.preload = function () {
    mySound = p5.loadSound("doorbell-1.mp3");
  };

  p5.setup = function () {
    // standard p5 setup code, note p5. because we passed it in above
    p5.createCanvas(400, 400);
    p5.background(220);
    p5.text("tap here to play", 10, 20);

    // no loop necessary, we only play sound on mouse or message
    p5.noLoop();
  };

  p5.mousePressed = function () {
    canvasPressed();
  };

  p5.draw = function () {
    p5.background(220);
    p5.text("tap anywhere to play sound", 10, 20);
  };

  // this special function receives data from index.js
  p5.updateWithProps = (props) => {
    if (props.setRingBell) {
      setRingBell = props.setRingBell;
    }
 
    if (props.ringBell === true) {
      console.log("Ring the bell >>>>> ", props.ringBell);
      canvasPressed();
    }

    if (props.ringBell === false) {
      console.log("Reset the bell >>>>> ", props.ringBell)
    }
  };
}
