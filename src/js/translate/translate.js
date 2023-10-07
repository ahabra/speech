$(function() {
  window.Translate = {
    translateToEnglish
  }

  const translateUrl = 'https://translation.googleapis.com/language/translate/v2'

  // This file is not added to git.
  // It is a json file with two keys: projectId and token.
  // You should get them from your Google cloud setup
  const secretFile = './js/translate/google-secret.json'
  const secrets = {
    projectId: '',
    token: ''
  }

  function readSecrets() {
    fetch(secretFile)
    .then(resp => resp.json())
    .then(json => {
      secrets.projectId = json.projectId
      secrets.token = json.token
    })
    .catch(err => {
      console.error(err)
    })
  }

  function translateToEnglish(sourceLanguage, text, callback) {
    if (sourceLanguage.toLowerCase().startsWith('en')) {
      return callback(true, text)
    }
    if (!secrets.projectId) {
      return callback(false, 'Err: Translation key not available')
    }

    const options = createTranslateRequest(sourceLanguage, text)
    fetch(translateUrl, options)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.status + ': Fetch Failed')
      }
      return resp.json()
    })
    .then(json => {
      const translated = json.data.translations[0].translatedText
      callback(true, translated)
    })
    .catch(err => {
      console.error(err)
      callback(false, 'Translation failed. ' + err.message)
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