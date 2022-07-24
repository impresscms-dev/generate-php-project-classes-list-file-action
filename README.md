[![License](https://img.shields.io/github/license/impresscms-dev/generate-php-project-classes-list-file-action.svg)](LICENSE)
[![GitHub release](https://img.shields.io/github/release/impresscms-dev/generate-php-project-classes-list-file-action.svg)](https://github.com/impresscms-dev/generate-php-project-classes-list-file-action/releases)

# Generate PHP project classes list file action

GitHub action to generate a file with [PHP](https://php.net) project classes list (works only with [composer](https://getcomposer.org) projects)

## Usage

To use this action in your project, create workflow in your project similar to this code (Note: some parts and arguments needs to be altered):
```yaml
name: Generate PHP project class list as artifact

on:
  push:

jobs:
  get_php_classes_list:
    runs-on: ubuntu-latest
    steps:
      - name: Checkouting project code...
        uses: actions/checkout@v2
        
      - name: Install PHP
        uses: shivammathur/setup-php@master
        with:
          php-version: 8.1
          extensions: curl, gd, pdo_mysql, json, mbstring, pcre, session
          ini-values: post_max_size=256M
          coverage: none
          tools: composer:v2
          
      - name: Install Composer dependencies (with dev)
        run: composer install --no-progress --no-suggest --prefer-dist --optimize-autoloader
        
      - name: Getting PHP classes list...
        uses: impresscms-dev/generate-php-project-classes-list-file-action@v0.1.1
        with:
          output_file: ./php-classes.lst
          
      - uses: actions/upload-artifact@v3
        with:
          name: my-artifact
          path: ./php-classes.lst
```

## Arguments 

This action supports such arguments (used in `with` keyword):
| Argument    | Required | Default value        | Description                       |
|-------------|----------|----------------------|-----------------------------------|
| output_file | Yes      |                      | File where to write classes list  |

## How to contribute? 

If you want to add some functionality or fix bugs, you can fork, change and create pull request. If you not sure how this works, try [interactive GitHub tutorial](https://skills.github.com).

If you found any bug or have some questions, use [issues tab](https://github.com/impresscms-dev/generate-php-project-classes-list-file-action/issues) and write there your questions.
