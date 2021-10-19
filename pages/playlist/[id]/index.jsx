import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { fetchMusics } from 'apis/youtube';

const Playlist = ({ playlistId }) => {
  const router = useRouter();
  const [playlistInfo, setPlaylistInfo] = useState({});
  const { id } = router.query;

  useEffect(() => {
    if (!playlistId) router.push('/');
    console.log(playlistId);
    const fetch = () => {
      fetchMusics(playlistId).then((data) => {
        axios
          .get('/api/playlist', { params: { id } })
          .then(({ data: { informations } }) => {
            console.log('informations', informations);
            if (!informations) return setPlaylistInfo(data);
            // NOTE looking for id in object to match from api to retrieve statistcs or return empty object
            const dataHandling = data.map((playObj) => {
              const statistics = informations
                .find((info) => info.id === playObj.snippet.resourceId.videoId) || {};
              return { ...playObj, statistics };
            });

            setPlaylistInfo(dataHandling);
          });
      });
    };
    fetch();
  }, [id]);

  const { id: playlistIds } = playlistInfo;
  return (
    <div>
      {JSON.stringify(playlistInfo)}
      {id}
    </div>
  );
};

export async function getServerSideProps(context) {
  // LINK https://stackoverflow.com/a/67096806
  return {
    props: {
      playlistId: context.query.playlistId || null,
    },
  };
}

export default Playlist;
