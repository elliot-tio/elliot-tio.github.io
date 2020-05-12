let synth = window.speechSynthesis

let inputForm = document.querySelector('form')
let inputTxt = document.querySelector('.txt')
let voiceSelect = document.querySelector('select')

let pitch = document.querySelector('#pitch')
let pitchValue = document.querySelector('.pitch-value')
let rate = document.querySelector('#rate')
let rateValue = document.querySelector('.rate-value')

let voices = []

function populateVoiceList() {
	voices = synth.getVoices()

	for (i = 0; i < voices.length; i++) {
        if(voices[i].lang.startsWith('en')) {
            let option = document.createElement('option')
            option.textContent = voices[i].name + ' (' + voices[i].lang + ')'

            option.setAttribute('data-lang', voices[i].lang)
            option.setAttribute('data-name', voices[i].name)
            voiceSelect.appendChild(option)
        }
	}
}

populateVoiceList()
if (speechSynthesis.onvoiceschanged !== undefined) {
	speechSynthesis.onvoiceschanged = populateVoiceList
}

inputForm.onsubmit = function (event) {
	event.preventDefault()

    let name = inputTxt.value;
    const song = `Happy Birthday to you, ${name}, Happy Birthday to you, ${name}, Happy Birthday to you, dear ${name}, Happy Birthday To You`
    const utterThis = new SpeechSynthesisUtterance(song)
	let selectedOption = voiceSelect.selectedOptions[0].getAttribute(
		'data-name',
	)
	for (i = 0; i < voices.length; i++) {
		if (voices[i].name === selectedOption) {
			utterThis.voice = voices[i]
		}
	}
	utterThis.pitch = 1
	utterThis.rate = 1
    synth.speak(utterThis)
    document.getElementById('video').classList.remove('hidden');
    let secretMessage = document.getElementById('secret_message');
    secretMessage.innerHTML = name ? `Happy Birthday, ${name}!` : "Happy Birthday - wait, you didn't enter a name!";
    if(name === '') {
        secretMessage.classList.remove('rainbow');
    }
    secretMessage.classList.remove('hidden');

	inputTxt.blur()
}
