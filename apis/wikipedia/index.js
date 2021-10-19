import axios from 'axios';

/*
SECTION WIKIPEDIA api
    LINK http://en.wikipedia.org/w/api.php?action=query&format=json&
    LINK https://www.mediawiki.org/wiki/API:Get_the_contents_of_a_page
!SECTION
*/

const wikitext = axios.create({
    baseURL: 'https://en.wikipedia.org/w',
    params: {
        action: 'query',
        origin: '*',
        format: 'json',
        prop: 'extracts',
        rvslots: '*',
        rvprop: 'content',
        formatversion: '2'
    },
});

export const fetchInfo = async (query) => {
    try {
        const params = {
            titles: query
        };

        const res = await wikitext.get('/api.php', {
            params
        });
        console.log(res);
        const data = res.data.query.pages[0].extract;
        return data;
    } catch (error) {
        return {
            error
        };
    }
};

export const fetchMusics = async (playlistId) => {
    try {
        const params = {
            playlistId,
            maxResults: 50,
        };

        const res = await youtube.get('/playlistItems', {
            params
        });
        const {
            items
        } = res.data;
        return items;
    } catch (error) {
        return {
            error
        };
    }
};