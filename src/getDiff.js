import path from 'path';
import fs from 'fs';
import process from 'node:process';
import parse from '../parsers.js';
import genKey from '../genKey.js';
import renderFormat from '../formatter/index.js';

const getDiff = (filepath1, filepath2, format = 'stylish') => {
  const getFileData = (filePath) => {
    const absolutPathFile = path.resolve(process.cwd(), filePath);
    return fs.readFileSync(absolutPathFile, 'utf-8');
  };

  const fileData1 = getFileData(filepath1);
  const fileData2 = getFileData(filepath2);

  const parseFile1 = parse(fileData1, filepath1);
  const parseFile2 = parse(fileData2, filepath2);

  const diffKeys = genKey(parseFile1, parseFile2);

  return renderFormat(diffKeys, format);
};

export default getDiff;
