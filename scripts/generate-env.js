const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

const env = dotenv.config().parsed;

if (!env || !env.API_URL) {
  console.error('.env não encontrado ou variável API_URL ausente.');
  process.exit(1);
}

const content = `
export const environment = {
  production: false,
  apiUrl: '${env.API_URL}'
};
`;

const outputDir = path.resolve(__dirname, '../src/environments');
const outputPath = path.resolve(outputDir, 'environment.ts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, content.trim());

console.log('!!!Environment.ts gerado com sucesso!');
