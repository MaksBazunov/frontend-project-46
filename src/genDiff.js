import path from 'path';
import process from 'node:process';
import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';


const getFileData = (filePath)=>{
  const absolutPathFile = path.resolve( process.cwd(), filePath);
  return fs.readFileSync(absolutPathFile,'utf-8');
}


const getFormatFile =(fileData,filePath)=>{
  const fileExt = path.extname(filePath).substring(1)
  if(fileExt === 'json') {
    return JSON.parse(fileData)
  }
  if(fileExt === 'yaml') {
    return yaml.load(fileData)
  }
}


export const genDiff = (filePath1,filePath2)=>{

const fileData1 = getFileData(filePath1);
const fileData2 = getFileData(filePath2);

const formatFile1 = getFormatFile(fileData1,filePath1);
const formatFile2 = getFormatFile(fileData2,filePath2);

const fileKeys = _.union(_.keys(formatFile1), _.keys(formatFile2)).sort();
  const getDiff = (key) => {
    if (!_.has(formatFile1, key)) {
      return `  + ${key} : ${formatFile2[key] }`;
    }
    if (!_.has(formatFile2, key)) {
      return  `  - ${key} : ${formatFile1[key]}`;
    }
    if (formatFile1[key] === formatFile2[key]){
      return `    ${key} : ${formatFile1[key]}`;
    }
    if (formatFile1[key] !== formatFile2[key]){
        return `  - ${key} : ${formatFile1[key]} \n  + ${key} : ${formatFile2[key]}`;
      }
    }
   const result = fileKeys.map((key) => getDiff(key));
 
  console.log(`{\n${result.join('\n')}\n}`)

};
export default genDiff;

