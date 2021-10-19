import { info, nextLevel, savage } from './aespa';

const findData = (query) => {
  const data = {
    aespa: { info, musics: [nextLevel, savage]},
  };
  return data[query];
};

export default findData;
