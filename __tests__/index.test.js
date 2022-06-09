import path from 'path';
import { fileURLToPath } from 'url';
import readFile from '../src/utilities.js';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylishData = {
  'result1.txt': [['file1.json', 'file2.json'], ['file1.yml', 'file2.yaml']],
  'result2.txt': [['file3.json', 'file4.json']],
  'result3.txt': [['file5.json', 'file6.json']],
};

const plainData = {
  'result4.txt': [['file1.json', 'file2.json'], ['file1.yml', 'file2.yaml']],
};

const compare = (data, format = 'stylish') => {
  Object.keys(data).forEach((txtFile) => {
    const result = readFile(getFixturePath(txtFile)).replace(/\r\n/g, '\n');
    data[txtFile].forEach((files) => {
      const diff = genDiff(
        getFixturePath(files[0]),
        getFixturePath(files[1]),
        format,
      );
      expect(diff).toBe(result);
    });
  });
};

// eslint-disable-next-line
test('Stylish', () => {
  compare(stylishData);
});

// eslint-disable-next-line
test('Plain', () => {
  compare(plainData, 'plain');
});
