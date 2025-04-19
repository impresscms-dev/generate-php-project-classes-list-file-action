import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { TemplateHelper } from './TemplateHelper.js';

/**
 * Helper class for working with PHP
 */
export class PhpHelper {
  /**
   * Extract classes from the composer classmap
   *
   * @param {string} classmapPath - Path to the classmap file
   * @returns {Promise<string[]>} - Array of class names
   */
  static async extractClassesFromClassmap(classmapPath) {
    core.info('Extracting classes from the classmap...');
    let classesOutput = '';

    const phpScript = TemplateHelper.loadTemplate('list.php.ejs', { classmapPath });

    const options = {
      listeners: {
        stdout: (data) => {
          classesOutput += data.toString();
        }
      }
    };

    await exec.exec('php', ['-r', phpScript], options);

    // Filter out any empty lines and ensure we have a clean list of class names
    const classes = classesOutput.trim().split('\n').filter(className => className.trim() !== '');
    core.info(`Found ${classes.length} classes in the classmap`);

    return classes;
  }
}
