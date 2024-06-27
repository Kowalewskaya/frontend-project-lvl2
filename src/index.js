import makeFormat from "./formatters/index.js";
import makeComparison from "./comparison";
import parse from "./parser";

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parseFile1 = parse(filepath1);
  const parseFile2 = parse(filepath2);
  const dataDiff = makeComparison(parseFile1, parseFile2);
  return makeFormat(dataDiff, format);
}

export default genDiff;