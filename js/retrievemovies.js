var retrievedObject = localStorage.getItem("MOVIES");
var MOVIES = JSON.parse(retrievedObject);

var MIDDLE_POINT = 0.5;
var NUM_PIC = 5;

ALL_MOODS = ["Agitated","Calm","Happy","Sad","Tired","WideAwake","Scared","Fearless"];


// Reseting the content of the slider when bar is in the middle (value = 0.5)
function reset_slider(range_value)
{
    if ((range_value % MIDDLE_POINT) == 0){ // This is just working bcz when value is not at the half. the MOVIES array is empty.
        for (i = 0; i < NUM_PIC; i++) {
            document.getElementById("movie-"+i+"-img").src="images/no-content.png"; //Change the HTML content of a <src> element with id="movie-"i"-img:
            document.getElementById("movie-"+i+"-title").innerHTML="No content"; //Change the HTML content of a <p> element with id="movie-"i"-title:
        }
    }
}

// Display the selected mood
function display_mood(curr_mood){

    let display_text;

    display_text = "Last Mood Selected: " + curr_mood;
    document.getElementById("mood-selection").innerHTML = display_text
}


// Suggesting movies based on the slider mood
function find_movies(curr_mood)
{
    let curr_movie, curr_name, curr_image;

    curr_movie = MOVIES[curr_mood];
    if(curr_movie != null) {   // After testing that the array is not empty, I assign a name and image
        for (i = 0; i < curr_movie.length; i++) {
            curr_name  = MOVIES[curr_mood][i].name;
            curr_image = MOVIES[curr_mood][i].image;

            document.getElementById("movie-"+i+"-img").src=curr_image;       //Change the HTML content of a <src> element with id="movie-"i"-img:
            document.getElementById("movie-"+i+"-title").innerHTML=curr_name; //Change the HTML content of a <p> element with id="movie-"i"-title:
        }
    }
}

// Triggered when value of sliders is changing.
$('input[type="range"]').change(function (){
    let value;

    //The .val() method is used to get the values of the input elements.
    // When called on an empty collection, it returns undefined.
    value = $(this).val();

    // Testing that the content has been uploaded before moving the sliders
    if(MOVIES.length == 0){
        alert("Please upload the list with the movies!");
        document.getElementById("agitated-calm").value = 0.5;
        document.getElementById("happy-sad").value = 2.5;
        document.getElementById("tired-wideawake").value = 4.5;
        document.getElementById("scared-fearless").value = 6.5;
        display_mood(' ')
        return;
    }else{
        reset_slider(value);
        display_mood(ALL_MOODS[value]);
        find_movies(ALL_MOODS[value]);
    }
    
});
