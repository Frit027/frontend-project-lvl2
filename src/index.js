import _ from 'lodash';
import parser from './parser.js';
import { getLine, getTree } from './formatters/stylish.js';

export default (file1, file2) => {
  const getDiff = (data1, data2, count = 4) => {
    const spacesCount = 4;

    const getStr = (data, innerCount = 4) => {
      if (typeof data !== 'object' || !data) return data;

      const arr = Object.keys(data).map((key) => {
        if (typeof data[key] !== 'object' || !data[key]) return getLine(key, data[key], count + innerCount);
        return getLine(key, getStr(data[key], count + innerCount), count + innerCount);
      });
      return getTree(arr, innerCount - spacesCount + count);
    };

    const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();
    const arr = keys.map((key) => {
      if (key in data1 && !(key in data2)) return getLine(key, getStr(data1[key]), count, '-');
      if (!(key in data1) && key in data2) return getLine(key, getStr(data2[key]), count, '+');
      if (typeof data1[key] !== 'object' && typeof data2[key] !== 'object' && data1[key] === data2[key]) {
        return getLine(key, data1[key], count);
      }
      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        return getLine(key, getDiff(data1[key], data2[key], spacesCount + count), count);
      }
      return `${getLine(key, getStr(data1[key]), count, '-')}\n${getLine(key, getStr(data2[key]), count, '+')}`;
    });

    return getTree(arr, count - spacesCount);
  };

  // console.log(getDiff(parser(file1), parser(file2)));
  return getDiff(parser(file1), parser(file2));
};
