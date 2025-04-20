import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

// Import the template directly from the file
import listPhpTemplate from '../../templates/list.php.ejs';

/**
 * Helper class for working with templates
 */
export class TemplateHelper {
  /**
   * Templates map
   * @private
   */
  static #templates = {
    'list.php.ejs': listPhpTemplate
  };

  /**
   * Load a template and replace variables
   *
   * @param {string} templateName - Name of the template file
   * @param {Object} variables - Variables to replace in the template
   * @returns {string} - Processed template content
   */
  static loadTemplate(templateName, variables = {}) {
    // First try to use the embedded template
    if (this.#templates[templateName]) {
      return ejs.render(this.#templates[templateName], variables);
    }

    // Fallback to file system for development/testing
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Try to load from the templates directory
    const templatePath = path.join(__dirname, '../..', 'templates', templateName);

    if (fs.existsSync(templatePath)) {
      const templateContent = fs.readFileSync(templatePath, 'utf8');
      return ejs.render(templateContent, variables);
    }

    throw new Error(`Template ${templateName} not found`);
  }
}
