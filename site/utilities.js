/**
 * I plan to put constants and utility functions here.
 */

const charcoal_gray = '#42413E';
const goodGreen = '#28eb35';
const midYellow = '#cfdb25';
const badRed = '#f03f32';
const X_AXIS = 1;
const Y_AXIS = 2;
const fullBlack = '#000000';
const fullWhite = '#ffffff';

/**
 * This function draws the links to each tab at the top of the page.
 */
function displayATags() {
    let aTags = [];
    aTags.push(createA('./index.html', 'Home'));
    aTags.push(createA('./MoviePage.html', 'Movies'));
    for (i = 0; i < aTags.length; i++) {
        aTags[i].position(15 + (i * 75), 2.5);
    }

}

function fittedCanvas(widthNeeded, heightNeeded) {
    let canvasWidth, canvasHeight;
    if (windowWidth > widthNeeded) {
        canvasWidth = windowWidth;
    } else {
        canvasWidth = widthNeeded;
    }

    if (windowHeight > heightNeeded) {
        canvasHeight = windowHeight;
    } else {
        canvasHeight = heightNeeded;
    }
    createCanvas(canvasWidth, canvasHeight);
}

function displayRandomQuote(x, y, scale) {
    quotes = [{
        quote: "Frankly, my dear, I don’t give a damn",
        movie: "Gone with the Wind (1939)"
    },

    {
        quote: "Toto, I've a feeling we're not in Kansas anymore.",
        movie: "The Wizard of Oz (1939)"
    },

    {
        quote: "Here's looking at you, kid.",
        movie: "Casablanca (1942)"
    },

    {
        quote: "May the Force be with you.",
        movie: "Star Wars (1977)"
    },

    {
        quote: "You talking to me?",
        movie: "Taxi Driver (1976)"
    },

    {
        quote: "Say 'hello' to my little friend!",
        movie: "Scarface (1983)"
    },

    {
        quote: "Elementary, my dear Watson.",
        movie: "The Adventures of Sherlock Holmes (1939)"
    },

    {
        quote: "Here's Johnny!",
        movie: "The Shining (1980)"
    },

    {
        quote: "Show me the money!",
        movie: "Jerry Maguire (1996)"
    },

    {
        quote: "Hasta la vista, baby.",
        movie: "Terminator 2: Judgment Day (1991)"
    },

    {
        quote: "Open the pod bay doors, HAL.",
        movie: "2001: A Space Odyssey (1968)"
    },

    {
        quote: "You can't handle the truth!",
        movie: "A Few Good Men (1992)"
    },

    {
        quote: "You're gonna need a bigger boat.",
        movie: "Jaws (1975)"
    },

    {
        quote: "I'll be back.",
        movie: "The Terminator (1984)"
    },

    {
        quote: "I'm the king of the world!",
        movie: "Titanic (1997)"
    },

    {
        quote: "The more you drive, the less intelligent you are.",
        movie: "Repo Man (1984)"
    }
    ];

    min = Math.ceil(0);
    max = Math.floor(quotes.length);
    randomNum = Math.floor(Math.random() * (max - min) + min);

    fill('white');
    stroke(0);
    strokeWeight(3);
    textSize(32);
    textFont('Artegra Slab');
    text("\"" + quotes[randomNum].quote + "\"", x, y);
    textSize(20);
    text("- " + quotes[randomNum].movie, x + 30, y + 50);



}

// function getAvgRating(id) {
//     let x = 0;
//     url = `https://keyval.learnscrum.xyz/keystore/${id}?apikey=${KEYVAL_API_KEY}`;
//     httpDo(url, "GET", function (response) {
//         reviews = JSON.parse(response);
//         // console.log("Length: " + reviews.length);
//         for (let i = 0; i < reviews.length; i++) {
//             x += int(reviews[i].rating);
//         }
//         x /= reviews.length;
//         x = x.toFixed(2);
//         // console.log("Average Rating: " + x);
//     });
//     return x;


//     // fetch_json_by_movie_name(input) {
//     //     fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${input}`, options)
//     //         .then(response => response.json())
//     //         // .then(response => console.log(response))
//     //         .then(response => createButtons(response))
//     //         .catch(err => console.error(err));
//     //   }
// }

// JSON/Fetch function
function displayAvgRating(id, x, y) {
    url = `https://keyval.learnscrum.xyz/keystore/${id}?apikey=${KEYVAL_API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(response => ratingCB(response, x, y))
        .catch(error => createEmptyReviews(id));
}

// Callback function to get the reviews and average the rating together
function ratingCB(reviews, xLoc, yLoc) {
    let x = 0;
    // console.log("Length: " + reviews.length);
    for (let i = 0; i < reviews.length; i++) {
        x += int(reviews[i].rating);
    }
    x /= reviews.length;
    x = x.toFixed(1);
    textFont('Artegra Slab'); // JMU Font
    textSize(25);
    fill('yellow');
    if (isNaN(x)) {
        x = "No reviews yet...";
    }
    text(x, xLoc, yLoc);
}

function createEmptyReviews(movieID) {
    httpDo(`https://keyval.learnscrum.xyz/keystore/${movieID}?apikey=${KEYVAL_API_KEY}`, 'PUT', 'text', []);
}


function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
  
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }

