#!/usr/bin/env node
import { program } from 'commander';

program
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.');

program.parse();
