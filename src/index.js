import parse from './parser.js';
import visualize from './formatters/index.js';
import getDiff from './diffBuilder.js';

export default (file1, file2, format = 'stylish') => {
  const data1 = parse(file1);
  const data2 = parse(file2);
  const diff = getDiff(data1, data2);

  return visualize(diff, format);
};
