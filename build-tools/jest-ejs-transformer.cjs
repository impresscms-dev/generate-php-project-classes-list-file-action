/**
 * A custom Jest transformer for EJS files
 * This transformer converts EJS files to JS modules that export the template as a string
 */
module.exports = {
  process(sourceText) {
    return {
      code: `module.exports = ${JSON.stringify(sourceText)};`,
    };
  },
};
