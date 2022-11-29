import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const extensions = [
  ['json', 'json', undefined, 'stylishFile.txt'], 
  ['yml', 'yml', undefined, 'stylishFile.txt'], 
  ['json', 'yml', undefined, 'stylishFile.txt'],

  ['json', 'json', 'stylish', 'stylishFile.txt'], 
  ['yml', 'yml', 'stylish', 'stylishFile.txt'], 
  ['json', 'yml', 'stylish', 'stylishFile.txt'],

  ['json', 'json', 'plain', 'plainFile.txt'], 
  ['yml', 'yml', 'plain', 'plainFile.txt'], 
  ['json', 'yml', 'plain', 'plainFile.txt'],

  ['json', 'json', 'json', 'jsonFile.txt'], 
  ['yml', 'yml', 'json', 'jsonFile.txt'], 
  ['json', 'yml', 'json', 'jsonFile.txt']
];

test.each(extensions)('Diff test (%s, %s, %s)', (file1Extension, file2Extension, format, resultFile) => {
  const filepath1 = getFixturePath(`file1.${file1Extension}`);
  const filepath2 = getFixturePath(`file2.${file2Extension}`);
  const result = readFile(resultFile);
  expect(getDiff(filepath1, filepath2, format)).toBe(result);
});
