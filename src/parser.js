import fs from 'fs';

const parse = (filePath) => {
  const fileContent = JSON.parse(fs.readFileSync(filePath));
  return fileContent;
};

export default parse;
