
var MOVIES;
MOVIES = [];

/* Triggered after button is clicked and a xml file is uploaded.
Reading the xml file, parsing the data and store it an xml format
Parsing was found in "W3Source" and FileReader from an open source 
code available in github.*/
$(".upload-button").change(function(event){
   let xmlFile, fileReader, parser, xmlDoc


   xmlFile = event.target.files;
   fileReader = new FileReader();
   fileReader.readAsText(xmlFile[0]);

   fileReader.onload = function() {   //This event is triggered each time the reading operation is successfully completed.
      parser = new DOMParser() //Creating a parser object
      xmlDoc = parser.parseFromString(this.result, "text/xml"); // The parser creates a new XML DOM object using the "this.result" string
                                    // result contains the last/previous value returned by an event handler triggered by the specified event
      xml  = xmlDoc.documentElement; // returns the documentElement of the document, as an Element object.
      processXML(xmlDoc);            // Reading through the XML file
      alert("Upload was succesful!");
   }
});

/* Parsing the xml file and processind data.
Create movie objects and store them in a array 
based on the mood preference.
*/

// open source-code script
function processXML(xml) {
   $(xml).find('programme').each(function(){
      let $movie, title, image, mood;

      // .find() method allows us to search through "title", "image", "mood" of
   
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

      // If it doesn't find a match, it creates a new subarray for this mood
      if(MOVIES.indexOf(mood) < 0){
         MOVIES.push(mood);   //The push() method adds new items to the end of an array, and returns the new length.
         MOVIES[mood] = []; 
      }

      // Adding the object of the movie (i.e. title, image),
      MOVIES[mood].push(movie);
    });
}

localStorage.setItem("MOVIES", JSON.stringify(MOVIES))