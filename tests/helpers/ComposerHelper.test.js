import { ComposerHelper } from '../../src/helpers/ComposerHelper.js';
import mockFs from 'mock-fs';

describe('ComposerHelper', () => {
  beforeEach(() => {
    // Setup mock filesystem
    mockFs({
      '/test/project': {
        'vendor': {
          'composer': {
            'autoload_classmap.php': '<?php return [];'
          }
        }
      }
    });
  });

  afterEach(() => {
    // Restore the real filesystem
    mockFs.restore();
  });

  describe('getClassmapPath', () => {
    test('returns the correct path', () => {
      const projectPath = '/test/project';
      const result = ComposerHelper.getClassmapPath(projectPath);
      expect(result).toBe('/test/project/vendor/composer/autoload_classmap.php');
    });
  });

  describe('checkClassmapExists', () => {
    test('exists as a function', () => {
      expect(typeof ComposerHelper.checkClassmapExists).toBe('function');
    });

    test('returns true when file exists', async () => {
      const classmapPath = '/test/project/vendor/composer/autoload_classmap.php';
      const result = await ComposerHelper.checkClassmapExists(classmapPath);
      expect(result).toBe(true);
    });

    test('throws error when file does not exist', async () => {
      const nonExistentPath = '/test/project/vendor/composer/non_existent.php';
      await expect(ComposerHelper.checkClassmapExists(nonExistentPath))
        .rejects
        .toThrow(`Could not find classmap at ${nonExistentPath}. Make sure you've run composer with the --optimize flag.`);
    });
  });
});
