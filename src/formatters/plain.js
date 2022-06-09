import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const arrToStr = (arr) => arr.flat().filter((s) => s).join('\n');

const getDiff = (diff, arrKeys = []) => {
  const arr = diff.map((node) => {
    const {
      key, action, value, oldValue, newValue,
    } = node;

    arrKeys.push(key);
    const keys = arrKeys.concat();
    arrKeys.pop();

    switch (action) {
      case 'added':
        return `Property '${keys.join('.')}' was added with value: ${getValue(value)}`;
      case 'deleted':
        return `Property '${keys.join('.')}' was removed`;
      case 'changed':
        return `Property '${keys.join('.')}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
      case 'unchanged':
        return '';
      case 'children': {
        return getDiff(value, keys);
      }
      default:
        throw new TypeError('Неопознанное действие.');
    }
  });
  return arrToStr(arr);
};

export default getDiff;
