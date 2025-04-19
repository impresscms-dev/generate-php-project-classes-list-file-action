import fs from 'fs';
import path from 'path';

/**
 * esbuild plugin to handle .ejs files
 * This plugin loads .ejs files as strings
 */
export default {
  name: 'ejs',
  setup(build) {
    // Handle importing .ejs files
    build.onResolve({ filter: /\.ejs$/ }, (args) => {
      const resolvedPath = path.resolve(args.resolveDir, args.path);
      
      return {
        path: resolvedPath,
        namespace: 'ejs-raw',
      };
    });

    // Load .ejs files as strings
    build.onLoad({ filter: /.*/, namespace: 'ejs-raw' }, async (args) => {
      const content = await fs.promises.readFile(args.path, 'utf8');
      
      return {
        contents: `export default ${JSON.stringify(content)}`,
        loader: 'js',
      };
    });
  },
};
