import _ from 'lodash';
import parser from './parser.js';

const getIndent = (str, sign) => str.replace(/.(?=.$)/, sign);

export default (file1, file2) => {
  const spacesCount = 4;
  const replacer = ' ';

  const getDiff = (data1, data2, count = 4) => {
    const getStrObject = (data, innerCount = 4) => {
      if (typeof data !== 'object' || !data) return data;
      const arr = [];

      Object.keys(data).forEach((key) => {
        if (typeof data[key] !== 'object' || !data[key]) arr.push(`${replacer.repeat(count + innerCount)}${key}: ${data[key]}`);
        else {
          arr.push(`${replacer.repeat(count + innerCount)}${key}: ${getStrObject(data[key], count + innerCount)}`);
        }
      });
      return `{\n${arr.join('\n')}\n${replacer.repeat(innerCount - spacesCount + count)}}`;
    };

    const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();
    const arr = [];

    keys.forEach((key) => {
      if (key in data1 && !(key in data2)) {
        arr.push(`${getIndent(replacer.repeat(count), '-')}${key}: ${getStrObject(data1[key])}`);
      } else if (!(key in data1) && key in data2) {
        arr.push(`${getIndent(replacer.repeat(count), '+')}${key}: ${getStrObject(data2[key])}`);
      } else if (typeof data1[key] !== 'object' && typeof data2[key] !== 'object') {
        if (data1[key] === data2[key]) arr.push(`${replacer.repeat(count)}${key}: ${data1[key]}`);
        else {
          arr.push(`${getIndent(replacer.repeat(count), '-')}${key}: ${data1[key]}`);
          arr.push(`${getIndent(replacer.repeat(count), '+')}${key}: ${data2[key]}`);
        }
      } else if (typeof data1[key] === 'object' && typeof data2[key] !== 'object') {
        arr.push(`${getIndent(replacer.repeat(count), '-')}${key}: ${getStrObject(data1[key])}`);
        arr.push(`${getIndent(replacer.repeat(count), '+')}${key}: ${data2[key]}`);
      } else if (typeof data1[key] !== 'object' && typeof data2[key] === 'object') {
        arr.push(`${getIndent(replacer.repeat(count), '-')}${key}: ${data1[key]}`);
        arr.push(`${getIndent(replacer.repeat(count), '+')}${key}: ${getStrObject(data2[key])}`);
      } else {
        arr.push(`${replacer.repeat(count)}${key}: ${getDiff(data1[key], data2[key], spacesCount + count)}`);
      }
    });

    return `{\n${arr.join('\n')}\n${replacer.repeat(count - spacesCount)}}`;
  };

  console.log(getDiff(parser(file1), parser(file2)));
};
