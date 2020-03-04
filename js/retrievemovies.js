var retrievedObject = localStorage.getItem("MOVIES");
var MOVIES = JSON.parse(retrievedObject);

var MIDDLE_POINT = 0.5;
var NUM_PIC = 5;

ALL_MOODS = ["Agitated","Calm","Happy","Sad","Tired","WideAwake","Scared","Fearless"];


// Display the selected mood
function display_mood(curr_mood){

    let display_text = 'Last Mood Selected: not selected';
    if (curr_mood != undefined){
        display_text = "Last Mood Selected: " + curr_mood;
    }
    
    document.getElementById("mood-selection").innerHTML = display_text
}

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


// Suggesting movies based on the slider mood
function find_movies(curr_mood)
{
    let mood_movies, movie_title, movie_img;

    mood_movies = MOVIES[curr_mood];
    if(mood_movies != null) {   // After testing that the array is not empty, I assign a name and image
        for (i = 0; i < mood_movies.length; i++) {
            movie_title  = MOVIES[curr_mood][i].title;
            movie_img = MOVIES[curr_mood][i].image;

            document.getElementById("movie-"+i+"-img").src=movie_img;       //Change the HTML content of a <src> element with id="movie-"i"-img:
            document.getElementById("movie-"+i+"-title").innerHTML=movie_title; //Change the HTML content of a <p> element with id="movie-"i"-title:
        }
    }
}

// Triggered when value of sliders is changing.
$('input[type="range"]').change(function (){
    let value, curr_mood;

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
           
        curr_mood = ALL_MOODS[value]
        
        reset_slider(value);
        display_mood(curr_mood);
        find_movies(curr_mood);
        if (value <2){
            document.getElementById("happy-sad").value = 2.5;
            document.getElementById("tired-wideawake").value = 4.5;
            document.getElementById("scared-fearless").value = 6.5;
        }else if ((value >= 2) && (value < 4)){
            document.getElementById("agitated-calm").value = 0.5;
            document.getElementById("tired-wideawake").value = 4.5;
            document.getElementById("scared-fearless").value = 6.5;
        }else if ((value >= 4) && (value < 6)){
            document.getElementById("agitated-calm").value = 0.5;
            document.getElementById("happy-sad").value = 2.5;
            document.getElementById("scared-fearless").value = 6.5;
        }else if ((value >= 6) && (value < 8)){
            document.getElementById("agitated-calm").value = 0.5;
            document.getElementById("happy-sad").value = 2.5;
            document.getElementById("tired-wideawake").value = 4.5;
        }
        value = undefined; // unset
        delete(value); 
    }   
});
