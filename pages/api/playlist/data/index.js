import { nextLevel, savage } from './aespa';

const findData = (query) => {
  const data = {
    aespa: [nextLevel, savage],
  };
  return data[query];
};

export default findData;
