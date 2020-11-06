fetch("https://rapidapi.p.rapidapi.com/search?q=Kendrick%20Lamar", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "29110a8caamsh4daadd2eb331836p12cfa4jsn6cd6b897a36e",
		"x-rapidapi-host": "genius.p.rapidapi.com"
	}
})
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
});