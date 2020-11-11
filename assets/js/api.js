/*
This is the main API function for the primary album data. 
The user can search for an Album name and it will either return the data as an array of objects or will display an error 

The returned array will look like this: 
[0: {
  album: "Album Name"
  albumArt: URL or null if not found
  AlbumDesc: String or undefined if not found
  Artist: "Artist Name"
  runtime: "0:00:00" as a String
  tracklist: ["Name", "Of", "Tracks"]
}
1: {
  album: "Second Album Name"
  albumArt: URL or null if not found
  AlbumDesc: String or undefined if not found
  Artist: "Second Artist Name"
  runtime: "0:00:00" as a String
  tracklist: ["Name", "Of", "Tracks", "On", "Second", "Album"]
}
]
*/
let searchForm = document.getElementById("searchForm")
let button = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");











searchForm.addEventListener("submit", function(event) {event.preventDefault()})

// Main worker function for API calls
function theAudioDBAPIQuery() {
  let userSearch = searchInput.value
  console.log("user search   " + userSearch)
  //API URL for searching for the album
  var apiURL = `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?a=` + userSearch;
  //Create the empty array to return at the end of the process
  var returnObject = [];
  //Function to fetch the album and then call fetching the Album track information
  fetchAlbum = (apiURL) => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => fetchTrackInfo(responseJson));
  };
  //Helper function to grab the track info and return it to the return object
  function fetchTrackInfo(response) {
    response.album.forEach((album) => {
      //calls fetch on all album names returned from primary function
      fetch(
        "https://www.theaudiodb.com/api/v1/json/1/track.php?m=" + album.idAlbum
      )
        .then((response) => response.json())
        .then((data) =>
          //This is the return object format
          returnObject.push([
            {
              artist: album.strArtist,
              album: album.strAlbum,
              albumDesc: album.strDescriptionEN,
              albumArt: album.strAlbumCDart,
              runtime: runtimeCounter(data),
              tracklist: trackListGetter(data),
            },
          ])
        );
    });
  }
  fetchAlbum(apiURL);
  return returnObject;
}

//Used to grab all tracks in an album and then add together their runtime and return it as an integer
runtimeCounter = (album) => {
  var totalRuntime = 0;
  album.track.forEach((track) => {
    totalRuntime += parseInt(track.intDuration);
  });

  return msToHMS(totalRuntime);
};

//grabs all tracks on an album and creates an array with their titles
trackListGetter = (album) => {
  var trackList = [];
  album.track.forEach((track) => {
    trackList.push(track.strTrack);
  });
  return trackList;
};

//Function I borrowed from stackoverflow to deal with converting milliseconds the API returns for track runtime to a more readable format
function msToHMS(ms) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;
  // 2- Extract hours:
  var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return hours + ":" + minutes + ":" + parseInt(seconds);
}

//TODO: Remove once we have a button
console.log(theAudioDBAPIQuery());

button.addEventListener("click", function(){


  theAudioDBAPIQuery();

})
