import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export default (file1, file2) => {
  const data1 = fs.readFileSync(path.resolve(file1), 'utf8');
  const data2 = fs.readFileSync(path.resolve(file2), 'utf8');

  const json1 = JSON.parse(data1);
  const json2 = JSON.parse(data2);
  const keys = _.uniq([...Object.keys(json1), ...Object.keys(json2)]).sort();
  let diff = '{';

  keys.forEach((key) => {
    if (key in json1 && !(key in json2)) {
      diff += `\n  - ${key}: ${json1[key]}`;
    } else if (!(key in json1) && key in json2) {
      diff += `\n  + ${key}: ${json2[key]}`;
    } else if (json1[key] !== json2[key]) {
      diff += `\n  - ${key}: ${json1[key]}`;
      diff += `\n  + ${key}: ${json2[key]}`;
    } else {
      diff += `\n    ${key}: ${json1[key]}`;
    }
  });

  console.log(`${diff}\n}`);
};
