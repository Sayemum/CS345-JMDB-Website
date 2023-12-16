// TopRatedJSON

class TopRatedJSON {
    constructor() {
      this.apiKey = TMDB_API_KEY;
    }
  
    getTopRatedJSON() {
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`, options)
          .then(response => response.json())
          // .then(response => console.log(response))
          .then(response => displayTopRated(response))
          .catch(err => console.error(err));
    }
  
  }

  /**
 * Creates buttons for each movie described by the json in data.
 * @param data The search results to create buttons for.
 */
function displayTopRated(data) {
    let x = 1050;
    let y = 150;
    let movWidth = 0;
    let ENTRIES_PER_LINE = 3;
    
    for (let i = 0; i < 6 && i < data.results.length; i++) {
        if (i > 0 && i % ENTRIES_PER_LINE == 0) {
            x = 1050;
            y += 300;
        }

        let posterpath = data.results[i].poster_path;
        if (posterpath != null) {
            let url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
            let fullposturl = url + posterpath;
            let moviepic = createElement('img');
            moviepic.attribute('src', fullposturl);
            moviepic.position(x, y);
            moviepic.size(150, 225);
            moviepic.style("border", "solid 2px white")
            // moviepic.mousePressed(console.log("pressed"));
            movWidth = moviepic.width;
        } else {
            textSize(20);
            fill('black');
            text("No poster available.", 50, 340);
        }
        printTopRatedTitle(data.results[i], x, y - 60, movWidth);
        x += movWidth + 25;
    }
    
}
function printTopRatedTitle(movie, x, y, movieWidth) {
    let title = movie.title;
    fill(255);
    textSize(15);
    textFont('Artegra Slab');
    text(title, x, y, movieWidth, 100);
}