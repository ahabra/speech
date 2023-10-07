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

  async function translateToEnglish(sourceLanguage, text) {
    const options = createTranslateRequest(sourceLanguage, text)
    const response = await fetch(translateUrl, options)
    const translation = await response.json()
    // TODO do something with translation
    console.log(translation)
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