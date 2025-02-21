// //  scripts/cli.js
// // !/usr/bin/env node
// const { Command } = require('commander');
// const fs = require('fs');
// const path = require('path');

// const program = new Command();

// program
//   .name('generated-testing')
//   .description('CLI to help generate boilerplate code')
//   .version('1.0.0');

// program
//   .command('generate <type> <name>')
//   .description('Generate boilerplate code')
//   .option('-T', '--test', 'Generated with sample test')
//   .option('-F', '--force', 'Replace File if Exist')
//   .action((type, name) => {
// const templateApi = path.join(__dirname, `/templates/api.txt`);
// const templateTest = path.join(__dirname, `/templates/test.txt`);
// const outputApi = path.join(__dirname, `../src/api/${name}.js`);
// const outputTest = path.join(__dirname, `../test/api/${name}.js`);

//     if (!fs.existsSync(templateApi) ||!fs.existsSync(templateTest) ) {
//       console.error(`Template ${type} tidak ditemukan.`);
//       process.exit(1);
//     }

//     if (program.opts === '-T' || program.opts === '--test') {
//       const templatePath = path.join(__dirname, `/templates/test.txt`);
//       const outputPath = path.join(
//         __dirname,
//         `../test/api/generated/${name}.test.js`
//       );
//       const template = fs.readFileSync(templatePath, 'utf8');
//       const content = template.replace(/__NAME__/g, name);
//       fs.writeFileSync(outputPath, content);
//       console.log(`Generated ${type}: ${outputPath}`);
//     } else {
//       const template = fs.readFileSync(templatePath, 'utf8');
//       const content = template.replace(/__NAME__/g, name);
//       fs.writeFileSync(outputPath, content);
//       console.log(`Generated ${type}: ${outputPath}`);
//     }
//   });

// program.parse(process.argv);
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();
const generate = new Command('generate');

// Fungsi untuk membaca template dari file
function readTemplate(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

// Fungsi untuk membuat file
function createFile(filePath, templatePath, name) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const templateContent = readTemplate(templatePath).replace(
    /\{\{name\}\}/g,
    name
  );
  fs.writeFileSync(filePath, templateContent);
  console.log(`✅ File created: ${filePath}`);
}

// Sub-command untuk generate API dan/atau test
generate
  .command('api <name>')
  .option('-T, --test', 'Generate test file as well')
  .action((name, options) => {
    console.log(`🔹 Generating API: ${name}`);
    const templateApi = path.join(__dirname, 'templates', 'api.txt');
    const templateTest = path.join(__dirname, 'templates', 'test.txt');
    const outputApi = path.join(__dirname, '../src/api', `${name}.js`);
    const outputTest = path.join(__dirname, '../test/api', `${name}.js`);

    createFile(outputApi, templateApi, name);

    if (options.test) {
      console.log(`🔹 Generating Test for API: ${name}`);
      createFile(outputTest, templateTest, name);
    } else {
      console.log(`⚠️ Skipping test generation for ${name}`);
    }
  });

// Sub-command untuk generate test file saja
generate.command('test <name>').action((name) => {
  console.log(`🔹 Generating Test: ${name}`);
  const templateTest = path.join(__dirname, 'templates', 'test.txt');
  const outputTest = path.join(__dirname, '../test/api', `${name}.js`);
  createFile(outputTest, templateTest, name);
});

program.addCommand(generate);
program.parse(process.argv);
