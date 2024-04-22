import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parse = (filePath) => {
  let fileContent;
  if (path.extname(filePath) === '.json') {
    fileContent = JSON.parse(fs.readFileSync(filePath));
  }
  if (path.extname(filePath) === '.yml' || path.extname(filePath) === '.ymal') {
    fileContent = yaml.load(fs.readFileSync(filePath));
  }
  return fileContent;
};

export default parse;
