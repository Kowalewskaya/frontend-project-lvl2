import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { test, expect } from '@jest/globals';
import makeComparison from '../src/comparison.js';
import parse from '../src/parser.js';
import getStylish from '../src/formatters/stylish.js';
import getPlain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
test('gendiff', () => {
  const jsongContent1 = parse(getFixturePath('file1.json'));
  const jsongContent2 = parse(getFixturePath('file2.json'));
  const ymlContent1 = parse(getFixturePath('file1.yml'));
  const ymlContent2 = parse(getFixturePath('file2.yml'));

  const jsonDiff = makeComparison(jsongContent1, jsongContent2);
  const ymlDiff = makeComparison(ymlContent1, ymlContent2);

  expect(getStylish(jsonDiff)).toEqual(readFixture('expected_file.txt'));
  expect(getStylish(ymlDiff)).toEqual(readFixture('expected_file.txt'));
  expect(getPlain(jsonDiff)).toEqual(readFixture('expected_file_plain.txt'));
  expect(getPlain(ymlDiff)).toEqual(readFixture('expected_file_plain.txt'));
  expect(JSON.stringify(jsonDiff)).toEqual(readFixture('expected_file_json.txt'));
  expect(JSON.stringify(ymlDiff)).toEqual(readFixture('expected_file_json.txt'));
});
