#!/usr/bin/env bats

setup_file() {
 export TMP_PATH=$(mktemp -d)
 export CURRENT_PATH=$(pwd)
 export OUTPUT_FILE=classes.lst

 pushd "$TMP_PATH"  > /dev/null
   git clone --no-tags --quiet https://github.com/imponeer/criteria.git .

   php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
   php composer-setup.php --quiet --install-dir=. --filename=composer
   rm -rf composer-setup.php

   ./composer install --no-interaction --no-progress -q

   php "$CURRENT_PATH"/bin/run.php "$OUTPUT_FILE"
 popd > /dev/null
}

teardown_file() {
  rm -rf "$TMP_PATH"
}

@test "generated file exists" {
  [ -f "$TMP_PATH/$OUTPUT_FILE" ]
}

@test "file not empty" {
  [ -s "$TMP_PATH/$OUTPUT_FILE" ]
}