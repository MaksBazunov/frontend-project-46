import yaml from 'js-yaml';

const parse = (fileData, fileFormat) => {
  if (fileFormat === 'json') return JSON.parse(fileData);
  if (fileFormat === 'yaml' || fileFormat === 'yml') return yaml.load(fileData);
  throw new Error('Error: wrong file format');
};

export default parse;
