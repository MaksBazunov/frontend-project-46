import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const renderFormat = (diffKeys, format) => {
  switch (format) {
    case 'json':
      return json(diffKeys);
    case 'plain':
      return plain(diffKeys);
    case 'stylish':
      return stylish(diffKeys);
    default:
      throw new Error('Error: wrong diff format');
  }
};

export default renderFormat;
