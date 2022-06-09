import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const getFormatter = (format) => {
  const formats = { stylish, plain, json };

  if (format === 'stylish') return formats.stylish;
  if (format === 'plain') return formats.plain;
  if (format === 'json') return formats.json;
  throw new TypeError(`Формата ${format} не существует.`);
};

export default (diff, format) => {
  const formatter = getFormatter(format);
  return formatter(diff);
};
