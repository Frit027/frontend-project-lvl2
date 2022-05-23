import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const files = {
  'result1.txt': ['file1.json', 'file2.json'],
  'result2.txt': ['file3.json', 'file4.json'],
  'result3.txt': ['file5.json', 'file6.json'],
};

test('JSON comparison', () => {
  Object.keys(files).forEach((resultTXT) => {
    const result = readFile(resultTXT).replace(/\r\n/g, '\n');
    const diff = genDiff(getFixturePath(files[resultTXT][0]), getFixturePath(files[resultTXT][1]));

    expect(diff).toBe(result);
  });
});
