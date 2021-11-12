console.log("WELCOME TO NOTES-TAKING APP");
showNotes(); //It is called because when we reload our page our all notes got hide so with this our notes are not hiding 
let addBtn = document.getElementById('addBtn');       // TO CREATE NOTES
addBtn.addEventListener("click",function(e){
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
});
function showNotes(){                                 // FUNCTION TO SHOW N=ELEMENTS FROM LOCAL STORAGE
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index) {
        html += `
        </div>
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">DELETE NOTE</button> 
          </div>
        </div>`; //Here Above this.id sents id of the element on which you clicked as a index to deleteNote Function
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length !== 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = "NOTHING TO SHOW HERE :(  ADD SOME NOTES FIRST!!!!";
    }
}

function deleteNote(index){                               //FUNCTION TO DELETE NOTES
    // console.log("DELETING",index); prints the index as zero if we delete the first note as our notes are stored in arrray and arrray always starts from 0 index
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
}
notesObj.splice(index,1); // This splice function deletes the notes As an argument first it takes the starting index from where you wanna start deletion a=then next is upto which number you wanna delete As here we wanna delete just 1 note
localStorage.setItem('notes',JSON.stringify(notesObj)); //UPDATING OUR LOCAL STORAGE AFTERE NOTE DELETION
showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
    // console.log("INPUT EVENT FIRED");
    let inputval = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
         let cardTxt = element.getElementsByTagName("p")[0].innerText;
         if(cardTxt.includes(inputval)){
             element.style.display = "block";
         }
         else{
             element.style.display = "none";
         }

        //  console.log(cardTxt);
    })
})