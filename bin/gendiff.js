#!/usr/bin/env node
import { Command } from 'commander';
import index from '../src/formatters/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((data1, data2) => {
    console.log(index(data1, data2, program.opts().format));
  });

program.parse();
