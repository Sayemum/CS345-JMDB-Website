function preload() {
  movieRatingImg = loadImage('../images/star_image.png');
}

function setup() {
    fittedCanvas(1500, 800);
    noLoop();

    displayATags();

    logo = createElement("img");
    logo.class("logo");
    logo.width = 400;
    logo.height = 100;
    logo.attribute("src", "../jmulogo_bgremoved.png");

    nameInput = createInput().attribute('placeholder', 'Name');
    nameInput.position(185, 92);
    nameInput.size(100);

    rateInput = createInput().attribute('placeholder', 'Rate from 1-10');
    rateInput.position(305, 92);
    rateInput.size(100);

    reviewInput = createInput().attribute('placeholder', 'Write your review here');
    reviewInput.position(425, 92);
    reviewInput.size(200);

    saveReview = createButton("Save Review");
    saveReview.position(650, 94);
    saveReview.mousePressed(function () {
        createJSON(nameInput.value(), rateInput.value(), reviewInput.value(), 0, 0, id);
    });
}

function draw() {

    fakeFightClubReviews = [{user: "Bob",  rating: 10, text: "This movie is great! Just because this movie is great, I decided to write a really long review that really shouldn't be this long, but I decided to write it this long anyway. I'm going to make sweeping generalizations about current movie culture and explain how this movie fights those, when really it is just an exceptional example of following those.", like: 0, dislike: 0}, {user: "Alice", text: "This movie is terrible! Yap yap yap yap yap yap yap yap yap yap yap yap yap", rating: 1, like: 0, dislike: 0}];

    //Hard code some reviews into Fight Club, this should be done by add review button with input fields on review page
    keyValURL = 'https://keyval.learnscrum.xyz/keystore/550?apikey=' + KEYVAL_API_KEY;
    // httpDo(keyValURL, 'PUT', 'text', fakeFightClubReviews);

    background(charcoal_gray);
    let top = color("#3B3B3B");
    let bottom = color("#716A6A");
    setGradient(0, 0, width, height, top, bottom, Y_AXIS);

    movie = getItem("currentMovie");
    id = movie.id;
    // Displaying reviews
    displayReviews(20, 160, movie.id, 0, 5);
    displayReviews(950, 160, movie.id, 5, 10);

    // Displaying text that says "Reviews for <Movie Title>"
    reviewTitle = "Reviews for " + movie.original_title;
    textFont('Artegra Slab');
    strokeWeight(0);
    if (reviewTitle.length > 60) {
      textSize(28);
    } else if (reviewTitle.length > 40) {
      textSize(42);
    } else {
      textSize(50);
    }
    fill('white');
    text(reviewTitle, 20, 75);

    // Displaying text that says "Write a review:" and "Showing first 5 reviews."
    textFont('Artegra Slab');
    fill('white');
    textSize(25);
    text("Write a review:", 20, 110);
    textSize(15);
    text("Showing first 10 reviews.", 21, 130);

    // Display avg rating
    image(movieRatingImg, 680, 620, 50, 50);
    textFont('Artegra Slab'); // JMU Font
    textSize(25);
    fill('yellow');
    displayAvgRating(id, 740, 655);

    // Display movie poster
    let moviePoster = createElement('img');
    let posterpath = movie.poster_path;
    if (posterpath != null) {
        let url = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
        let fullposturl = url + posterpath;
        moviePoster.attribute('src', fullposturl);
        moviePoster.position(575, 150);
        moviePoster.size(300, 450);
        moviePoster.class("poster");
    } else {
        console.log("here");
        textSize(20);
        fill('black');
        text("No poster available.", 50, 340);
    }

    
}


function createJSON(name, rating, review, likeCount, dislikeCount, id) {
  if (name.trim() == "" || rating.trim() == "" || review.trim() == "") {
    fill(charcoal_gray);
    rect(760, 90, 300, 25);
    textFont("Artegra Slab");
    textSize(20);
    fill('#f03f32')
    text("Please fill out all fields", 765, 110);
    return;
  } else if (name.length > 65) {
    fill(charcoal_gray);
    rect(760, 90, 400, 25);
    textFont("Artegra Slab");
    textSize(20);
    fill(badRed);
    text("Please enter a name less than 65 characters", 765, 110);
    return;
  } else if (isNaN(rating)) {
    fill(charcoal_gray);
    rect(760, 90, 400, 25);
    textFont("Artegra Slab");
    textSize(20);
    fill(badRed);
    text("Please enter a number rating between 1 and 10", 765, 110);
    return;
  } else if (rating < 0 || rating > 10) {
    fill(charcoal_gray);
    rect(760, 90, 400, 25);
    textFont("Artegra Slab");
    textSize(20);
    fill(badRed);
    text("Please enter a number rating between 1 and 10", 765, 110);
    return;
  } else if (review.length > 500) {
    fill(charcoal_gray);
    rect(760, 90, 400, 25);
    textFont("Artegra Slab");
    textSize(20);
    fill(badRed);
    text("Please enter a review less than 500 characters", 765, 110);
    return;
  }

  // Create review JSON object

  obj = {
      user: name,
      rating: rating,
      text: review,
      like: likeCount,
      dislike: dislikeCount
  };

  // Get Current Reviews, add new review, put back in KeyVal
  let url = "https://keyval.learnscrum.xyz/keystore/" + str(id) + "?apikey=" + KEYVAL_API_KEY;
  httpDo(url, "GET", function (response) {
      reviewJSON = JSON.parse(response);
      // Add to current reviews
      reviewJSON.push(obj);
      console.log(reviewJSON);

      // Put it back in KeyVal
      httpDo(url, 'PUT', 'text', reviewJSON, function (result) {
          console.log("Reviews Updated");
          window.location.href = "ReviewPage.html";
      });
  });
}

function windowResized() {
  // This is the function call when you make the window smaller or bigger.
  fittedCanvas(800, 800);
  setup();
  draw();
}