import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import  getFormatFile  from "../parsers.js";
import process from "node"


const getFileData = (filePath)=>{
  const absolutPathFile = path.resolve( process.cwd(), filePath);
  return fs.readFileSync(absolutPathFile,'utf-8');
}

export const getDiff = (filePath1,filePath2)=>{

const fileData1 = getFileData(filePath1);
const fileData2 = getFileData(filePath2);

const formatFile1 = getFormatFile(fileData1,filePath1);
const formatFile2 = getFormatFile(fileData2,filePath2);

const fileKeys = _.union(_.keys(formatFile1), _.keys(formatFile2)).sort();
  const Diffkey = (key) => {
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
   const result = fileKeys.map((key) => Diffkey(key));
 
  return `{\n${result.join('\n')}\n}`

};
export default getDiff;

