import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/comparison.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
test('gendiff', () => {
  expect(genDiff(parse(getFixturePath('file1.json')), parse(getFixturePath('file2.json')))).toEqual(readFixture('expected_file_json.txt'));
  expect(genDiff(parse(getFixturePath('file1.yml')), parse(getFixturePath('file2.yml')))).toEqual(readFixture('expected_file_yml.txt'));
});
