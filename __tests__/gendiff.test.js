import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/comparison.js';
import parse from '../src/parser.js';
import getStylish from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
test('gendiff', () => {
  const jsongContent1 = parse(getFixturePath('file1.json'));
  const jsongContent2 = parse(getFixturePath('file2.json'));
  const ymlContent1 = parse(getFixturePath('file1.yml'));
  const ymlContent2 = parse(getFixturePath('file2.yml'));

  const jsogDiff = genDiff(jsongContent1, jsongContent2);
  const ymlDiff = genDiff(ymlContent1, ymlContent2);
  const plainDiff = genDiff(jsongContent1, jsongContent2);

  expect(getStylish(jsogDiff)).toEqual(readFixture('expected_file.txt'));
  expect(getStylish(ymlDiff)).toEqual(readFixture('expected_file.txt'));
  expect(getStylish(plainDiff)).toEqual(readFixture('expected_file_plain.txt'));
});
