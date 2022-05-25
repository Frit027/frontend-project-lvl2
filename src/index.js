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
        else arr.push(`${replacer.repeat(count + innerCount)}${key}: ${getStrObject(data[key], count + innerCount)}`);
      });
      return `{\n${arr.join('\n')}\n${replacer.repeat(innerCount - spacesCount + count)}}`;
    };

    const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();
    const arr = [];

    keys.forEach((key) => {
      const sameKey = `${replacer.repeat(count)}${key}`;
      const plusKey = `${getIndent(replacer.repeat(count), '+')}${key}`;
      const minusKey = `${getIndent(replacer.repeat(count), '-')}${key}`;

      if (key in data1 && !(key in data2)) {
        arr.push(`${minusKey}: ${getStrObject(data1[key])}`);
      } else if (!(key in data1) && key in data2) {
        arr.push(`${plusKey}: ${getStrObject(data2[key])}`);
      } else if (typeof data1[key] !== 'object' && typeof data2[key] !== 'object') {
        if (data1[key] !== data2[key]) {
          arr.push(`${minusKey}: ${data1[key]}`);
          arr.push(`${plusKey}: ${data2[key]}`);
        } else arr.push(`${sameKey}: ${data1[key]}`);
      } else if (typeof data1[key] === 'object' && typeof data2[key] !== 'object') {
        arr.push(`${minusKey}: ${getStrObject(data1[key])}`);
        arr.push(`${plusKey}: ${data2[key]}`);
      } else if (typeof data1[key] !== 'object' && typeof data2[key] === 'object') {
        arr.push(`${minusKey}: ${data1[key]}`);
        arr.push(`${plusKey}: ${getStrObject(data2[key])}`);
      } else {
        arr.push(`${sameKey}: ${getDiff(data1[key], data2[key], spacesCount + count)}`);
      }
    });

    return `{\n${arr.join('\n')}\n${replacer.repeat(count - spacesCount)}}`;
  };

  console.log(getDiff(parser(file1), parser(file2)));
};
