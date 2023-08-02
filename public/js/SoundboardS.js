// variables
var playPitch = 1;
var playing = [];
// main functions
function renderButton (data) {
    let soundButton = document.createElement('button'); 
	let soundName = document.createTextNode(data.name);
    soundButton.appendChild(soundName);
    soundButton.classList.add('sound');
    soundButton.addEventListener('click', () => {
        let audio = new Audio('sounds/' + data.file);
        audio.addEventListener('ended', () => soundButton.blur());
			audio.preservesPitch = false;
  	audio.playbackRate = playPitch;
        audio.play();
			audio.onended = () => {
				playing = arrayRemove(playing, audio);
			}
			
			playing.push(audio);
    });
    return soundButton;
}

function renderButtons (data) {
    let soundsList = document.getElementById('sounds');
    for ( let sound of data )
        soundsList.appendChild(renderButton(sound));
}
setInterval(function () {
	document.getElementById('pitch').innerText = playPitch;
},50)

fetch('/sounds.json')
    .then( response => response.json() )
    .then( renderButtons )
    .catch( err =>  console.log(err) );
// modify Audio object
Audio.prototype.stop = function() {
    this.pause();
    this.currentTime = 0;
};

function stopAll() {
	playing.forEach(audio => {
		audio.stop();
	})
}