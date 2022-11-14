import _ from 'lodash';

const genKey = (parseFile1, parseFile2) => {
  const iter = (array1, array2, name) => {
    
    if (!_.has(array1, name)){
       return { name, state: 'added', value: array2[name] }};
    if (!_.has(array2, name)){
       return { name, state: 'deleted', value: array1[name] }};
    if (_.isObject(array1[name]) && _.isObject(array2[name])) {
      return { name, state: 'nested', children: genKey(array1[name], array2[name]) };
    }
    if (array1[name] !== array2[name]) {
      return {
        name, state: 'changed', previousValue: array1[name], currentValue: array2[name],
      };
    }
    return { name, state: 'unchanged', value: array1[name] };
  };
  const keys = _.sortBy(_.union(Object.keys(parseFile1), Object.keys(parseFile2)));
 
  return keys.map((key) => iter(parseFile1, parseFile2, key));
};

export default genKey;