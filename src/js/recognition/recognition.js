// recognition/recognition.js
$(function() {
  const Translate = window.Translate
  const $start = $('#start')
  const $spokenText = $('#spokenText')
  const $textLog = $('#textLog')
  const $language = $('#language')

  const recognition = initSpeechRecognition()

  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    return recognition
  }

  $start.click(()=> {
    $spokenText.val('')
    recognition.lang = $language.val()
    recognition.start()
  })

  $('#stop').click(()=> {
    recognition.stop()
  })

  $('#reset').click(()=> {
    recognition.stop()
    $spokenText.val('')
    $textLog.html('')
  })

  recognition.addEventListener('audiostart', () => {
    showListening(true)
  })

  recognition.addEventListener('audioend', () => {
    showListening(false)
  })

  recognition.addEventListener('result', event => {
    const text = event.results[0][0].transcript
    $spokenText.val(text)
  })

  recognition.addEventListener('end', () => {
    const text = $spokenText.val()
    if (text.length > 0) {
      $textLog.append(`<li>${text}</li>\n`)
      Translate.translateToEnglish($language.val(), text)
    }
    console.log('Speech ended')
  })

  function showListening(isListening) {
    if (isListening) {
      $start.attr('aria-busy', 'true')
      $start.addClass('attention')
    } else {
      $start.removeAttr('aria-busy')
      $start.removeClass('attention')
    }
  }


})