module.exports = {
  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': (filenames) => [
    'eslint --fix',
    'prettier --write',
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': (filenames) => [
    'prettier --write',
  ],

  // Run type-check on changes to TypeScript files
  '**/*.ts?(x)': () => 'npm run type-check',
};