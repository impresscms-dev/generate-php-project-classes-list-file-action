import * as esbuild from 'esbuild';
import ejsPlugin from './esbuild-plugin-ejs.js';
import fs from 'fs';
import path from 'path';

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy package.json to dist
fs.writeFileSync(
  path.join('dist', 'package.json'),
  JSON.stringify({ type: 'module' })
);

// Build the project
try {
  const result = await esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    platform: 'node',
    target: 'node16',
    outfile: 'dist/index.js',
    format: 'esm',
    plugins: [ejsPlugin],
    minify: true,
    sourcemap: true,
    metafile: true,
  });

  console.log('Build completed successfully!');
  
  // Output build size info
  const outputSize = fs.statSync('dist/index.js').size;
  console.log(`Output size: ${(outputSize / 1024).toFixed(2)} KB`);
  
  // Output metafile for analysis if needed
  fs.writeFileSync('dist/meta.json', JSON.stringify(result.metafile));
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
