// variables
var at = false;
// main functions
function renderButton(data) {
	let soundButton = document.createElement('button');
	let soundName = document.createTextNode(data.name);
	soundButton.appendChild(soundName);
	soundButton.classList.add('sound');
	soundButton.classList.add('button');
	soundButton.addEventListener('click', () => {
		Susaudio.playSound('sounds/' + data.file)
	});
	return soundButton;
}

function renderButtons(data) {
	let soundsList = document.getElementById('sounds');
	for (let sound of data) soundsList.appendChild(renderButton(sound));
}
setInterval(function() {
	document.getElementById('pitch').innerText = Susaudio._player.pitch;
	document.getElementById('audiop').innerText = Susaudio._player.queue.length;
	document.getElementById('fa').style.display = "block";
	if (Susaudio._player.queue.length == 0) document.getElementById('fa').style.display = "none";
}, 50)

setInterval(function() {
	document.getElementById('myRange').value = Susaudio._player.pitch;
	Susaudio._player.queue.forEach(audio => {
		audio.preservesPitch = false;
		if (at) audio.playbackRate = genRand(1.4, 3, 2);
	})
})

fetch('/sounds.json')
	.then(response => response.json())
	.then(renderButtons)
	.catch(err => console.log(err));

var slider = document.getElementById("myRange");
slider.oninput = function() {
	Susaudio._player.pitch = this.value;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genRand(min, max, decimalPlaces) {
	var rand = Math.random() * (max - min) + min;
	var power = Math.pow(10, decimalPlaces);
	return Math.floor(rand * power) / power;
}