import _ from 'lodash';

const symbols = {
  unchanged: ' ',
  added: '+',
  deleted: '-',
  nested: ' ',
};

const indent = 4;
const setIndent = (depth, spaces = 2) => ' '.repeat(depth * indent - spaces);

const stringify = (value, depth) => {
  if (!_.isObject(value)) return value;
  return `{\n${Object.entries(value).map(([key, val]) => `${setIndent(depth)}  ${key}: ${stringify(
    val,
    depth + 1,
  )
  }`).join('\n')}\n${setIndent(depth - 1)}  }`;
};

const formatTree = (elem, depth) => {

  const dataUnchanged = `${setIndent(depth)}${symbols[elem.state]} ${elem.name}: ${stringify(elem.value, depth + 1)}`;
  const dataDeleted = `${setIndent(depth)}${symbols.deleted} ${elem.name}: ${stringify(
    elem.previousValue,
    depth + 1,
  )}`;
  const dataAdded = `${setIndent(depth)}${symbols.added} ${elem.name}: ${stringify(elem.currentValue, depth + 1)}`;
  const dataNested = `${setIndent(depth)}${symbols[elem.state]} ${elem.name}`;
  
  switch (elem.state) {
    case 'added':
    case 'deleted':
    case 'unchanged':
      return dataUnchanged;
    case 'changed':
      return `${dataDeleted}\n${dataAdded}`;
    case 'nested':
      return  `${dataNested}: {\n${elem.children
        .map((element) => formatTree(element, depth + 1)).join('\n')}\n  ${setIndent(depth)}}`;
    default:
      throw new Error('Unknown state!');
  }
};

const stylish = (tree) => `{\n${tree.map((elem) => formatTree(elem, 1)).join('\n')}\n}`;
export default stylish;
