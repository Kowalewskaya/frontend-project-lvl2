import yaml from 'js-yaml';
// import fs from 'fs';
// import path from 'path';

const parse = (data, format) => {
  // let fileContent;
  // if (path.extname(filePath) === '.json') {
  //   fileContent = JSON.parse(fs.readFileSync(filePath));
  // }
  // if (path.extname(filePath) === '.yml' || path.extname(filePath) === '.ymal') {
  //   fileContent = yaml.load(fs.readFileSync(filePath));
  // }
  // return fileContent;
    if (format === '.json'){
      return JSON.parse(data);
    }
    if (format === '.yml' || format === '.ymal') {
      return yaml.load(data);
    }
};

export default parse;
