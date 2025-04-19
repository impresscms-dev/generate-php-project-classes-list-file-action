import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

/**
 * Helper class for working with templates
 */
export class TemplateHelper {
  /**
   * Load a template and replace variables
   *
   * @param {string} templateName - Name of the template file
   * @param {Object} variables - Variables to replace in the template
   * @returns {string} - Processed template content
   */
  static loadTemplate(templateName, variables = {}) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const templatePath = path.join(__dirname, '../..', 'templates', templateName);
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    return ejs.render(templateContent, variables);
  }
}
