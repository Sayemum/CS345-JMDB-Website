/**
 * Takes an x and y parameter, with the movieID of the reviews to display, and displays the
 * reviews starting with the first at x, y.
 * @param x Where to start drawing the reviews to the screen 
 * @param y Where to start drawing the reviews to the screen
 * @param movieID The ID of the movie to retrieve the movies from.
 */
function displayReviews(x, y, movieID, startIndex, endIndex) {
    let movieIDURL = join(["https://keyval.learnscrum.xyz/keystore/", movieID, "?apikey=", KEYVAL_API_KEY], '');
    httpDo(movieIDURL, 'GET',
        function (response) {
            console.log(response);
            jsonReviews = JSON.parse(response);
            // Presentation Repo Man reviews
            // httpDo(movieIDURL, 'PUT', 'text', [{"user":"Molly","rating":"8","text":"Great Movie!","like":1,"dislike":0},{"user":"Jane","rating":"10","text":"Best Movie I have ever watched. The Cast was great and it was very entertaining. I would recommend watching for sure!","like":1,"dislike":0},{"user":"Bob","rating":"6","text":"it was okay.","like":0,"dislike":2},{"user":"Josh","rating":"10","text":"The best part was when repo man said \"It's repo-ing time\" and repoed all over the city. This movie deserves to make a repo-zillion dollars and to win every single movie award. Every actor deserves the highest praise and the director is one of the greatest directors of all time, surpassing the likes of Christopher Nolan, Wes Anderson, Martin Scorsese, and Stanley Kubrick. I'm surprised I didn't pass out considering how overloaded my brain was by the genius of this movie.","like":4,"dislike":1},{"user":"Jalen","rating":"4","text":"Overrated and tired cliches.","like":0,"dislike":0},{"user":"Maddie","rating":"7","text":"It was pretty good, I would watch again.","like":0,"dislike":1}] );
            for (let i = startIndex; i < endIndex && i < jsonReviews.length; i++) {
                let review = jsonReviews[i]; // Individual review JSON
                
                fill('white');
                stroke('black');
                strokeWeight(3);
                reviewLength = review.text.toString().length;
                rect(x - 5, y - 20, 500, 55 + Math.floor(reviewLength / 46) * 17);

                strokeWeight(0);
                fill('black');
                textSize(15);
                text(review.user, x, y);

                
                textSize(17);
                textWrap(WORD);
                reviewWidth = textWidth(review.text);
                text(review.text, x, y + 10, 400);

                fill('#f03f32');
                text(review.dislike, x + 370, y - 15, 400);

                
                fill('#28eb35');
                text(review.like, x + 425, y - 15, 400);
                
            

                if (review.rating >= 0 && review.rating < 4) { // Bad review
                    fill(badRed);
                } else if (review.rating >= 4 && review.rating < 7) { //Mid review
                    fill(midYellow);
                } else {
                    fill(goodGreen); // Good review
                }
                text(review.rating + " / 10", x + 310, y);

                
                likeButton = createButton('👍');
                likeButton.class("likeButton");
                fill(0);
                likeButton.position(x + 445, y - 15);
                likeButton.mousePressed(function() {
                    let updatedReviews = jsonReviews;
                    updatedReviews[i].like = updatedReviews[i].like + 1;
                    httpDo(`https://keyval.learnscrum.xyz/keystore/${movieID}?apikey=${KEYVAL_API_KEY}`, 'PUT', 'text', JSON.stringify(updatedReviews), function (result) {
                        /*
                        fill('white');
                        console.log(likeButton.x);
                        rect(likeButton.x - 10, likeButton.y, 20, 20);
                        fill(goodGreen);
                        // Not the right place, need to store x, y for review
                        text(updatedReviews[i].like, likeButton.x - 10, likeButton.y, 400);
                        */
                        window.location.href = "ReviewPage.html";
                    });
                });
                
                

                dislikeButton = createButton('👎');
                // dislikeButton.attribute("src", "https://cdn-icons-png.flaticon.com/512/1633/1633636.png");
                dislikeButton.class("dislikeButton");
                dislikeButton.position(x+390, y - 15);
                dislikeButton.mousePressed(function() {
                    let updatedReviews = jsonReviews;
                    updatedReviews[i].dislike = updatedReviews[i].dislike + 1;
                    httpDo(`https://keyval.learnscrum.xyz/keystore/${movieID}?apikey=${KEYVAL_API_KEY}`, 'PUT', 'text', JSON.stringify(updatedReviews), function (result) {
                        window.location.href = "ReviewPage.html";
                    });
                });
                
                
                fill(0);
                /*
                thumbsDown = createElement("img");
                thumbsDown.class("dislikeButton");
                thumbsDown.attribute("src", "https://cdn-icons-png.flaticon.com/512/1633/1633636.png");
                thumbsDown.position(x+390, y - 15);
                */


                
                y += 65 + Math.floor(reviewLength / 46) * 17;

                
            }

        },

        function (error) {
            httpDo(`https://keyval.learnscrum.xyz/keystore/${movieID}?apikey=${KEYVAL_API_KEY}`, 'PUT', 'text', []);
        }

        
    );

}
