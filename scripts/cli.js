#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');

// Fungsi untuk generate variabel otomatis
const generateVariables = (name) => {
  const vars = [
    { __VAR0__: name },
    { __VAR1__: name[0].toUpperCase() + name.slice(1) },
    { __VAR2__: name },
  ];

  if (name.includes('/')) {
    const holderData = name.split('/').at(-1); // Ambil bagian terakhir
    const folderPath = name.split('/').slice(0, -1).join('/'); // Ambil path folder

    vars[0].__VAR0__ = holderData;
    vars[1].__VAR1__ = holderData[0].toUpperCase() + holderData.slice(1);
    vars[2].__VAR2__ = name.toLowerCase();
  }

  return Object.assign({}, ...vars);
};

// Fungsi untuk replace template
const replaceTemplate = (template, variables) => {
  return Object.keys(variables).reduce((result, key) => {
    const regex = new RegExp(key, 'g');
    return result.replace(regex, variables[key]);
  }, template);
};

// Fungsi utama untuk generate file
const generateFile = async (templatePath, outputPath, variables, force) => {
  try {
    const fileExists = await fs.pathExists(outputPath);
    if (fileExists && !force) {
      throw new Error(`File already exists: ${outputPath}`);
    }

    const template = await fs.readFile(templatePath, 'utf8');
    const content = replaceTemplate(template, variables);

    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, content);
    console.log(`✅ Generated: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    throw error;
  }
};

program
  .name('api-generator')
  .description('Generate API endpoints and tests with automatic variables')
  .argument('<name>', 'Endpoint name (e.g. "user" or "user/data/test")')
  .option('--api', 'Generate API file')
  .option('--test', 'Generate test file')
  .option('-f, --force', 'Force overwrite existing files')
  .action(async (name, options) => {
    const { api, test } = options;

    // Generate variabel otomatis
    const variables = generateVariables(name);

    try {
      const templatesDir = path.join(__dirname, 'templates');
      const tasks = [];

      if (api) {
        tasks.push(
          generateFile(
            path.join(templatesDir, 'api.txt'),
            path.join(__dirname, '../src/api', `${name}.js`),
            variables
          )
        );
      }

      if (test) {
        tasks.push(
          generateFile(
            path.join(templatesDir, 'test.txt'),
            path.join(__dirname, '../test/api', `${name}.test.js`),
            variables
          )
        );
      }

      await Promise.all(tasks);
    } catch (error) {
      process.exit(1);
    }
  });

program.parse();
