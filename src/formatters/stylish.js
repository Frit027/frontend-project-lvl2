const REPLACER = ' ';

const getIndent = (str, sign) => str.replace(/.(?=.$)/, sign);

export default () => {
  const getLine = (key, value, count, sign = ' ') => `${getIndent(REPLACER.repeat(count), sign)}${key}: ${value}`;
  const getTree = (arr, count) => `{\n${arr.join('\n')}\n${REPLACER.repeat(count)}}`;
  return {
    line: getLine,
    tree: getTree,
  };
};
