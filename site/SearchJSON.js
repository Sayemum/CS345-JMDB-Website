//Title: SearchJSON
//Description: Used to fetch search results based on a string input representing a movie name

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + TMDB_API_KEY
  }
};

class SearchJSON {
  constructor() {
    this.apiKey = TMDB_API_KEY;
  }

  /*url_for(input) {
    return `https://api.themoviedb.org/3/search/movie?query=${input}?apikey=${this.api_key}`;
  }*/

  fetch_json_by_movie_name(input) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${input}`, options)
        .then(response => response.json())
        // .then(response => console.log(response))
        .then(response => createButtons(response))
        .catch(err => console.error(err));
  }

}

// let searchJSON = new SearchJSON();
// let url = fetchJSON.url_for("Star");
// searchJSON.fetch_json_by_movie_name("The godfather");