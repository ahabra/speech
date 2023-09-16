// synthesis/synthesis.js
$(function() {
  const VoiceList = window.VoiceList
  const Voice = window.Voice

  $('#sayIt').click(()=> {
    Voice.speak($('#textToSay').val())
  })

  $('#cancel').click(()=> {
    Voice.cancel()
    Voice.changeSpeechStatus('green')
  })
  $('#pause').click(()=> Voice.pause() )
  $('#resume').click(()=> Voice.resume() )


  $('input[type=range]').on('input change', function() {
    const self = $(this)
    $('span.value', self.parent()).text(self.val())
  })

  VoiceList.initVoices()

})
