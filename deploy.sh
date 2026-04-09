#!/bin/bash

# Zugangsdaten aus .env laden
if [ ! -f .env ]; then
  echo "Fehler: .env Datei nicht gefunden!"
  echo "Bitte .env.example kopieren und ausfüllen: cp .env.example .env"
  exit 1
fi

source .env

echo "CSS minifizieren..."
npx --yes clean-css-cli neu/css/style.css -o neu/css/style.min.css

echo "Upload nach $SFTP_HOST..."

lftp -c "
open sftp://$SFTP_USER:$SFTP_PASS@$SFTP_HOST:$SFTP_PORT
mirror -R --verbose ./neu/ $SFTP_REMOTE_PATH
bye
"

echo "Fertig!"
