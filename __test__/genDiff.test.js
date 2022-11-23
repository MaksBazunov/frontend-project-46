import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import getDiff from '../src/getDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test.each([['filepath1.json','filepath2.json','stylishFile.txt'],
          ['file1.yml','file2.yml','stylishFile.txt'],
          ['file1.yml','filepath2.json','stylishFile.txt'],])('diff format stylish', 
          (filepath1,filepath2,expected) => {
  const actual = getDiff(getFixturePath(filepath1), getFixturePath(filepath2), 'stylish');
  expect(actual).toBe(readFile(expected));
});

test.each([['filepath1.json','filepath2.json','plainFile.txt'],
           ['file1.yml','file2.yml','plainFile.txt'],
           ['file1.yml','filepath2.json','plainFile.txt'],])('diff format plain', 
           (filepath1,filepath2,expected) => {
  const actual = getDiff(getFixturePath(filepath1), getFixturePath(filepath2), 'plain');
  expect(actual).toBe(readFile(expected));
});

test.each([['filepath1.json','filepath2.json','jsonFile.txt'],
           ['file1.yml','file2.yml','jsonFile.txt'],
           ['file1.yml','filepath2.json','jsonFile.txt'],])('diff format json', 
           (filepath1,filepath2,expected) => {
  const actual = getDiff(getFixturePath(filepath1), getFixturePath(filepath2), 'json');
  expect(actual).toBe(readFile(expected));
});
