import path from 'path';
import fs from 'fs';
import process from 'node:process';
import parse from './parsers.js';
import genTree from './genTree.js';
import renderFormat from './formatter/index.js';

const getFileData = (filePath) => {
  const absolutPathFile = path.resolve(process.cwd(), filePath);
  return fs.readFileSync(absolutPathFile, 'utf-8');
};

const getDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileData1 = getFileData(filepath1);
  const fileData2 = getFileData(filepath2);

  const fileFormat1 = path.extname(filepath1).substring(1);
  const fileFormat2 = path.extname(filepath2).substring(1);

  const parseFile1 = parse(fileData1, fileFormat1);
  const parseFile2 = parse(fileData2, fileFormat2);

  const diffKeys = genTree(parseFile1, parseFile2);

  return renderFormat(diffKeys, format);
};

export default getDiff;
