import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'node:url';
import getDiff from '../src/getDiff';
import fs from 'fs'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');


test('diff files', () => {
    
    const actual = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));

    expect(actual).toBe(readFile('expected_file.txt'));
  });
  