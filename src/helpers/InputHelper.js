import * as core from '@actions/core';

/**
 * Helper class for handling GitHub Actions inputs
 */
export class InputHelper {
  /**
   * Get the output file path
   *
   * @returns {string} The output file path
   */
  static get outputFile() {
    const outputFile = core.getInput('output_file', { required: true });
    core.info(`Output file: ${outputFile}`);
    return outputFile;
  }

  /**
   * Get the project path
   *
   * @returns {string} The normalized project path
   */
  static get projectPath() {
    const projectPath = core.getInput('project_path') || '.';
    // Normalize project path
    const normalizedProjectPath = projectPath === '' ? '.' : projectPath;
    core.info(`Project path: ${normalizedProjectPath}`);
    return normalizedProjectPath;
  }
}
