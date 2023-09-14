// synthesis.js
$(function() {
  const Voice = window.Voice
  const synth = window.speechSynthesis
  let voices = []

  function initVoices() {
    if (synth.onvoiceschanged === undefined) {
      getAndListVoices()  // works in old Chrome, but not new Chrome
    } else {
      // Works in modern Chrome
    synth.onvoiceschanged = getAndListVoices
    }
  }

  function getAndListVoices() {
    voices = Voice.findEnglishVoices()
    Voice.showVoiceTable(voices)
  }

  $('#sayIt').click(()=> {
    Voice.speak(voices, $('#textToSay').val())
  })

  $('#cancel').click(()=> synth.cancel() )
  $('#pause').click(()=> synth.pause() )
  $('#resume').click(()=> synth.resume() )


  $('input[type=range]').on('input change', function() {
    const self = $(this)
    $('span.value', self.parent()).text(self.val())
  })

  initVoices()


})
