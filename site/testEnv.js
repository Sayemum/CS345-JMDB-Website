/*
To switch from jmdb_main.js to testEnv.js, uncomment the following line in site/index.html:
<script src="testEnv.js"></script>
and comment out the following line:
<script src="jmdb_main.js"></script>

Feel free to delete the code here. If you want to save code, make another file.
*/

function setup() {
  createCanvas(400, 400);
  createSearchBar(0, 0, 100);
}

function draw() {
  background(220);
  response = Searcfetch_json_by_movie_name("Star");
  console.log(response);
}
