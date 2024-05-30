import getStylish from "./stylish";
import makePlain from "./plain";
import makeComparison from "../comparison";

const index = (format = 'stylish', data1, data2) => {
  const currentData = makeComparison(data1, data2);
  if (format === 'stylish'){
		return getStylish(currentData);
  }
 	 if (format === 'plain'){
	return makePlain(currentData);
  }
};
export default index;