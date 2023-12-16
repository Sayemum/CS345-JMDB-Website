// PopularJSON

class PopularJSON {
    constructor() {
        this.apiKey = TMDB_API_KEY;
    }

    getPopularJSON() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`, options)
            .then(response => response.json())
            // .then(response => console.log(response))
            .then(response => displayPopular(response))
            .catch(err => console.error(err));
    }

}

  /**
 * Display posters of popular movies & their titles.
 * @param data The popular movie list to display.
 */
function displayPopular(data) {
    let x = 50;
    let movWidth = 0;

    for (let i = 0; i < 8 && i < data.results.length; i++) {
        let posterpath = data.results[i].poster_path;
        if (posterpath != null) {
            let url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
            let fullposturl = url + posterpath;
            let moviepic = createElement('img');
            moviepic.attribute('src', fullposturl);
            moviepic.position(x, 150);
            moviepic.size(150, 225);
            moviepic.style("border", "solid 1px gray")
            // moviepic.mousePressed(console.log("pressed"));
            movWidth = moviepic.width;
        } else {
            textSize(20);
            fill('black');
            text("No poster available.", 50, 340);
        }
        // printPopularTitle(data.results[i], x, 130, movWidth);
        // Luke's Popular movie buttons, uncomment and replace for old style
        popularSearchButton(data.results[i], x, 125);
        x += movWidth + 6;
    }

}
function printPopularTitle(movie, x, y, movieWidth) {
    let title = movie.title;
    fill(255);
    textSize(15);
    textFont('Artegra Slab');
    text(title, x, y, movieWidth, 100);
}

function popularSearchButton(movie, x, y) {
    // Create one button, location and text same as title
    // Called in loop for each popular movie
    let title = movie.title;
    if (title.length > 20) {
        title = title.substring(0, 20) + "";
    }
    let popularButton = createButton(title);
    popularButton.position(x, y);
    popularButton.size(150);
    popularButton.class('popularButton');
    popularButton.mousePressed(function () {
        removeElements();
        clear();
        setup();
        fittedCanvas(1700, 900);
        background(charcoal_gray);
        displayID(movie.id);
    });

}

