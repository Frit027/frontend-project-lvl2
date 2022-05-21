#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action(genDiff);

program.parse();
