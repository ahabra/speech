# Speech I/O In Your Browser - Synthesis and Recognition
### Windsor-Essex GDG DevFest 2023

Presented by: **Abdul Habra**

### Prerequisit: JavaScript
<!--  -->
<div style="page-break-after: always"></div>

## Speech Synthesis
Definition: Computer converting text to speech

### Hello World

```JS
const utterance = new SpeechSynthesisUtterance('Hello World')
window.speechSynthesis.speak(utterance)
```

### Voices

```JS
window.speechSynthesis.getVoices()
```
Returns an array of objects. An example object:

```json
{
  default: true
  lang: "en-US"
  localService: true
  name: "Alex"
  voiceURI: "Alex"
}
```

### Contfigure Utterance
The `SpeechSynthesisUtterance` has some interesting properties:

* `voice` : Control the speaker's voice
* `pitch` :  Sound's frequency. 0 to 2. Default = 1
* `rate` : Speed. 0.1 to 10. Default = 10
* `volume`: 0 to 1. Default = 1

<div style="page-break-after: always"></div>

## Speech Recognition
Definition: Computer converting speech to text

```JS
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.addEventListener('result', event => {
    const text = event.results[0][0].transcript
    console.log(text)
  })

recognition.start()
```

### Contfigure Recognition

The `recognition` instance has some useful properties:

* `lang`: Examples ('en', 'fr', 'ar', ...). Default is page language or browser's
* `continuous`: boolean. Default: false. Continuous results or a single result
* `interimResults`: boolean. Default: false. Interim results are results that are not yet final
* `maxAlternatives`: number. Default: 1. Maximum returned alternatives for each result
