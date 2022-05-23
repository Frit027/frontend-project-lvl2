import _ from 'lodash';
import parser from './parser.js';

export default (file1, file2) => {
  const data1 = parser(file1);
  const data2 = parser(file2);
  const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();
  const arr = [];

  keys.forEach((key) => {
    if (key in data1 && !(key in data2)) {
      arr.push(`  - ${key}: ${data1[key]}`);
    } else if (!(key in data1) && key in data2) {
      arr.push(`  + ${key}: ${data2[key]}`);
    } else if (data1[key] !== data2[key]) {
      arr.push(`  - ${key}: ${data1[key]}`);
      arr.push(`  + ${key}: ${data2[key]}`);
    } else {
      arr.push(`    ${key}: ${data1[key]}`);
    }
  });

  // console.log(arr.length ? `{\n${arr.join('\n')}\n}` : '{}');
  if (arr.length) return `{\n${arr.join('\n')}\n}`;
  return '{}';
};
