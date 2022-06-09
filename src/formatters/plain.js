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

    let keys;
    if (action !== 'children') {
      keys = arrKeys.join('.');
      arrKeys.pop();
    }

    switch (action) {
      case 'added':
        return `Property '${keys}' was added with value: ${getValue(value)}`;
      case 'deleted':
        return `Property '${keys}' was removed`;
      case 'changed':
        return `Property '${keys}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
      case 'unchanged':
        return '';
      case 'children': {
        const innerArr = getDiff(value, arrKeys);
        arrKeys.pop();
        return innerArr;
      }
      default:
        throw new TypeError('Неопознанное действие.');
    }
  });
  return arrToStr(arr);
};

export default getDiff;
