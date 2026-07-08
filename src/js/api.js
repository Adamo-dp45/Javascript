/**
 * Api Navigateur
 */

// -- Fullscreen -- //
const fullscreen = document.getElementById('fullscreen')
fullscreen.addEventListener('click', () => {
    const element = document.documentElement // L'élément entier du document
    if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => { // Demander le plein écran
            console.error(`Erreur lors de la demande de plein écran : ${err.message}`)
        })
    } else {
        document.exitFullscreen() // Quitter le plein écran
    }
})
// -- Clipboard -- //
const textCopy = document.getElementById('copy').textContent
const copy =  document.querySelector('.c')
const statut = document.getElementById('status')
copy.addEventListener('click', () => {
    navigator.clipboard.writeText(textCopy)
    .then(() => {
        statut.textContent = 'Texte copié avec succès !'
    })
    .catch(error => {
        statut.textContent = 'Échec lors de la copie'
    })
})
// -- Web Speech -- //
const speakB = document.getElementById('speak-btn')
const stopB = document.getElementById('stop')
const textInput = document.getElementById('text')

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'fr-FR'
        utterance.rate = 1 // Vitesse 0.1 à 10
        utterance.pitch = 1 // Ton 0 à 2
        speechSynthesis.speak(utterance)
    } else {
        alert('Votre navigateur ne supporte pas la synthèse vocale !')
    }
}

speakB.addEventListener('click', () => {
    const text = textInput.value.trim()
    if (text) {
        speak(text)
    }
})

stopB.addEventListener('click', () => {
    speechSynthesis.cancel() // Arrête toute parole en cours
})
// --
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
if (!SpeechRecognition) {
    alert("Votre navigateur ne supporte pas la reconnaissance vocale !")
} else {
    const recognition = new SpeechRecognition()
    recognition.lang = 'fr-FR'
    recognition.interimResults = true // Résultats en temps réel
    recognition.continuous = true // Continue jusqu'à arrêt manuel

    // --- Commande
    const actionElement = document.getElementById('action')
    const commands = { 
        'change couleur rouge': () => document.body.style.backgroundColor = 'red',
        'change couleur bleu': () => document.body.style.backgroundColor = 'blue',
        'ouvre google': () => window.open('https://www.google.com', '_blank'),
        'réinitialise la couleur': () => document.body.style.backgroundColor = ''
    }

    const resultElement = document.getElementById('result')
    const startBtn = document.getElementById('start-btn')
    const stopBtn = document.getElementById('stop-btn')

    recognition.addEventListener('result', (event) => { // Quand on obtient des résultats
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript
        }
        resultElement.textContent = transcript

        for (const command in commands) { // --- Commande
            if (transcript.includes(command)) {
                commands[command]()
                actionElement.textContent = `Commande exécutée : ${command}`
                break
            }
        }
    })

    startBtn.addEventListener('click', () => {
        recognition.start()
    })

    stopBtn.addEventListener('click', () => {
        recognition.stop()
    })

    recognition.addEventListener('error', (e) => {
        console.error('Erreur de reconnaissance vocale : ', e.error)
    })
}
// --
const audio = document.getElementById('audio')
const audioFileInput = document.getElementById('audio-file')
const volumeSlider = document.getElementById('volume')
const rateSlider = document.getElementById('playbackRate')

audioFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if (file) {
        audio.src = URL.createObjectURL(file)
    }
    // audio.play() -- Jouer
    // audio.pause() -- Pause
})

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value
})

rateSlider.addEventListener('input', () => {
    audio.playbackRate = rateSlider.value
})
// -- Enregistrement audio
let mediaRecorder
let audioChunks = []
const startRecordBtn = document.getElementById('start-record')
const stopRecordBtn = document.getElementById('stop-record')
const recordedAudio = document.getElementById('recorded-audio')
const downloadLink = document.getElementById('download')

startRecordBtn.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)
    audioChunks = []
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data)
    mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/wav' })
        recordedAudio.src = URL.createObjectURL(blob)
        downloadLink.href = recordedAudio.src
    }
    mediaRecorder.start()
})

stopRecordBtn.addEventListener('click', () => {
    if (mediaRecorder) mediaRecorder.stop()
})

// -- Visualisation audio
const canvas = document.getElementById('visualizer')
const ctx = canvas.getContext('2d')

const audioContext = new (window.AudioContext || window.webkitAudioContext)()
let source
const analyser = audioContext.createAnalyser()
analyser.fftSize = 256
const bufferLength = analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)

function visualize() {
    requestAnimationFrame(visualize)
    if (!source) {
        return
    }
    analyser.getByteFrequencyData(dataArray)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const barWidth = canvas.width / bufferLength
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i]
        ctx.fillStyle = rgb(`${barHeight+100},50,50`)
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight)
    }
}
visualize()

audio.addEventListener('play', () => { // Connecter la source audio pour visualisation
    if (!source) {
        source = audioContext.createMediaElementSource(audio)
        source.connect(analyser)
        analyser.connect(audioContext.destination)
    }
})
// --
const video = document.getElementById('video')
const videoFileInput = document.getElementById('video-file')
const volumeVideo = document.getElementById('volume')
const rateVideo = document.getElementById('playbackRatev')

videoFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if (file) {
        video.src = URL.createObjectURL(file)
    }
})

volumeVideo.addEventListener('input', () => video.volume = volumeVideo.value)
rateVideo.addEventListener('input', () => video.playbackRate = rateVideo.value)
// ----- //
const webcam = document.getElementById('webcam')
const startRecord = document.getElementById('start-recorder')
const stopRecord = document.getElementById('stop-recorder')
const recordedVideo = document.getElementById('recorded-video')
const download = document.getElementById('download')

let mediaRecord
let videoChunks = []

async function initWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }, {})
    webcam.srcObject = stream
    mediaRecord = new MediaRecorder(stream)
    mediaRecord.ondataavailable = e => videoChunks.push(e.data)
    mediaRecord.onstop = () => {
        const blob = new Blob(videoChunks, { type: 'video/webm' })
        recordedVideo.src = URL.createObjectURL(blob)
        download.href = recordedVideo.src
        videoChunks = []
    }
}

initWebcam()

startRecord.addEventListener('click', () => {
    if (mediaRecord && mediaRecord.state === 'inactive') mediaRecord.start()
})

stopRecord.addEventListener('click', () => {
    if (mediaRecord && mediaRecord.state === 'recording') mediaRecord.stop()
})

/*
    navigator.mediaDevices
    .getUserMedia({
        video: true,
        audio: true
    })
    .then(function (stream) {
    })
    .catch(function (err) {
    })
*/