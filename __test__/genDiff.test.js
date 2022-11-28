import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import getDiff from '../src/getDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const formats = ['yml', 'json'];
const expectedJson = readFile('jsonFile.txt');
const expectedPlain = readFile('plainFile.txt');
const expectedStylish = readFile('stylishFile.txt');

test.each(formats)('diff test', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);
  expect(getDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
  expect(getDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(getDiff(filepath1, filepath2, 'json')).toBe(expectedJson);
  expect(getDiff(filepath1, filepath2)).toBe(expectedStylish);
});
