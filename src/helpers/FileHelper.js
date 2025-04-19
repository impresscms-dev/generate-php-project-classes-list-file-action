import * as core from '@actions/core';
import { promises as fs } from 'fs';

/**
 * Helper class for file operations
 */
export class FileHelper {
  /**
   * Write classes to a file
   * 
   * @param {string} outputFile - Path to the output file
   * @param {string[]} classes - Array of class names
   * @returns {Promise<void>}
   */
  static async writeClassesToFile(outputFile, classes) {
    await fs.writeFile(outputFile, classes.join('\n'));
    core.info(`Successfully wrote ${classes.length} classes to ${outputFile}`);
  }
}
