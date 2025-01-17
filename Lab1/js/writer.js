//Parts of this code were written with assistance from Chat GPT

document.getElementById('backButton').addEventListener('click', function(){

    window.location.href = "./index.html";
})


//A class for the 
class Note{
    constructor(content = ""){
        this.content = content;
    }


}

class NoteManager{
    constructor(){

        //Loads previous notes from storage, starts the save timing, renders the notes, and initializes the add note button
        this.notes = this.loadNotesFromStorage();
        this.saveInterval = null;
        this.renderNotes();
        this.startAutoSave();
        document.getElementById("addNote").addEventListener("click", () => this.addNote());
    }

    //function that loads previous notes from teh storage
    loadNotesFromStorage(){
        const notes = localStorage.getItem("notes");

        //Checks if there are actually notes in the local storage
        if (notes){
            return JSON.parse(notes).map(note => new Note(note.content));
        }
        return [];
    }


    //Saves the notes to the local Storage
    saveNote(){
        //Overrides the notes array inside local storage with the current array of notes
        localStorage.setItem("notes", JSON.stringify(this.notes));
        this.updateSaveTime();
    }


    //Updates the most recent save time.
    updateSaveTime(){
        const time = new Date().toLocaleTimeString();
        document.getElementById("SaveTime").textContent = `Last Saved: ${time}`;
    }

    //Starts the automatic saving of notes to storage.
    startAutoSave(){
        this.saveInterval = setInterval(() =>{
            this.saveNote();
        }, 2000)
    }

    renderNotes() {

        //Gets note container and clears it
        const container = document.getElementById("NotesContainer");
        container.innerHTML = ""; 

        //For every note in storage, grabs index as well
        this.notes.forEach((note, index) => {

            //Creates a new div with class name
          const noteElement = document.createElement("div");
          noteElement.className = "note";

          //Create an area for the text to appear in, and set it to the note content
          const textarea = document.createElement("textarea");
          textarea.value = note.content;


          //Listens for user input in the text area, and updates the content of the note with the value in the text area
          textarea.addEventListener("input", (event) => {
            this.notes[index].content = event.target.value;
          });

          //Renders the delete button beside every note, allowing it to be removed from localStorage
          
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Remove";

          //calls the delete function when remove is clicked
          deleteButton.addEventListener("click", () => this.deleteNote(index));


          //Appends children to the notes, then the note to teh container
          noteElement.appendChild(textarea);
          noteElement.appendChild(deleteButton);
          container.appendChild(noteElement);
        });
    }

    //Function to add a note to the container. Pushes a new empty note to the container, then renders the container
    addNote() {
        this.notes.push(new Note());
        this.renderNotes();
    }

    //Function to delete node. Gets index of note, removes note at index
    deleteNote(index) {
        this.notes.splice(index, 1);

        //We call the save note right away to immediatly remove it from local storage
        this.saveNote();
        this.renderNotes();
      
    }

}

const notesManager = new NoteManager();