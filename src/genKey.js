import _ from 'lodash';

const genKey = (parseFile1, parseFile2) => {
  const iter = (parserData1, parserData2, name) => {
    if (!_.has(parserData1, name)) {
      return { name, state: 'added', value: parserData2[name] };
    }
    if (!_.has(parserData2, name)) {
      return { name, state: 'deleted', value: parserData1[name] };
    }
    if (_.isObject(parserData1[name]) && _.isObject(parserData2[name])) {
      return { name, state: 'nested', children: genKey(parserData1[name], parserData2[name]) };
    }
    if (parserData1[name] !== parserData2[name]) {
      return {
        name, state: 'changed', previousValue: parserData1[name], currentValue: parserData2[name],
      };
    }
    return { name, state: 'unchanged', value: parserData1[name] };
  };
  const keys = _.sortBy(_.union(Object.keys(parseFile1), Object.keys(parseFile2)));

  return keys.map((key) => iter(parseFile1, parseFile2, key));
};

export default genKey;
