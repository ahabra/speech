#!/bin/bash

file=src/js/translate/google-secret.json

echo "Update google cloud token in ${file} ..."
token=$(gcloud auth print-access-token)

jq --arg jqtoken $token '.token=$jqtoken' $file > temp.json
mv temp.json $file
