

 var topics = ["bird", "cat", "snake", "lion"];

function displayAnimals() {

  var movie = $(this).attr("data-name");

 // var animale = $(this).data("search");
	console.log(movie);

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=SBzhBxvgH7inWPrdoGNS4WihIsYD81pD&q=" + movie + "&limit=10&offset=0&rating=G&lang=en";


console.log(queryURL);

// Performing an AJAX request with the queryURL
$.ajax({
url: queryURL,
method: "GET"
})

// After data comes back from the request
.done(function(response) {


  console.log(queryURL);

  console.log(response);

  var results = response.data;
 
// Function for displaying movie data

  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)

  // Looping through the array of movies
  for (var i = 0; i < results.length; i++) {

                                          
    var showDiv = $("<div>");

    var rating = results[i].rating;
    var defaultAnimatedSrc = results[i].images.fixed_height.url;
    var staticSrc = results[i].images.fixed_height_still.url;
    var showImage = $("<img>");
    var p = $("<p>").text("Rating: " + rating);

    showImage.attr("src", staticSrc);
    showImage.addClass("animalClass");
    showImage.attr("data-state", "still");
    showImage.attr("data-still", staticSrc);
    showImage.attr("data-animate", defaultAnimatedSrc);
    showDiv.append(p);
    showDiv.append(showImage);
    $("#animals").prepend(showDiv);

  }
});
}


// This function handles events where one button is clicked
  //event.preventDefault(); prevents the form from trying to submit itself.
  $("#addAnimal").on("click", function(event) {
  event.preventDefault();

   //This line will grab the text from the input box
  var animalz = $("#animal-input").val().trim();
  // The movie from the textbox is then added to our array
  topics.push(animalz);
  console.log(topics);
  $("#animal-input").val('');

  displayButtons();

});


function displayButtons () {
$("#animalButtons").empty();
for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");


    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", topics[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(topics[i]);

    // Adding the button to the HTML
    $("#animalButtons").append(a);
  }
}
displayButtons();



 // $(".gif").on("click", function() {

    $(document).on("click", displayAnimals);

    //Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
    $(document).on("click", pauseGifs);

    function pauseGifs() {

    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

