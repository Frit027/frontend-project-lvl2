const REPLACER = ' ';

const getIndent = (str, sign) => str.replace(/.(?=.$)/, sign);
const getLine = (key, value, count, sign = ' ') => `${getIndent(REPLACER.repeat(count), sign)}${key}: ${value}`;
const getTree = (arr, count) => `{\n${arr.join('\n')}\n${REPLACER.repeat(count)}}`;

const getDiff = (diff, count = 4) => {
  const spacesCount = 4;

  const getStr = (data, innerCount = 4) => {
    if (typeof data !== 'object' || !data) return data;

    const arr = Object.keys(data).map((key) => {
      if (typeof data[key] !== 'object' || !data[key]) return getLine(key, data[key], count + innerCount);
      return getLine(key, getStr(data[key], count + innerCount), count + innerCount);
    });
    return getTree(arr, innerCount - spacesCount + count);
  };

  const arr = diff.map((node) => {
    const {
      key, action, value, oldValue, newValue,
    } = node;

    switch (action) {
      case 'added':
        return getLine(key, getStr(value), count, '+');
      case 'deleted':
        return getLine(key, getStr(value), count, '-');
      case 'changed':
        return `${getLine(key, getStr(oldValue), count, '-')}\n${getLine(key, getStr(newValue), count, '+')}`;
      case 'unchanged':
        return getLine(key, value, count);
      case 'children':
        return getLine(key, getDiff(value, spacesCount + count), count);
      default:
        throw new TypeError('Неопознанное действие.');
    }
  });
  return getTree(arr, count - spacesCount);
};

export default getDiff;
