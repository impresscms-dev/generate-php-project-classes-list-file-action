<?php

$result_filename = $argv[1];

require "./vendor/autoload.php";

$classes = array_keys(
  require("./vendor/composer/autoload_classmap.php")
);

file_put_contents(
  $result_filename, 
  implode(PHP_EOL, $classes)
);
