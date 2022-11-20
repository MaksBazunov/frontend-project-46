import { test, expect } from '@jest/globals';
import  path  from 'path';
import { fileURLToPath } from 'node:url';
import getDiff from '../src/getDiff';
import fs from 'fs'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');


test('diff format stylish', () => {
    
    const actual = getDiff(getFixturePath('filepath1.json'), getFixturePath('filepath2.json'), 'stylish');

    expect(actual).toBe(readFile('stylishFile.txt'));
  });
  


test('diff format stylish 1', () => {
    
  const actual = getDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish');

  expect(actual).toBe(readFile('stylishFile.txt'));
});

test('diff format stylish 2', () => {
    
  const actual = getDiff(getFixturePath('file1.yml'), getFixturePath('filepath2.json'),'stylish');

  expect(actual).toBe(readFile('stylishFile.txt'));
});

test('diff format plain', () => {
    
  const actual = getDiff(getFixturePath('filepath1.json'), getFixturePath('filepath2.json'), 'plain');

  expect(actual).toBe(readFile('plainFile.txt'));
});



test('diff format plain 1', () => {
  
const actual = getDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');

expect(actual).toBe(readFile('plainFile.txt'));
});

test('diff format plain 2', () => {
  
const actual = getDiff(getFixturePath('file1.yml'), getFixturePath('filepath2.json'),'plain');

expect(actual).toBe(readFile('plainFile.txt'));
});

test('diff format json', () => {
    
  const actual = getDiff(getFixturePath('filepath1.json'), getFixturePath('filepath2.json'), 'json');

  expect(actual).toBe(readFile('jsonFile.txt'));
});



test('diff format json 1', () => {
  
const actual = getDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');

expect(actual).toBe(readFile('jsonFile.txt'));
});

test('diff format json 2', () => {
  
const actual = getDiff(getFixturePath('file1.yml'), getFixturePath('filepath2.json'),'json');

expect(actual).toBe(readFile('jsonFile.txt'));
});