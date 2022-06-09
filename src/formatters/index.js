import stylish from './stylish.js';
import plain from './plain.js';

export default (format, diff) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    default:
      return stylish(diff);
  }
};
