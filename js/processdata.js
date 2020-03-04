
var MOVIES;
MOVIES = [];

// Triggered when button is clicked and file is uploaded.
// Reading the xml file, parsing the data and store it an xml format
// Parsing was found in "W3Source" and FileReader from an open source code available in github.
$(".upload-button").change(function(event){
   let xmlFile, fileReader, parser, xmlDoc


   xmlFile = event.target.files;
   fileReader = new FileReader();
   fileReader.readAsText(xmlFile[0]);

   fileReader.onload = function() {   //This event is triggered each time the reading operation is successfully completed.
      parser = new DOMParser() //Creating a parser object
      xmlDoc = parser.parseFromString(this.result, "text/xml"); // The parser creates a new XML DOM object using the "this.result" string:
                                    // .result contains the last/previous value returned by an event handler triggered by the specified event
      xml  = xmlDoc.documentElement; // returns the documentElement of the document, as an Element object.
      processXML(xmlDoc);            // Reading through the XML file
      alert("Upload was succesful!");
   }
});

// Reading through the xml file, creating movie objects and store them in the
// MOVIE array based on the mood preference.
// Used open source-code.
function processXML(xml) {
   $(xml).find('programme').each(function(){
      var $movie, title, image, mood;

      // .find() method allows us to search through "title", "image", "mood" of
      //DOM tree and construct a new jQuery object from the matching elements.

      // The result of the .text() method is a string containing the combined text of all matched elements
      $movie = $(this);
      title = $movie.find("title").text();
      image = $movie.find("image").text();
      mood = $movie.find("mood").text();

      // movie object
      movie = {
         title: title,
         image: image
      };

      // .indexOf() method  returns -1 when it doesn't find a match.
      if(MOVIES.indexOf(mood) < 0){
         MOVIES.push(mood);   //The push() method adds new items to the end of an array, and returns the new length.
         MOVIES[mood] = []; // Creating an array based on the mood
      }

      // Adding the object of the movie (i.e. title, image),
      MOVIES[mood].push(movie);
    });
}

localStorage.setItem("MOVIES", JSON.stringify(MOVIES))