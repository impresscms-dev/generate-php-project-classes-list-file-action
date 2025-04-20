[![License](https://img.shields.io/github/license/impresscms-dev/generate-php-project-classes-list-file-action.svg)](LICENSE) [![GitHub release](https://img.shields.io/github/release/impresscms-dev/generate-php-project-classes-list-file-action.svg)](https://github.com/impresscms-dev/generate-php-project-classes-list-file-action/releases)

# Generate PHP Project Classes List File Action

A GitHub Action that generates a comprehensive list of classes in your [PHP](https://php.net) project. This action is designed to work with projects that use [Composer](https://getcomposer.org) for dependency management.

## Usage

To integrate this action into your project, create a GitHub workflow file similar to the example below. You can customize the configuration to match your project's specific requirements:
```yaml
name: Generate PHP Class List

on:
  push:
    branches: [main]

jobs:
  generate-class-list:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup PHP environment
        uses: shivammathur/setup-php@v2
        with:
          php-version: 8.4
          extensions: curl, gd, pdo_mysql, json, mbstring, pcre, session
          ini-values: post_max_size=256M
          coverage: none
          tools: composer:v2

      - name: Install Composer dependencies
        run: composer install --no-progress --prefer-dist --optimize-autoloader

      - name: Generate PHP classes list
        uses: impresscms-dev/generate-php-project-classes-list-file-action@v2
        with:
          output_file: ./php-classes.lst
          # Optional: specify a different path if composer.json is not in the root
          # project_path: ./src

      - name: Upload classes list as artifact
        uses: actions/upload-artifact@v4
        with:
          name: php-classes-list
          path: ./php-classes.lst
```

## Prerequisites

Before using this action, ensure your workflow has:

1. PHP installed and configured
2. Composer setup and available

The example workflow above demonstrates how to properly configure these prerequisites using the [`shivammathur/setup-php`](https://github.com/marketplace/actions/setup-php-action) action.

## Configuration Options

This action accepts the following parameters in the `with` section of your workflow:

| Parameter    | Required | Default | Description                                           |
|-------------|----------|---------|-------------------------------------------------------|
| output_file | Yes      | -       | Destination file path for the generated classes list  |
| project_path | No       | `.`     | Path to the directory containing your composer.json   |

### Examples

**Basic Usage:**

Use this configuration when your `composer.json` file is located in the root directory of your repository. This is the most common setup for PHP projects.

```yaml
- name: Generate PHP classes list
  uses: impresscms-dev/generate-php-project-classes-list-file-action@v2
  with:
    output_file: ./php-classes.lst
```

**With Custom Project Path:**

Use this configuration when your PHP project is in a subdirectory or when you have multiple PHP projects in a monorepo structure. This allows you to specify exactly which project's classes should be listed.

```yaml
- name: Generate PHP classes list
  uses: impresscms-dev/generate-php-project-classes-list-file-action@v2
  with:
    output_file: ./php-classes.lst
    project_path: ./src
```

**Generating Multiple Class Lists:**

For repositories with multiple PHP projects, you can run the action multiple times with different configurations to generate separate class lists for each project.

```yaml
- name: Generate main project classes list
  uses: impresscms-dev/generate-php-project-classes-list-file-action@v2
  with:
    output_file: ./main-classes.lst
    project_path: ./main

- name: Generate API project classes list
  uses: impresscms-dev/generate-php-project-classes-list-file-action@v2
  with:
    output_file: ./api-classes.lst
    project_path: ./api
```

## Development

### Local Setup

Follow these steps to set up and work with the development environment for this action:

#### 1. Install Dependencies

First, install all required npm packages:

```bash
npm install
```

#### 2. Build the Action

Compile the source code using esbuild:

```bash
npm run pack
```

This creates a bundled version of the action in the `dist/` directory. For GitHub Actions, this directory must be committed to the repository as it contains the executable code that runs when others use this action.

Note: If you forget to update the `dist/` folder after making changes, don't worry - there's a CI workflow that automatically builds and updates it when pull requests are submitted.

#### 3. Run Tests

Execute the test suite to verify functionality:

```bash
npm test
```

#### 4. Code Quality

Check code quality with ESLint:

```bash
npm run lint
```

Automatically fix linting issues when possible:

```bash
npm run lint:fix
```

#### 5. Complete Verification

Run all checks (linting, building, and testing) in one command:

```bash
npm run all
```

This is particularly useful before submitting a pull request.

## Contributing

Contributions are welcome! To contribute to this project:

1. [Fork the repository](https://github.com/impresscms-dev/generate-php-project-classes-list-file-action/fork)
2. Create a feature branch and implement your changes
3. Ensure tests pass and code meets quality standards
4. [Submit a pull request](https://github.com/impresscms-dev/generate-php-project-classes-list-file-action/compare)

For bug reports, questions, or feature requests, please use the [issues section](https://github.com/impresscms-dev/generate-php-project-classes-list-file-action/issues).
