# Speech Synthesis and Recognition Using Browser

* Author: Abdul Habra
* 2023-09-13


## Run locally

* Prerequisite: install Caddy server to run localhost: https://caddyserver.com/
* At terminal run `caddy run`
* When done, at terminal do `Ctrl-C`
* To update Google Translate access token, run `./update-key.sh`


## Techincal Resources

### Demos
* Web Speech API Demonstration:  https://www.google.com/intl/en/chrome/demos/speech.html


### Google Translate

Some useful GC commands:

```bash
gcloud --help
gcloud topic --help
gcloud cheat-sheet

# print my GC access token
gcloud auth print-access-token

# Get project info
curl -X GET -H "Authorization: Bearer $(gcloud auth print-access-token)" "https://cloudresourcemanager.googleapis.com/v3/projects/${PROJECT_ID}"

# translate text from request.json
curl -X POST \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "x-goog-user-project: ${PROJECT_ID}" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d @request.json \
    "https://translation.googleapis.com/language/translate/v2"

```

