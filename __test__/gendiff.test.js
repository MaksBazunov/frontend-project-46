import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff';
import fs from 'fs'

const result = [
  '  - follow : false',
  '    host : hexlet.io',
  '  - proxy : 123.234.53.22',
  '  - timeout : 50 \n  + timeout : 20',
  '  + verbose : true'
]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');


test('diff files', () => {
    
    const actual = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');

    expect(actual).toBe(console.log(`{\n${result.join('\n')}\n}`));
  });
  