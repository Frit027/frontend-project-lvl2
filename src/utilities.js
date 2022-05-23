import path from 'path';
import fs from 'fs';

/* eslint-disable import/prefer-default-export */
export const readFile = (filename) => fs.readFileSync(path.resolve(filename), 'utf-8');
