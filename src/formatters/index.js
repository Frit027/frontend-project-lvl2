import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

export default (format, diff) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      return stylish(diff);
  }
};
