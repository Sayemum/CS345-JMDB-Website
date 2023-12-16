/* 
    <script src="SearchBar.js"></script>
*/

/**
 * Draws a input box to the screen at the coordinates (x, y) with size "size", and a button to the right of it.
 * @param x X coordinate for the search bar.
 * @param y Y coordinate for the search bar.
 * @param size Pixel size of the search bar, not including get results button.
 */
function createSearchBar(x, y, size) {
    // User input search bar
    inp = createInput("").attribute('placeholder', 'Search...');
    inp.position(x, y);
    inp.size(size);
    
    let id_b = createButton("Get Results");
    id_b.position(x + 142, y + 1.5);
    id_b.class('defaultButton');
    id_b.mousePressed(function () {
        let searchJSON = new SearchJSON();
        searchJSON.fetch_json_by_movie_name(inp.value());
    });  
}

function createHomeSearchBar(x, y, size) {
    // User input search bar
    inp = createInput("");
    inp.position(x, y);
    inp.size(size);
    
    let id_b = createButton("Get Results");
    id_b.position(x + 142, y + 1.5);
    id_b.class('defaultButton');
    id_b.mousePressed(function () {
        window.location.href = "MoviePage.html";
        let searchJSON = new SearchJSON();
        searchJSON.fetch_json_by_movie_name(inp.value());
    });  

}

/**
 * Creates buttons for each movie described by the json in data.
 * @param data The search results to create buttons for.
 */
function createButtons(data) {
    removeElements();
    clear();
    setup();
    fittedCanvas(1700, 900);
    background(charcoal_gray);
    let buttons = selectAll('button');
    for (let i = 1; i < buttons.length; i++) {
        buttons[i].remove();
    }
    let x = 250;
    for (let i = 0; i < 4 && i < data.results.length; i++) {
        let title = data.results[i].title;
        let movieButton = createButton(title);
        if (title.length > 40) {
            movieButton.style("font-size", "9px");
        }
        movieButton.class('movieTitle');
        // movieButton.mouseOver(hover(data.results[i].overview));
        movieButton.position(x, 30);
        movieButton.size(280, 20);
        movieButton.mousePressed(function () {
            removeElements();
            clear();
            setup();
            background(100, 120, 220);
            createButtons(data);
            displayID(data.results[i].id);
        });
        printShortenedOverview(data.results[i], x, 55, movieButton.width);
        x += movieButton.width + 5;
        
    }
}

/**
 * Takes the ID of a movie's search result and GETS the movie's extended data. displayMovie is
 * then called with this extended data.
 * @param movieID The ID of the movie to display.
 */
function displayID(movieID) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + TMDB_API_KEY
        }
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${TMDB_API_KEY}`, options)
        .then(response => response.json())
        .then(response => movieDisplay(response));
}

function printShortenedOverview(movie, x, y, movieButtonWidth) {
    let overview = movie.overview;
    fill(255);
    textSize(15);
    textFont('Artegra Slab');
    text(overview, x, y, movieButtonWidth, 100);
}