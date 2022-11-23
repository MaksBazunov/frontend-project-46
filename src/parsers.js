import yaml from 'js-yaml';

const parse = (fileData, fileFormat) => {
  switch (fileFormat){
    case '':
      return JSON.parse(fileData);
    case 'json':
      return JSON.parse(fileData);
    case 'yaml':
      return yaml.load(fileData);
    case 'yml':
      return yaml.load(fileData);
    default:
      throw new Error('Error: wrong file format');
  }
};

export default parse;
