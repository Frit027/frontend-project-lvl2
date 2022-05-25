const REPLACER = ' ';

const getIndent = (str, sign) => str.replace(/.(?=.$)/, sign);

export const getLine = (key, value, count, sign = ' ') => `${getIndent(REPLACER.repeat(count), sign)}${key}: ${value}`;
export const getTree = (arr, count) => `{\n${arr.join('\n')}\n${REPLACER.repeat(count)}}`;
