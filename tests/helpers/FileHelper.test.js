import { jest } from '@jest/globals';
import { FileHelper } from '../../src/helpers/FileHelper.js';
import mockFs from 'mock-fs';

describe('FileHelper', () => {
  beforeEach(() => {
    // Setup mock filesystem
    mockFs({
      '/test/output': {}
    });
  });

  afterEach(() => {
    // Restore the real filesystem
    mockFs.restore();
  });

  describe('writeClassesToFile', () => {
    test('exists as a function', () => {
      expect(typeof FileHelper.writeClassesToFile).toBe('function');
    });

    test('writes classes to a file', async () => {
      const outputFile = '/test/output/classes.lst';
      const classes = ['Class1', 'Class2', 'Class3'];

      // Mock core.info to avoid errors
      jest.spyOn(console, 'log').mockImplementation(() => {});

      await FileHelper.writeClassesToFile(outputFile, classes);

      // Read the file to verify it was written correctly
      const fileContent = await import('fs').then(fs => fs.promises.readFile(outputFile, 'utf8'));
      expect(fileContent).toBe('Class1\nClass2\nClass3');
    });

    test('handles empty classes array', async () => {
      const outputFile = '/test/output/empty.lst';
      const classes = [];

      // Mock core.info to avoid errors
      jest.spyOn(console, 'log').mockImplementation(() => {});

      await FileHelper.writeClassesToFile(outputFile, classes);

      // Read the file to verify it was written correctly
      const fileContent = await import('fs').then(fs => fs.promises.readFile(outputFile, 'utf8'));
      expect(fileContent).toBe('');
    });
  });
});
