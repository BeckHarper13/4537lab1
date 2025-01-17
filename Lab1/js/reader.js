document.getElementById('backButton').addEventListener('click', function(){

    window.location.href = "./index.html";
})

//Class for reading Notes. Handles functionality of Notes reading and displaying
class NotesReader {
    constructor(){
        this.retrieveInterval = null;
        this.startInterval();

    }

    retrieveNotes(){
        //Gets the notes from local storage
        const storedNotes = localStorage.getItem("notes");
    
        //Checks to see if there are stored notes previously and sets them if there are
        const notes = storedNotes ? JSON.parse(storedNotes) : [];

        //Displays the array of notes currrently in the object, then updates the retrieve time
        this.displayNotes(notes);
        this.updateRetrieveTime();
    }


    //Function that takes the notes and displays them on the screen
    displayNotes(notes) {

        //Finds the container to put ythe notes in
        const container = document.getElementById("NotesContainer");

        // Clear previous content
        container.innerHTML = ""; 

        //Fopr each note (and index of the note) create a new div filling it with the notes content
        notes.forEach((note, index) => {
          const noteElement = document.createElement("div");
          noteElement.className = "note";
          noteElement.textContent =  `${note.content}`;

          //Adds note to the container
          container.appendChild(noteElement);
        });

        
    }



    //Function that updates the time of the latest retrival
    updateRetrieveTime() {
        const now = new Date().toLocaleTimeString();
        document.getElementById("SaveTime").textContent = `Last retrieved: ${now}`;
    }

    //Gets the notes, then starts a timer that gets them every 2 seconds
    startInterval(){
        this.retrieveNotes();
        this.retrieveInterval = setInterval(() => {
            this.retrieveNotes();
        }, 2000); 
        
    }
}

let notes = new NotesReader();