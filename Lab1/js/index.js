//Parts of this code were written with assistance from Chat GPT

class indexUI{
    constructor(){
        //Calls the setup for the page
        this.displayEntryMessage();
        this.createLinks();
    }

    createLinks(){

        //When clicked, goes to writer.html
        document.getElementById('writerButton').addEventListener('click', function(){

            window.location.href = "./writer.html";
        })

        //When clicked, goes to reader.html
        document.getElementById('readerButton').addEventListener('click', function(){

            window.location.href = "./reader.html";
        })

        //Adds the text to both buttons
        document.getElementById('writerButton').textContent = config.WRITER;
        document.getElementById('readerButton').textContent = config.READER;

       
    }

    //Displays the entry message
    displayEntryMessage(){
        
        document.getElementById("title").innerHTML = `<b>${config.TITLE}</b>`
    }

}

let index = new indexUI()


