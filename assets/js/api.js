function theAudioDBAPIQuery() {
  var search = prompt("what do you want to search for");
  var apiURL = `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?a=${search}`;
  var returnObject = [];

  fetchAlbum = (apiURL) => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => fetchTrackList(responseJson));
  };

  function fetchTrackList(response) {
    response.album.forEach((album) => {
      console.log(album);
      fetch(
        "https://www.theaudiodb.com/api/v1/json/1/track.php?m=" + album.idAlbum
      )
        .then((response) => response.json())
        .then(
          (data) =>
            (returnObject[`${album.strArtist} - ${album.strAlbum}`] = data)
        );
    });
  }
  fetchAlbum(apiURL);
  return returnObject;
}

console.log(theAudioDBAPIQuery());
