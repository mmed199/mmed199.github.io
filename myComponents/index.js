
import './lib/webaudio-controls.js';
 
const getBaseURL = () => {
  const base = new URL('.', import.meta.url);
  return `${base}`;
};

const template = document.createElement("template");

template.innerHTML = `
  <style>

  #test {
    font-family: 'Orbitron', sans-serif;
  }
  #myPlayerDiv {
    width:500px;
    height:603px;
  }

  .settingButtons {
    display: inline-block;
    padding: 0;
    margin: 0;
    vertical-align: top;
    position: absolute;
  }

  .rectButton {
    height: 30px;  
    width: 44px;
  }

  .settingButtons img {
    cursor : pointer;
    display: block;
  }

  .rectButton img {
    height: 30px;  
    width: 44px;
  }

  #backwardButton {
    top: 140px; 
    left: 30px;
  }

  #playButton {
    top: 140px; 
    left: 74px;
  }

  #pauseButton {
    top: 140px; 
    left: 118px;
  }

  #toZeroButton {
    top: 140px; 
    left: 162px;
  }

  #forwardButton {
    top: 140px; 
    left: 206px;
  }

  #loopButton {
    top: 142px; 
    left: 301px;
  }


  .digital {
    font-family: "Georgia", Times, serif;
    color : #0dd20e;
    display:block;
    position: absolute;
  }

  #counter {
    font-size:40px;
    top: 40px; 
    left: 75px;
  }

  #duration {
    font-size:18px;
    top: 80px; 
    left: 134px;
  }

  #knobVolume {
    position: absolute;
    top: 58px; 
    left: 228px;
  }

  #knobStereo {
    position: absolute;
    top: 58px; 
    left: 385px;
  }

  .freq {
    position: absolute;
    top: 225px; 
  }

  #freq60 {
    left: 50px;
  }

  #freq170 {
    left: 100px;
  }

  #freq310 {
    left: 150px;
  }

  #freq600 {
    left: 200px;
  }

  #freq1k {
    left: 250px;
  }

  #freq3k {
    left: 300px;
  }

  #freq6k {
    left: 350px;
  }
  #freq12k {
    left: 400px;
  }

  #myCanvas {
    position: absolute;
    left : 18px;
    top : 390px;
  }
  </style>
    <div id="myPlayerDiv"> 
      <audio id="myPlayer" crossorigin>
      </audio>
      <button id="backwardButton" class="settingButtons rectButton"><img src="./assets/imgs/backwardButton.jpg"></button>
      <button id="pauseButton" class="settingButtons rectButton"><img src="./assets/imgs/pauseButton.jpg"></button>
      <button id="playButton" class="settingButtons rectButton"><img src="./assets/imgs/startButton.jpg"></button>
      <button id="toZeroButton" class="settingButtons rectButton"><img src="./assets/imgs/toZeroButton.jpg"></button>
      <button id="forwardButton" class="settingButtons rectButton"><img src="./assets/imgs/forwardButton.jpg" ></button>
      <button id="loopButton" class="settingButtons"><img src="./assets/imgs/loopButtonOff.jpg"></button>

      <span id="counter" class="digital">00:00</span>
      <span id="duration" class="digital">00:00</span>
      <!--<progress id="progressRuler" min=0 value=0 step=1></progress>-->
      </br>
      <webaudio-knob id="knobVolume" 
                    src="./assets/imgs/LittlePhatty.png" sprites="100" 
                    value=0.5 min="0" max=1 step=0.01
                    width = 55 height = 55
                    tooltip="Volume %s"
                    >
      </webaudio-knob>


      <webaudio-knob id="knobStereo" 
      src="./assets/imgs/stereo_knob.png" sprites="100" 
      value=0 min="-1" max=1 step=0.1
      width = 55 height = 55
      tooltip="Volume %s"
      >
      </webaudio-knob>

      <webaudio-knob id="freq60" class="freq" src="./assets/imgs/equalizer.png" sprites="59" value=0 min=-30 max=30 step=1 width = 32 height = 128></webaudio-knob>
      <webaudio-knob id="freq170"  class="freq" src="./assets/imgs/equalizer.png" sprites="59" value=0 min=-30 max=30 step=1 width = 32 height = 128></webaudio-knob>
      <webaudio-knob id="freq310" class="freq" src="./assets/imgs/equalizer.png" sprites="59" value=0 min=-30 max=30 step=1 width = 32 height = 128></webaudio-knob>
      <webaudio-knob id="freq600" class="freq" src="./assets/imgs/equalizer.png" sprites="59" value=0 min=-30 max=30 step=1 width = 32 height = 128></webaudio-knob>
      <webaudio-knob id="freq1k" class="freq" src="./assets/imgs/equalizer.png" sprites="59" value=0 min=-30 max=30 step=1 width = 32 height = 128></webaudio-knob>
      <webaudio-knob id="freq3k"  class="freq" src="./assets/imgs/equalizer.png" sprites="59" value=0 min=-30 max=30 step=1 width = 32 height = 128></webaudio-knob>
      <webaudio-knob id="freq6k" class="freq" src="./assets/imgs/equalizer.png" sprites="59" value=0 min=-30 max=30 step=1 width = 32 height = 128></webaudio-knob>
      <webaudio-knob id="freq12k" class="freq" src="./assets/imgs/equalizer.png" sprites="59" value=0 min=-30 max=30 step=1 width = 32 height = 128></webaudio-knob>

      <canvas id="myCanvas" width=480 height=210 style="background-color:black"></canvas>
    </div>

        `;

class MyAudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.volume = 0.5;
    this.src = this.getAttribute('src')
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.basePath = getBaseURL(); // url absolu du composant
    // Fix relative path in WebAudio Controls elements
    this.fixRelativeImagePaths();
  }

  connectedCallback() {
    this.player = this.shadowRoot.querySelector("#myPlayer");
    this.player.src = this.src || "https://mainline.i3s.unice.fr/mooc/horse.mp3"
    // Fix background : 
    let playerDiv = this.shadowRoot.querySelector("#myPlayerDiv");
    playerDiv.style.backgroundImage =  "url('" + this.basePath + "/assets/imgs/background.jpg')";
    this.setVolume(0.5);
    this.filters = []


    this.canvas = this.shadowRoot.querySelector("#myCanvas");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.canvasContext = this.canvas.getContext('2d');


    let audioContext = new AudioContext();
    let playerNode = audioContext.createMediaElementSource(this.player);
    this.pannerNode = audioContext.createStereoPanner();
    // Create an analyser node
    this.analyserNode = audioContext.createAnalyser();
    // set visualizer options, for lower precision change 1024 to 512,
    // 256, 128, 64 etc. bufferLength will be equal to fftSize/2
    this.analyserNode.fftSize = 256;
    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    [60, 170, 310, 600, 1000, 3000, 6000, 12000].forEach((freq, i) => {
      var eq = audioContext.createBiquadFilter()
      eq.frequency.value = freq
      eq.type = "peaking"
      eq.gain.value = 0;
      this.filters.push(eq)
    })

    playerNode.connect(this.filters[0]);
    for (var i = 0; i < this.filters.length - 1; i++) {
      this.filters[i].connect(this.filters[i + 1]);
    }

    this.filters[this.filters.length - 1].connect(this.pannerNode);
    this.pannerNode.connect(this.analyserNode);
    this.analyserNode.connect(audioContext.destination);
    
    this.visualize();
    this.declareListeners();
  }

  fixRelativeImagePaths() {
    // change webaudiocontrols relative paths for spritesheets to absolute
    let webaudioControls = this.shadowRoot.querySelectorAll(
      'webaudio-knob, webaudio-slider, webaudio-switch, img'
    );
    webaudioControls.forEach((e) => {
      let currentImagePath = e.getAttribute('src');
      if (currentImagePath !== undefined) {
        let imagePath = e.getAttribute('src');
        e.src = this.basePath + "/" + imagePath;
      }
    });
  }

  visualize() {
    // 1 effacer le canvas
    //this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.canvasContext.clearRect(0, 0, this.width, this.height);

    // 2 - Get the analyser data - for waveforms we need time domain data
    this.analyserNode.getByteFrequencyData(this.dataArray);

    // 3 - draws the waveform
    var widthBar = (this.width / this.bufferLength) * 2.5;
    var heightBar;
    var x = 0;
    for(var i = 0; i < this.bufferLength; i++) {
      heightBar = this.dataArray[i]/2;

      this.canvasContext.fillStyle = 'rgb(' + (heightBar+100) + ',50,50)';
      this.canvasContext.fillRect(x,this.height-heightBar/2,widthBar,heightBar);

      x += heightBar + 1;
    }
    // 3 rappel animation
    requestAnimationFrame(() => { this.visualize() });
  }
  declareListeners() {
    this.shadowRoot.querySelector("#playButton").addEventListener("click", (event) => {
      this.play();
    });

    this.shadowRoot.querySelector("#pauseButton").addEventListener("click", (event) => {
      this.pause();
    });

    this.shadowRoot.querySelector("#toZeroButton").addEventListener("click", (event) => {
      this.setCurrentTime(0);
      this.pause();
    });

    this.shadowRoot.querySelector("#backwardButton").addEventListener("click", (event) => {
      this.setCurrentTime(this.getCurrentTime() - 2);
    });

    
    this.shadowRoot.querySelector("#forwardButton").addEventListener("click", (event) => {
      this.setCurrentTime(this.getCurrentTime() + 2);
    });

    this.shadowRoot.querySelector("#loopButton").addEventListener("click", (event) => {
      this.setLoop(!this.getLoop())
      this.shadowRoot.querySelector('#loopButton img').src = this.basePath + "/assets/imgs/loopButton" + (this.getLoop() ? "On" : "Off") + ".jpg"
    });

    

    this.shadowRoot.querySelector("#freq60").addEventListener("click", (event) => {
      this.changeGain(this.shadowRoot.querySelector("#freq60").value, 0);
    });
    this.shadowRoot.querySelector("#freq170").addEventListener("click", (event) => {
      this.changeGain(this.shadowRoot.querySelector("#freq170").value, 1);
    });
    this.shadowRoot.querySelector("#freq310").addEventListener("click", (event) => {
      this.changeGain(this.shadowRoot.querySelector("#freq310").value, 2);
    });
    this.shadowRoot.querySelector("#freq600").addEventListener("click", (event) => {
      this.changeGain(this.shadowRoot.querySelector("#freq600").value, 3);
    });
    this.shadowRoot.querySelector("#freq1k").addEventListener("click", (event) => {
      this.changeGain( this.shadowRoot.querySelector("#freq1k").value, 4);
    });
    this.shadowRoot.querySelector("#freq3k").addEventListener("click", (event) => {
      this.changeGain( this.shadowRoot.querySelector("#freq3k").value, 5);
    });
    this.shadowRoot.querySelector("#freq6k").addEventListener("click", (event) => {
      this.changeGain( this.shadowRoot.querySelector("#freq6k").value, 6);
    });
    this.shadowRoot.querySelector("#freq12k").addEventListener("click", (event) => {
      this.changeGain( this.shadowRoot.querySelector("#freq12k").value, 7);
    });


    this.shadowRoot
      .querySelector("#knobVolume")
      .addEventListener("input", (event) => {
        this.setVolume(event.target.value );
      });

    this.shadowRoot
    .querySelector("#knobStereo")
    .addEventListener("input", (event) => {
      this.setBalance(event.target.value);
    });

    this.player.addEventListener('timeupdate', (event) => {
      let t = this.shadowRoot.querySelector('#counter')
      try {

        var date = new Date(0);
        date.setSeconds(this.getCurrentTime());
        var timeString = date.toISOString().substr(14,5)
        t.innerHTML = timeString
      } catch {
      }
    })

    this.player.addEventListener('canplay', (event) => {
      let t = this.shadowRoot.querySelector('#duration')
      try {

        var date = new Date(0);
        date.setSeconds(this.getDuration());
        var timeString = date.toISOString().substr(14,5)
        t.innerHTML = timeString
      } catch {
      }
    })

  }

  // API

  changeGain(sliderVal, nbFilter) {
    var value = parseFloat(sliderVal);
    this.filters[nbFilter].gain.value = value;
  }

  setVolume(val) {
    this.player.volume = val;
  }

  setBalance(val) {
    this.pannerNode.pan.value = val
  }

  setCurrentTime(val) {
    this.player.currentTime = val
  }

  getCurrentTime() {
    return this.player.currentTime
  }

  setLoop(val) {
    this.player.loop = val
  }

  getLoop() {
    return this.player.loop
  }

  getDuration() {
    return this.player.duration
  }

  play() {
    this.player.play();
    this.player.playbackRate = 1;
  }

  pause() {
    this.player.pause();
  }
}

customElements.define("my-audioplayer", MyAudioPlayer);
