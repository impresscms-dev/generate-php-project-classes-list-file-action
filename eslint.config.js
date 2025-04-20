import js from '@eslint/js';
import globals from 'globals';
import jestPlugin from 'eslint-plugin-jest';

export default [
  // Base ESLint recommended rules
  js.configs.recommended,
  
  // Main configuration
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es6,
        ...globals.jest
      }
    },
    plugins: {
      jest: jestPlugin
    },
    rules: {
      // Core ESLint rules
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'no-console': 'off',
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      
      // Jest plugin rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  },
  
  // Ignore patterns (equivalent to .eslintignore)
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**'
    ]
  }
];
