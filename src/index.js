import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export default (file1, file2) => {
  const data1 = fs.readFileSync(path.resolve(file1), 'utf-8');
  const data2 = fs.readFileSync(path.resolve(file2), 'utf-8');

  const json1 = JSON.parse(data1);
  const json2 = JSON.parse(data2);
  const keys = _.uniq([...Object.keys(json1), ...Object.keys(json2)]).sort();
  const arr = [];

  keys.forEach((key) => {
    if (key in json1 && !(key in json2)) {
      arr.push(`  - ${key}: ${json1[key]}`);
    } else if (!(key in json1) && key in json2) {
      arr.push(`  + ${key}: ${json2[key]}`);
    } else if (json1[key] !== json2[key]) {
      arr.push(`  - ${key}: ${json1[key]}`);
      arr.push(`  + ${key}: ${json2[key]}`);
    } else {
      arr.push(`    ${key}: ${json1[key]}`);
    }
  });

  // console.log(arr.length ? `{\n${arr.join('\n')}\n}` : '{}');
  if (arr.length) return `{\n${arr.join('\n')}\n}`;
  return '{}';
};
