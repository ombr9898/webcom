import './libs/webaudio-controls.js';

const getBaseURL = () => {
    return new URL('.', import.meta.url);
};

const template = document.createElement("template");
template.innerHTML =`
  <style>
 
.body{
    margin: 0;
	padding: 0;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: radial-gradient(#ff0000, rgb(0,0,0));
}
  .main{
	position: relative;
	height: 100%;
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.right,.left{
	position: relative;
	height: 100%;
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.left #progress{
    margin-left: auto;
    margin-right: auto;
    width:100%;
}

.left canvas{
    height: 200px;
	width: 80%;
	border-radius: 15px;

    background-color:black;
}
.right canvas{
height: 200px;
	width: 80%;
	border-radius: 15px;
    background-color:black;
}
.left .middle{
    width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   
}

.left .middle .button{
   border: none;
   height: 70px;
   width: 70px;
   border-radius: 50%;	
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   outline: none;
   transition: 0.5s;
   background: rgb(0,0,0);
}
.right .equalizer{
    width:60%;
    color:white;
    margin-top:30px;
    padding:5px;
    border-radius:5px;
}

.left .button:hover{
	background: rgba(0,0,0,0.49);
}
.left i:before{
	color: #fff;
	font-size: 20px;
}
.btn-nav{
    position: relative;
    margin-top:10px;
	height: 20%;
	width: 60%;
	display: flex;
	align-items: center;
	justify-content: center;
	
}
input[type=range]{
    -webkit-appearance: none;
    background-color: #000000; 
    
}



input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: solid;
    height: 16px;
    width: 16px;
    border-radius: 10%;
    background: red;
    margin-top: 0px;
}




#Band{
color: black;
display: inline-block;
width: 150px;
text-align: right;
}
.btn-right,.btn-left{
    
	height: 100%;
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	
}
#equalizer-value{
color: black;
}
#input-equalizer{
margin-top: 160px;
position: relative;
display: flex;

}

  </style>
  <div class="body">
    <div class="main">
            <div class="left">
             <canvas id="myCanvas" width=400></canvas>
                <audio id="myPlayer" crossorigin="anonymous"></audio>
                <p style="color: #000000" >Progression : </p><input id="progress" type="range" style="color: #000000" value="0">
                 <label id="progressvalue" for="progress" style="color: #000000" hidden></label>
                 
                <div class="middle">
                <div class="button" id="debut"><img src="https://img.icons8.com/wired/64/fa314a/circled-chevron-left.png" alt="Forward"/></div>
                    <div class="button" id="recule10"><img src="https://img.icons8.com/ios/50/fa314a/replay-10.png" alt="Backward"/></div>
                    <div class="button" id="play"><img src="https://img.icons8.com/ios/50/fa314a/play--v1.png" alt="Play"/></div> 
                    <div class="button" id="pause"><img src="https://img.icons8.com/ios/50/fa314a/pause--v1.png" alt="Pause"/></div>
                    <div class="button" id="stop"><img src="https://img.icons8.com/ios/50/fa314a/stop--v1.png" alt="stop"/></div>
                    <div class="button" id="avance10"><img src="https://img.icons8.com/ios/50/fa314a/forward-10.png" alt="Forward"/></div>
                <div class="button" id="fin"><img src="https://img.icons8.com/wired/64/fa314a/circled-chevron-right.png" alt="stop"/></div>
                  <button class="button" id="re" value="True"><img src="https://img.icons8.com/material-rounded/24/fa314a/refresh.png" alt="stop"/></button>   
                </div>
               
                <div class="btn-nav">
                    <div class="btn-left">
                    <webaudio-knob id="volumeKnob" 
                    src="./assets/imgs/Sonatom.png" 
                    value="5" min=0 max=30 step=0.01 
                    diameter="100" 
                    tooltip="Volume: %d"><p style="font-size: 19px;color: red">Volume</p>
                    </webaudio-knob>
                    </div>
                
                    <div class="btn-right">
                    <webaudio-knob id="vitesseLecture" 
                    src="./assets/imgs/Sonatom.png" 
                    value="1" min=0 max=4 step=0.01 
                    diameter="100" 
                    tooltip="Vitesse: %d"><p style="font-size: 19px;color: red">Vitesse De Lecture</p>
                    </webaudio-knob>
                    </div>
                </div>
                
            </div>
            <div class="right">
               <canvas id="myCanvas2" width=400></canvas>
                <div class="equalizer" id="input-equalizer">
                <div class="gauche">
                    <label id="Band" >Band    60Hz:   </label>
                    <input id="equa-1" type="range" min="-30" max="30" value="0" step="0.1" >
                    <label id="equalizer-value" >0</label>
                    <br>   
                   <label id="Band">Band   120Hz:  </label>
                    <input id="equa-2" type="range" min="-30" max="30" value="0" step="0.1">
                    <label id="equalizer-value">0</label>
                    <br>
                 <label id="Band" >Band   240Hz:  </label>
                    <input id="equa-3" type="range" min="-30" max="30" value="0" step="0.1">
                    <label id="equalizer-value">0</label>
                    <br>
                        <label id="Band">Band  480Hz  : </label>
                        <input id="equa-4" type="range" min="-30" max="30" value="0" step="0.1">
                    <label id="equalizer-value" >0</label>
                    <br>
                      <label id="Band" >Band  4800Hz  : </label>
                    <input id="equa-5" type="range" min="-30" max="30" value="0" step="0.1">
                    <label id="equalizer-value">0</label>
                    <br>
                       <label id="Band">Band 10000Hz:</label>
                    <input id="equa-6" type="range" min="-30" max="30" value="0" step="0.1">
                        <label id="equalizer-value">0</label>
                    </div>
                    
                </div>


                <br>
                
               
               
            </div>
        </div >
         
            
    </div>
  `;

  class MyAudioPlayer extends HTMLElement {
    constructor() {
        super();
        this.filters=[]
        this.attachShadow({ mode: "open" });
        console.log("URL de base du composant : " + getBaseURL())
    }
    connectedCallback() {

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.fixRelativeURLs();
        this.player = this.shadowRoot.querySelector("#myPlayer");
        this.src=["./myComponents/assets/audio/song1.mp3","./myComponents/assets/audio/song2.mp3","./myComponents/assets/audio/song1.mp3"]
        this.canvas = this.shadowRoot.querySelector("#myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas1 = this.shadowRoot.querySelector("#myCanvas2");
        this.ctx1 = this.canvas1.getContext("2d");
        this.audioCtx = new AudioContext();
        this.defineListeners();
        this.generalbuild();
        requestAnimationFrame(() => {
            this.animationLoop();
            this.animationLoop2();
        });
        this.player.src=this.src[0]

    }
    generalbuild(){
        let audioContext = this.audioCtx;
        let player=this.player
        let sourceNode = audioContext.createMediaElementSource(player);
        this.buildAudioGraph(audioContext,sourceNode);
        this.buildAudioGraph2(audioContext,sourceNode);
        this.buildEqualizer(audioContext,sourceNode);
    }
    buildAudioGraph(audioContext,playerNode) {
        this.analyserNode = audioContext.createAnalyser();
        this.analyserNode.fftSize = 256;
        this.bufferLength = this.analyserNode.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        // lecteur audio -> analyser -> haut parleurs
        playerNode.connect(this.analyserNode);
        this.analyserNode.connect(audioContext.destination);

    }
    buildAudioGraph2(audioContext,playerNode) {
        this.analyserNode1 = audioContext.createAnalyser();
        this.analyserNode1.fftSize = 256;
        this.bufferLength1 = this.analyserNode1.frequencyBinCount;
        this.dataArray1 = new Uint8Array(this.bufferLength1);
        playerNode.connect(this.analyserNode1);
        this.analyserNode1.connect(audioContext.destination);
    }
    buildEqualizer(audioContext,sourceNode){
        this.analyser = audioContext.createAnalyser();
        let filters=this.filters;
        [60, 120, 240, 480, 4800, 10000].forEach(function(a, i) {
      var equa = audioContext.createBiquadFilter();
      equa.frequency.value = a;
      equa.type = "peaking";
      equa.gain.value = 0;
      filters.push(equa);
    });
   sourceNode.connect(filters[0]);
   for(var i = 0; i < filters.length - 1; i++) {
      filters[i].connect(filters[i+1]);
    }
   filters[filters.length - 1].connect(this.analyser);
  this.analyser.connect(audioContext.destination);

    }
animationLoop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgba(0,0, 0,0.1)';
    this.analyserNode.getByteFrequencyData(this.dataArray);
    let barWidth = this.canvas.width / this.bufferLength;
    let barHeight;
    let x = 0;
    let heightScale = this.canvas.height / 128;
    for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];
        this.ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        barHeight *= heightScale;
        this.ctx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);
        x += barWidth + 1;
    }
    requestAnimationFrame(() => {
        this.animationLoop();
    });

}
animationLoop2() {
    let width = this.canvas1.width
    let height = this.canvas1.height
    this.ctx1.fillStyle = 'rgba(17,12,40,0.1)'
        this.ctx1.fillRect(0, 0, width, height)
    this.analyserNode1.getByteTimeDomainData(this.dataArray1)
    this.ctx1.beginPath()
    this.ctx1.strokeStyle = 'red';
    let sliceWidth = this.canvas1.width / this.bufferLength1;
    let x = 0;
    for (let i = 0; i < this.bufferLength1; i++) {
        let v = this.dataArray1[i] / 255
        let y = v * height
        if (i === 0) {
            this.ctx1.moveTo(x, y)
        } else {
            this.ctx1.lineTo(x, y)
        }
        x += sliceWidth
    }
    this.ctx1.lineTo(
        this.canvas1.width,
        this.canvas1.height / 2
    )
    this.ctx1.stroke()
    requestAnimationFrame(() => {
        this.animationLoop2();
    });
}
fixRelativeURLs() {
    const elems = this.shadowRoot.querySelectorAll("webaudio-knob, webaudio-slider, webaudio-switch, img");
    elems.forEach(e => {
        const path = e.src;
        if (path.startsWith(".")) {
            e.src = getBaseURL() + path;
        }
    });
}
defineListeners() {
    this.shadowRoot.querySelector("#play").onclick = () => {
        this.player.play();
        this.audioCtx.resume();
        this.shadowRoot.querySelector("#progressvalue").hidden =false
        console.log(this.shadowRoot.querySelector("#progressvalue").hidden)
    }
    this.shadowRoot.querySelector("#pause").onclick = () => {
        this.player.pause();
    }
    this.shadowRoot.querySelector("#avance10").onclick = () => {
        this.player.currentTime += 10;
    }
    this.shadowRoot.querySelector("#recule10").onclick = () => {
        this.player.currentTime -= 10;
    }
    this.shadowRoot.querySelector("#fin").onclick = () => {
        this.player.currentTime =this.player.duration ;
    }
    this.shadowRoot.querySelector("#debut").onclick = () => {
        this.player.currentTime =0 ;
    }
    this.shadowRoot.querySelector("#stop").onclick = () => {
        console.log(this.player.duration)
        this.player.currentTime = 0;
        this.player.pause();
    }
    this.shadowRoot.querySelector("#vitesseLecture").oninput = (event) => {
        this.player.playbackRate = parseFloat(event.target.value);
        console.log("vitesse =  " + this.player.playbackRate);
        this.shadowRoot.querySelector("#vitessevalue").innerHTML = event.target.value;
    }
    this.shadowRoot.querySelector("#progress").onchange = (event) => { 
        this.player.currentTime = parseFloat(event.target.value);
         }
    this.player.ontimeupdate = (event) => {
        let progressSlider = this.shadowRoot.querySelector("#progress");

            this.shadowRoot.querySelector("#progressvalue").innerHTML = parseInt(this.player.currentTime/60)+":"+parseInt((this.player.currentTime/60-parseInt(this.player.currentTime/60))*60)+"/"+parseInt((parseInt(this.player.duration/60)))+":"+parseInt((this.player.duration/60-parseInt(this.player.duration/60))*60);
            progressSlider.max = this.player.duration;
            progressSlider.min = 0;
            progressSlider.value = this.player.currentTime;


       
    }
    this.shadowRoot.querySelector("#volumeKnob").oninput = (event) =>{
        this.player.volume = event.target.value;

    }
    this.shadowRoot.querySelector("#re").onclick = () => {
        if(this.shadowRoot.querySelector("#re").value=="True") {
            console.log(this.player.loop)
            this.player.loop = true
            this.shadowRoot.querySelector("#re").value="False"
            this.shadowRoot.querySelector("#re").style.backgroundColor='rgba(0,0,0,0.49)'
        }
        else{
            console.log(this.player.loop)
            this.shadowRoot.querySelector("#re").value="True"
           this.player.loop = false
            this.shadowRoot.querySelector("#re").style.backgroundColor=' black'


        }
        }
    this.shadowRoot.querySelectorAll('[id^=equa-]').forEach((e, i) => {
        e.oninput = (e) => {
                this.filters[i].gain.value = e.target.value
                this.shadowRoot.querySelectorAll('#equalizer-value')[i].innerHTML = e.target.value

            }
        })
    }
}
customElements.define("my-player", MyAudioPlayer);

