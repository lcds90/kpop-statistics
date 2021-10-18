import axios from 'axios';

/*
SECTION IDs do canal
    LINK https://commentpicker.com/youtube-channel-id.php
    NOTE randomk: UCzSIRGuUOwj6lTucIIh7h5Q
    NOTE statsk: UC571Os97Ct2Or3yLiP1WZgQ
!SECTION
*/

const channelId = 'UCzSIRGuUOwj6lTucIIh7h5Q';
const key = process.env.YOUTUBE_API;
const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: { part: 'snippet', key },
});

export const fetchPlaylists = async () => {
  try {
    const params = {
      channelId,
      maxResults: 50,
    };

    const res = await youtube.get('/playlists', { params });
    const playlists = res.data.items.filter((playlist) => !playlist.snippet.title
      .toLowerCase().includes('distribution'));
    return playlists;
  } catch (error) {
    return { error };
  }
};

export const fetchMusics = async (playlistId) => {
  try {
    const params = {
      playlistId,
      maxResults: 50,
    };

    const res = await youtube.get('/playlistItems', { params });
    const { items } = res.data;
    return items;
  } catch (error) {
    return { error };
  }
};
