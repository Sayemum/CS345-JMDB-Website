function setup() {
  fittedCanvas(1600, 750);
  noLoop();

  // displayATags();

  // JMDB Logo
  logo = createElement("img");
  logo.position(580, 150);
  logo.attribute("src", "../jmulogo_bgremoved.png");
  logo.size(400, 100);

  // TMDB Logo
  tmdbLogo = createElement("img");
  tmdbLogo.position(585, logo.y + 365);
  tmdbLogo.attribute("src", "../TMDB_Logo.svg");
  tmdbLogo.size(400, 100);

  //createHomeSearchBar(logo.x + 50, logo.y + 95, 125);
  // User input search bar
  // inp = createInput("");
  // inp.position(x, y);
  // inp.size(size);

  search = createButton("Search Movies");
  search.position(logo.x + 130, logo.y + 100);
  search.class('defaultButton');
  search.size(125);
  search.mousePressed(function () {
    window.location.href = "MoviePage.html";
  });

  // Uncomment and replace get data with function to take results and display
  // Use inp.value() to grab input
}

function topRatedMovies() {
  fill('white');
  stroke('black');
  strokeWeight(4);
  textSize(32);
  text("Top Rated:", 1300, 50)
  let topRatedJSON = new TopRatedJSON();
  topRatedJSON.getTopRatedJSON();
}

function UpcomingMovies() {
  fill('white');
  stroke('black');
  strokeWeight(4);
  textSize(32);
  text("Coming Soon:", 273, 50)
  let upcomingJSON = new UpcomingJSON();
  upcomingJSON.getUpcomingJSON();
}

function draw() {
  background(charcoal_gray);
  let top = color("#3B3B3B");
  let bottom = color("#716A6A");
  setGradient(0, 0, width, height, top, bottom, Y_AXIS);
  textFont('Artegra Slab'); // JMU Font
  textSize(20);
  fill('white');
  textWrap(WORD);
  textAlign(CENTER);
  biography = "JMDB is a movie database created by Josh Makela, Stella Lee, Sayemum Hassan, " 
   + "Molly Bauer, and Luke Hennessy. \n\nThe database uses the TMDB API to display movie information. \n\n"
  text(biography, 620, logo.y + 165, 320);

  // Display top rated movies on the right
  topRatedMovies();
  UpcomingMovies();
}

