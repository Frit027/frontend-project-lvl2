import stylish from './stylish.js';

export default (format, diff) => {
  switch (format) {
    default:
      return stylish(diff);
  }
};
