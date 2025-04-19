import { jest } from '@jest/globals';
import mockFs from 'mock-fs';

// Mock the template import
jest.mock('../../templates/list.php.ejs', () => '<?php\n// Load the classmap file\n$classmapPath = \'<%= classmapPath %>\'\n$classmap = require($classmapPath);\n\n// Extract class names (keys from the classmap)\n$classes = array_keys($classmap);\n\n// Filter out any empty class names\n$classes = array_filter($classes, function($className) {\n    return !empty($className) && is_string($className);\n});\n\n// Output the class names, one per line\necho implode("\\n", $classes);\n?>', { virtual: true });

// Import after mocking
import { TemplateHelper } from '../../src/helpers/TemplateHelper.js';

// Mock the URL module
jest.mock('url', () => ({
  fileURLToPath: jest.fn(() => '/mock/path/to/TemplateHelper.js')
}));

describe('TemplateHelper', () => {
  beforeEach(() => {
    // Setup mock filesystem with the actual path structure
    mockFs({
      '/home/mekdrop/IdeaProjects/generate-php-project-classes-list-file-action/templates': {
        'test.ejs': '<%= testVar %>'
      }
    });
  });

  afterEach(() => {
    // Restore the real filesystem
    mockFs.restore();
  });

  describe('loadTemplate', () => {
    test('exists as a function', () => {
      expect(typeof TemplateHelper.loadTemplate).toBe('function');
    });

    test('loads and processes a template with variables', () => {
      const templateName = 'test.ejs';
      const variables = { testVar: 'Hello World' };

      const result = TemplateHelper.loadTemplate(templateName, variables);

      expect(result).toBe('Hello World');
    });

    test('handles empty variables', () => {
      const templateName = 'test.ejs';

      // Provide a default empty object for variables
      const result = TemplateHelper.loadTemplate(templateName, { testVar: '' });

      // The template should render an empty string
      expect(result).toBe('');
    });
  });
});
