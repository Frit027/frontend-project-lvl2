import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { readFile } from '../src/utilities.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const data = {
  'result1.txt': [['file1.json', 'file2.json'], ['file1.yml', 'file2.yaml']],
  'result2.txt': [['file3.json', 'file4.json']],
  'result3.txt': [['file5.json', 'file6.json']],
};

test('File comparison', () => {
  Object.keys(data).forEach((txtFile) => {
    const result = readFile(getFixturePath(txtFile)).replace(/\r\n/g, '\n');
    data[txtFile].forEach((files) => {
      const diff = genDiff(
        getFixturePath(files[0]),
        getFixturePath(files[1]),
      );
      expect(diff).toBe(result);
    });
  });
});
