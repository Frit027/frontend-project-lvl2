import yaml from 'js-yaml';
import path from 'path';
import readFile from './utilities.js';

export default (filename) => {
  const data = readFile(filename);

  if (path.extname(filename).toLowerCase() === '.json') {
    return JSON.parse(data.toString());
  } if (['.yml', '.yaml'].includes(path.extname(filename).toLowerCase())) {
    return yaml.load(data);
  }
  return null;
};
