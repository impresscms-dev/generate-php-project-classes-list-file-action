import * as core from '@actions/core';
import * as exec from '@actions/exec';
import path from 'path';
import { promises as fs } from 'fs';

/**
 * Helper class for working with Composer
 */
export class ComposerHelper {
  /**
   * Run composer dumpautoload with optimization
   *
   * @param {string} projectPath - Path to the project
   * @returns {Promise<void>}
   */
  static async optimizeAutoloader(projectPath) {
    core.info('Dumping composer autoloader with optimization...');
    await exec.exec('composer', [
      'dumpautoload',
      '--optimize',
      '--working-dir', projectPath
    ]);
  }

  /**
   * Get the path to the composer classmap file
   *
   * @param {string} projectPath - Path to the project
   * @returns {string} - Path to the classmap file
   */
  static getClassmapPath(projectPath) {
    return path.join(projectPath, 'vendor/composer/autoload_classmap.php');
  }

  /**
   * Check if the classmap file exists
   *
   * @param {string} classmapPath - Path to the classmap file
   * @returns {Promise<boolean>} - True if the file exists
   */
  static async checkClassmapExists(classmapPath) {
    try {
      await fs.access(classmapPath);
      return true;
    } catch (error) {
      throw new Error(`Could not find classmap at ${classmapPath}. Make sure you've run composer with the --optimize flag.`);
    }
  }
}
