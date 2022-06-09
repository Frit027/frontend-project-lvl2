import yaml from 'js-yaml';
import path from 'path';
import readFile from './utilities.js';

const getParser = (filename) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.load,
  };
  const extname = path.extname(filename).toLowerCase();

  if (extname === '.json') return parsers.json;
  if (['.yml', '.yaml'].includes(extname)) return parsers.yml;

  throw new TypeError(`Расширение ${extname} не поддерживается.`);
};

export default (filename) => {
  const parser = getParser(filename);
  const data = readFile(filename);
  return parser(data);
};
