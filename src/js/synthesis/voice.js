$(function() {
  window.Voice = {
    findEnglishVoices,
    showVoiceTable,
    speak,
    changeSpeechStatus
  }

  const synth = window.speechSynthesis
  const speechStatus = $('#speechStatus')

  function findEnglishVoices() {
    return synth.getVoices().filter(v => {
      return v.lang.toLowerCase().startsWith('en')
    })
  }

  function showVoiceTable(voices) {
    const voiceList = $('#voiceList tbody')
    let counter = 1
    voices.forEach(v => {
      const row = createVoiceRow(counter++, v)
      voiceList.append(row)
    });
  }

  function createVoiceRow(counter, voice) {
    const isDefault = voice.default ? '<b>true</b>' : 'false'
    const checked = voice.default ? 'checked' : ''
    const radio = `<input type="radio" class="selectedVoice" name="selected" value="${voice.name}" ${checked}>`
    return `<tr>
    <th>${counter}</th>
    <td>${voice.name}</td>
    <td>${voice.lang}</td>
    <td>${voice.localService}</td>
    <td>${isDefault}</td>
    <td>${radio}</td>
    </tr>`
  }

  function findSelectedVoice(voices) {
    const name = $('.selectedVoice:checked').val()
    return voices.find(v => v.name === name)
  }

  function speak(voices, text) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = findSelectedVoice(voices)
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
    const colors = {
      red: '&#128308;',
      green: '&#128994;',
      yellow: '&#128993'
    }
    let symbol = colors[color]
    symbol = symbol || colors.green
    speechStatus.html(symbol)
  }


})