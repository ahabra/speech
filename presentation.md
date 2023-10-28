# Speech I/O In Your Browser - Synthesis and Recognition
### Windsor-Essex GDG DevFest 2023

Presented by: **Abdul Habra**, @ahabra

## Introduction

### Expectations

1. You know JavaScript
2. Ask if you do not understand
3. You will learn how to write a program that can speak or understand spoken words
4. You can use the accompanying demo to start your own speech app

### Background
* Web Speech API: introduced by W3C in 2012
* By 2015, Chrome supported it, even on Android devices
* Nowadays, most browsers support it, fully or partially
* Speech API consists of two parts:
    1. Speech Synthesis: text to speech
    2. Speech Recognition: speech to text

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
* Definition: Computer converting speech to text
* Up to the early 2000's, we used to consider Speech Recognition as a hard problem in Artificial Intelligence
* It used to require training the software with individual speakers
* Now, it is just a simple API in the browser :)


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

## Demo
SHOW THE DEMO


## References

1. This presentation:
    * https://github.com/ahabra/speech
2. Speech recognition example from Google:
    * https://www.google.com/intl/en/chrome/demos/speech.html
3. Speech recognition example from Mozilla:
    * https://mdn.github.io/dom-examples/web-speech-api/speech-color-changer/index.html
4. Speech API docs:
    * https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
5. W3C Speech API standatd:
    * https://wicg.github.io/speech-api/
