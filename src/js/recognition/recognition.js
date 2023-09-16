// recognition/recognition.js
$(function() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  recognition.lang = "en-US"
  recognition.continuous = true
  recognition.interimResults = true
  recognition.maxAlternatives = 1

  $('#start').click(()=> {
    recognition.start()
  })

  $('#stop').click(()=> {
    recognition.stop()
  })

  $('#reset').click(()=> {
    recognition.stop()
    $('#spokenText').html('')
  })

  recognition.addEventListener('result', event => {
    const text = event.results[0][0].transcript
    $('#spokenText').html(text)
  })

})