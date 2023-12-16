var lastX = window.innerWidth;
var lastY = window.innerHeight;
var currentMovie;

var movieRatingImg;

// Sprint 4: preload rating image
function preload() {
    movieRatingImg = loadImage('../images/star_image.png');
}

function setup() {
    fittedCanvas(1600, 750);
    noLoop();

    displayATags();

    createSearchBar(10, 30, 125);
    logo = createElement("img");
    logo.class("logo");
    logo.width = 400;
    logo.height = 100;
    logo.attribute("src", "../jmulogo_bgremoved.png");
    
}

function draw() {
    background(charcoal_gray);
    
    noStroke();
    popMovie(); // Function is in PopularJSON.js
    let top = color("#3B3B3B");
    let bottom = color("#716A6A");
    setGradient(0, 0, width, height, top, bottom, Y_AXIS);
    displayRandomQuote(500, 520, 1.5); // Function is in utilities
}

function popMovie() {
    fill('white');
    stroke('black');
    strokeWeight(4);
    textSize(32);
    text("Popular Now:", 50, 110)
    let pJSON = new PopularJSON();
    pJSON.getPopularJSON();
}

function movieDisplay(movie) {

    currentMovie = movie;

    console.log("Displaying movie");
    let top = color("#3B3B3B");
    let bottom = color("#716A6A");
    setGradient(0, 0, width, height, top, bottom, Y_AXIS);

    // Background box
    strokeWeight(3);
    stroke(250);
    fill("#450084");
    rect(40, 170, 1110, 625, 10);
    strokeWeight(0);

    //displaying movie picture
    let moviepic = createElement('img');
    let posterpath = movie.poster_path;
    if (posterpath != null) {
        let url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
        let fullposturl = url + posterpath;
        moviepic.attribute('src', fullposturl);
        moviepic.position(50, 308);
        moviepic.size(300, 450);
        moviepic.style("border", "solid 3px gray")
    } else {
        console.log("here");
        textSize(20);
        fill('black');
        text("No poster available.", 50, 340);
    }

    //color elements for runtime&release date
    let color1 = color(203, 182, 119);

    // Writing movie title
    let name = movie.title;
    if (name.length >= 40 && name.length < 50) { //fix part to work better later
        textFont('Artegra Slab'); // JMU Font
        textSize(40);
        fill('white');
        text(name, 55, 225);
    } else if (name.length >= 50 && name.length < 60) {
        textSize(30);
        fill('white');
        text(name, 55, 225);
    }
    else if (name.length >= 60) {
        textSize(25);
        fill('white');
        text(name, 55, 225);
    } else {
    textFont('Artegra Slab'); // JMU Font
    if (name.length > 60) {
        textSize(24);
    } else if (name.length > 40) {
        textSize(38);
    } else {
        textSize(50);
    }
    fill('white');
    text(name, 55, 225);
    }
    
    // Displaying runtime converted to hr&min & release date     movie.runtime
    let runtime = parseInt(movie.runtime);
    let releasedate = movie.release_date;
    textSize(20);
    fill(color1);
    rect(55, 275, 82, 25, 8);
    rect(55, 245, 53, 25, 8);
    fill('black');
    text(releasedate.substring(0, 4), 60, 264) //Release year
    text(Math.trunc(runtime / 60) + "hr " + (runtime % 60) + "m" , 60, 294); //Runtime

    // Sprint 4: Display movie rating
    image(movieRatingImg, 175, 240, 50, 50);
    textFont('Artegra Slab'); // JMU Font
    textSize(25);
    fill('yellow');
    displayAvgRating(currentMovie.id, 235, 275);

    // Display overview 
    let overview = movie.overview;
    fill('white');
    if (overview.length < 400) {
        textSize(25);
    } else if (overview.length < 550) {
        textSize(22);
    } else {
        textSize(18);
    }
    textWrap(WORD);
    text(overview, 360, 330, 785);

    // Popularity
    textSize(18);
    let popularity = movie.popularity;
    text("Popularity: " + popularity, 360, 690);

    // Audience
    let audience = movie.adult;
    if (audience) {
        text("Recommended Audience: Adults", 360, 720);
    } else {
        text("Recommended Audience: All Ages", 360, 720);
    }

    // Production company
    let productionCompany = movie.production_companies[0].name;
    fill(255);
    text("Production: " + productionCompany, 360, 750);

    // Tagline
    let tagline = movie.tagline;
    textSize(30);
    fill(color1);
    if (tagline != null){
        text(tagline, 50, 785);
    }

    // Reviews button
    let reviews_b = createButton("Reviews");
    reviews_b.position(945, 190);
    reviews_b.size(175, 50);
    reviews_b.class("reviewButton");
    reviews_b.mousePressed(function() {
        // console.log("REVIEWS BUTTON PRESSED");
        //Store current movie in local storage
        storeItem("currentMovie", movie);
        window.location.href = "ReviewPage.html";
        
        
    })
}



/*
function windowResized() {
    // This is the function call when you make the window smaller or bigger.
    fittedCanvas(1700, 900);
    setup();
    draw();
    background(charcoal_gray);
}
*/
