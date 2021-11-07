import axios from 'axios';

/*
SECTION WIKIPEDIA api
    LINK http://en.wikipedia.org/w/api.php?action=query&format=json&
    LINK https://www.mediawiki.org/wiki/API:Get_the_contents_of_a_page
!SECTION
*/
export const fetchInfo = async (query, locale) => {
  try {
    const baseURL = `https://${locale}.wikipedia.org/w`;

    const params = {
      titles: query,
      action: 'query',
      origin: '*',
      format: 'json',
      prop: 'extracts',
      rvslots: '*',
      rvprop: 'content',
      formatversion: '2',
    };

    const res = await axios.get(`${baseURL}/api.php`, {
      params,
    });

    const localeSplit = {
      en: '<h2><span id="Discography">',
      ko: '<h2><span id=".EA.B5.AC.EC.84.B1.EC.9B.90">',
      pt: '<h2><span id="Discografia">',
    };

    const data = res.data.query.pages[0].extract;
    return data.split(localeSplit[locale])[0];
  } catch (error) {
    return {
      error,
    };
  }
};

export const test = () => {};
