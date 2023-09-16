// synthesis/voice.js
$(function() {
  const synth = window.speechSynthesis

  window.Voice = {
    speak,
    changeSpeechStatus,
    cancel: ()=> synth.cancel(),
    pause: ()=> synth.pause(),
    resume: ()=> synth.resume()
  }

  const VoiceList = window.VoiceList
  const speechStatus = $('#speechStatus')
  const statusColors = {
    red: '&#128308;',
    green: '&#128994;',
    yellow: '&#128993'
  }


  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = VoiceList.findSelectedVoice()
    utterance.pitch = $('#pitch').val()
    utterance.rate = $('#rate').val()
    utterance.volume = $('#volume').val()
    utterance.addEventListener('start', ()=> changeSpeechStatus('red'))
    utterance.addEventListener('end', ()=> changeSpeechStatus('green'))
    utterance.addEventListener('pause', ()=> changeSpeechStatus('yellow'))
    utterance.addEventListener('resume', ()=> changeSpeechStatus('red'))

    synth.speak(utterance)
  }

  function changeSpeechStatus(color) {
    let symbol = statusColors[color]
    symbol = symbol || statusColors.green
    speechStatus.html(symbol)
  }



})