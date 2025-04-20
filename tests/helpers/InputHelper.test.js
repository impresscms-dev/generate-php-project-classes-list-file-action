import {InputHelper} from '../../src/helpers/InputHelper.js';

describe('InputHelper', () => {
  describe('projectPath', () => {
    test('normalizes empty paths to "."', () => {
      process.env['INPUT_PROJECT_PATH'] = '';

      expect(typeof InputHelper.projectPath).toBe('string');
      expect(InputHelper.projectPath).toBe('.');
    });

    test('returns the provided path', () => {
      process.env['INPUT_PROJECT_PATH'] = 'test/path';

      expect(typeof InputHelper.projectPath).toBe('string');
      expect(InputHelper.projectPath).toBe('test/path');
    });
  });

  // similar tests for outputFile
  describe('outputFile', () => {
    test('returns the provided output file', () => {
          process.env['INPUT_OUTPUT_FILE'] = 'test/output.txt';

          expect(typeof InputHelper.outputFile).toBe('string');
          expect(InputHelper.outputFile).toBe('test/output.txt');
        }
    );

    test('throws an error when output file is not provided', () => {
          process.env['INPUT_OUTPUT_FILE'] = '';

          expect(() => InputHelper.outputFile).toThrowError();
        }
    );
  });
});