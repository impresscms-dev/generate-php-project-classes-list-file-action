import * as core from '@actions/core';
import * as exec from '@actions/exec';

/**
 * Helper class for checking dependencies
 */
export class DependencyHelper {
  /**
   * Check if a command exists
   * 
   * @param {string} command - Command to check
   * @param {string} errorMessage - Error message to show if command doesn't exist
   * @returns {Promise<boolean>} - True if command exists
   * @throws {Error} - If command doesn't exist
   */
  static async checkCommandExists(command, errorMessage) {
    core.info(`Checking if ${command} is installed...`);
    
    try {
      let exitCode;
      
      if (process.platform.includes('win')) {
        // Windows
        exitCode = await exec.exec('where', [command], { silent: true, ignoreReturnCode: true });
      } else {
        // Linux/macOS
        exitCode = await exec.exec('which', [command], { silent: true, ignoreReturnCode: true });
      }
      
      if (exitCode !== 0) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(errorMessage);
      }
      
      core.info(`${command} is installed.`);
      return true;
    } catch (error) {
      core.error(`${command} check failed: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Check if PHP is installed
   * 
   * @returns {Promise<boolean>} - True if PHP is installed
   * @throws {Error} - If PHP is not installed
   */
  static async checkPhpExists() {
    return this.checkCommandExists(
      'php',
      'PHP is not installed. Please install PHP before running this action.'
    );
  }
  
  /**
   * Check if Composer is installed
   * 
   * @returns {Promise<boolean>} - True if Composer is installed
   * @throws {Error} - If Composer is not installed
   */
  static async checkComposerExists() {
    return this.checkCommandExists(
      'composer',
      'Composer is not installed. Please install Composer before running this action.'
    );
  }
}
