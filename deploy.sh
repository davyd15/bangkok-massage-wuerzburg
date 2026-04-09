#!/bin/bash

# Zugangsdaten aus .env laden
if [ ! -f .env ]; then
  echo "Fehler: .env Datei nicht gefunden!"
  echo "Bitte .env.example kopieren und ausfüllen: cp .env.example .env"
  exit 1
fi

source .env

echo "CSS minifizieren..."
npx --yes clean-css-cli css/style.css -o css/style.min.css

echo "Upload nach $SFTP_HOST..."

lftp -c "
open sftp://$SFTP_USER:$SFTP_PASS@$SFTP_HOST:$SFTP_PORT
mirror -R --verbose . $SFTP_REMOTE_PATH --exclude-glob .env --exclude-glob .env.example --exclude-glob .git --exclude-glob .gitignore --exclude-glob .DS_Store --exclude-glob README.md --exclude-glob LICENSE --exclude-glob deploy.sh --exclude-glob alt-wordpress/
bye
"

echo "Fertig!"
