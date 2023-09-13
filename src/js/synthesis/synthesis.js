// synthesis.js
$(function() {
  const Voice = window.Voice
  const synth = window.speechSynthesis
  let voices = []

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = listVoices
  }

  $('input[type=range]').on('input change', function() {
    const self = $(this)
    $('span.value', self.parent()).text(self.val())
  })

  function sayIt(event) {
    event.preventDefault()
    const text = $('#textToSay').val()
    speak(text)
  }

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = Voice.findSelectedVoice(voices)
    utterance.pitch = $('#pitch').val()
    utterance.rate = $('#rate').val()
    utterance.volume = $('#volume').val()
    synth.speak(utterance)
  }

  function listVoices() {
    voices = Voice.findEnglishVoices(synth.getVoices())
    Voice.showVoiceTable(voices)
  }


  $('#sayIt').click(sayIt)
  listVoices()


})
