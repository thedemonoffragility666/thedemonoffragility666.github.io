let audioContext;

function play(freq,time) {
  const osc = audioContext.createOscillator();
  const volume =audioContext.createGain();

  osc.type = 'square';
  osc.frequency.value=freq;

  osc. connect(volume);
  volume.connect(audioContext.destination);

//Autoimate the volume before we start the createOscillator
volume.gain.setValueAtTime(0, time);
volume.gain.linearRampToValueAtTime(1, time+4);
volume.gain.linearRampToValueAtTime(0, time+5);


  osc.start();



}

function sequence() {
  //we will recall play in sequence
  console.log('sequence');
  audioContext = new AudioContext();

[2900,3265, 5255, 90, 60].forEach((item, index) => {
play(item * Math.random(0.27), audioContext.currentTime +(index*2));
});

}

function saw  (frequencies, duration) {
  const osc = audioContext.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueCurveAtTime(frequencies, audioContext.currentTime,duration);

  osc.connect(audioContext.destination);
  osc.start();

}



//another way of,it creeates sort of an envelope, we just go through the values
function curve() {
  console.log('curve');
  audioContext = new AudioContext();

let list = [40,47,80,81,9000].map(function(item) {return item * Math.random() })
console.log('list');
 saw(list,5 *Math.random() );

}





document.getElementById('buttonsequence').addEventListener("click", sequence);
document.getElementById('buttoncurve').addEventListener("click", curve);
