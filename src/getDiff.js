import path from 'path';
import fs from 'fs';
import  parse  from "../parsers.js";
import  process from 'node:process';
import genKey from '../genKey.js'
import stylish from '../formatter/stylish.js'

const getDiff = (filepath1, filepath2, format = 'stylish') => {
const getFileData = (filePath)=>{
  const absolutPathFile = path.resolve( process.cwd(), filePath);
  return fs.readFileSync(absolutPathFile,'utf-8');
}

const fileData1 = getFileData(filepath1);
const fileData2 = getFileData(filepath2);

const parseFile1 = parse(fileData1,filepath1);
const parseFile2 = parse(fileData2,filepath2);

const key = genKey(parseFile1, parseFile2);
if(format === 'stylish'){
  return stylish (key);
}
};

export default getDiff;