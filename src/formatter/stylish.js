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
  const arrayElem = Object.entries(value).map(([key, val]) => `${setIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...arrayElem, `${setIndent(depth - 1)}  }`].join('\n');
};

const formatTree = (elem, depth) => {
  const keyValue = `${elem.name}: ${stringify(elem.value, depth + 1)}`;
  const getTreeElem = (tree) => tree.map((element) => formatTree(element, depth + 1)).join('\n');

  switch (elem.state) {
    case 'added':
      return `${setIndent(depth)}+ ${keyValue}`;
    case 'deleted':
      return `${setIndent(depth)}- ${keyValue}`;
    case 'unchanged':
      return `${setIndent(depth)}  ${keyValue}`;
    case 'changed':
      return `${`${setIndent(depth)}- ${elem.name}: ${stringify(elem.previousValue, depth + 1)}`}\n${
        `${setIndent(depth)}+ ${elem.name}: ${stringify(elem.currentValue, depth + 1)}`}`;
    case 'nested':
      return `${`${setIndent(depth)}${symbols[elem.state]} ${elem.name}`}: {\n${getTreeElem(elem.children)}\n  ${setIndent(depth)}}`;
    default:
      throw new Error('Unknown state!');
  }
};

const stylish = (tree) => `{\n${tree.map((elem) => formatTree(elem, 1)).join('\n')}\n}`;
export default stylish;
