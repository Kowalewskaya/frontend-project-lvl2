#!/usr/bin/env node
import { Command } from 'commander';
import parse from '../src/parser.js';
import index from '../src/formatters/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filePath1, filePath2) => {
    const fileContent1 = parse(filePath1);
    const fileContent2 = parse(filePath2);
    console.log(index(program.opts().format, fileContent1, fileContent2));
  });

program.parse();