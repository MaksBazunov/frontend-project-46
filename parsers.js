import yaml from 'js-yaml';
import path from 'path';

const parse = (fileData,filePath) => {
  const fileExt = path.extname(filePath).substring(1);
  if (fileExt === '') {
    return JSON.parse(fileData)
  };
  if (fileExt === 'json') {
    return JSON.parse(fileData)
  };
  if (fileExt === 'yaml') {
    return yaml.load(fileData)
  };
  if (fileExt === 'yml') {
    return yaml.load(fileData)
  };
  return 'Error: wrong file format';
};

export default parse;
