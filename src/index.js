import _ from 'lodash';
import parser from './parser.js';
import formatter from './formatters/index.js';

export default (file1, file2, format = 'stylish') => {
  const diffBuilder = (data1, data2) => {
    const keys = _.uniq([..._.keys(data1), ..._.keys(data2)]).sort();

    return keys.map((key) => {
      if (!_.has(data1, key)) return { key, action: 'added', value: data2[key] };
      if (!_.has(data2, key)) return { key, action: 'deleted', value: data1[key] };
      if (_.isObject(data1[key]) && _.isObject(data2[key])) return { key, action: 'children', value: diffBuilder(data1[key], data2[key]) };
      if (data1[key] !== data2[key]) {
        return {
          key, action: 'changed', oldValue: data1[key], newValue: data2[key],
        };
      }
      return { key, action: 'unchanged', value: data1[key] };
    });
  };

  return formatter(format, diffBuilder(parser(file1), parser(file2)));
};
