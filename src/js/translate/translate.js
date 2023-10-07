$(function() {
  window.Translate = {
    translateToEnglish
  }

  const translateUrl = 'https://translation.googleapis.com/language/translate/v2'
  const secrets = {
    projectId: '',
    token: ''
  }

  function readSecrets() {
    fetch('./js/translate/google-secret.json')
    .then(resp => resp.json())
    .then(json => {
      secrets.projectId = json.projectId
      secrets.token = json.token
    })
  }

  function translateToEnglish(sourceLanguage, text, callback) {
    if (sourceLanguage.toLowerCase().startsWith('en')) {
      return callback(true, text)
    }

    const options = createTranslateRequest(sourceLanguage, text)
    fetch(translateUrl, options)
    .then(resp => resp.json())
    .then(json => {
      const translated = json.data.translations[0].translatedText
      callback(true, translated)
    })
  }


  function createTranslateRequest(sourceLanguage, text) {
    const payload = {
      q: [text],
      target: 'en',
      source: sourceLanguage
    }

    return {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-goog-user-project': secrets.projectId,
        'Authorization': `Bearer ${secrets.token}`
      },
      body: JSON.stringify(payload)
    }
  }

  readSecrets()

})