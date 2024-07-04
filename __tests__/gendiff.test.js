import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
test('gendiff', () => {
  const jsonContent1 = getFixturePath('file1.json');
  const jsonContent2 = getFixturePath('file2.json');
  const ymlContent1 = getFixturePath('file1.yml');
  const ymlContent2 = getFixturePath('file2.yml');
  expect(genDiff(jsonContent1, jsonContent2, 'stylish')).toEqual(readFixture('expected_file.txt'));
  expect(genDiff(ymlContent1, ymlContent2, 'stylish')).toEqual(readFixture('expected_file.txt'));
  expect(genDiff(jsonContent1, jsonContent2, 'plain')).toEqual(readFixture('expected_file_plain.txt'));
  expect(genDiff(ymlContent1, ymlContent2, 'plain')).toEqual(readFixture('expected_file_plain.txt'));
  expect(genDiff(jsonContent1, jsonContent2, 'json')).toEqual(readFixture('expected_file_json.txt'));
  expect(genDiff(ymlContent1, ymlContent2, 'json')).toEqual(readFixture('expected_file_json.txt'));
});
