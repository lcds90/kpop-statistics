export const orderPlaylistBy = {
    ascDate: (playlists) =>
      playlists.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt).valueOf() -
          new Date(a.snippet.publishedAt).valueOf()
      ),
    descDate: (playlists) =>
      playlists.sort(
        (a, b) =>
          new Date(a.snippet.publishedAt).valueOf() -
          new Date(b.snippet.publishedAt).valueOf()
      ),
    asc: (playlists) =>
      playlists.sort((a, b) =>
        a.snippet.title.localeCompare(b.snippet.title)
      ),
    desc: (playlists) =>
      playlists.sort((a, b) =>
        b.snippet.title.localeCompare(a.snippet.title)
      ),
  };