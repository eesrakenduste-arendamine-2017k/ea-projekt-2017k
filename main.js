var removeSVG = '<svg id="Layer_1" notes-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.68 52.68"><defs><style>.cls-1,.cls-2,.cls-3{fill:none;stroke:#ed1d24;stroke-linecap:round;stroke-linejoin:round;}.cls-1{stroke-width:2.68px;}.cls-2{stroke-width:3.2px;}.cls-3{stroke-width:3.2px;}</style></defs><title>delete</title><rect class="cls-1" x="1.34" y="1.34" width="50" height="50" rx="12" ry="12"/><line class="cls-2" x1="9.21" y1="8.1" x2="44.6" y2="43.43"/><line class="cls-3" x1="43.97" y1="8.6" x2="9.04" y2="44.38"/></svg>'
var completeSVG = '<svg id="Layer_1" notes-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.69 52.69"><defs><style>.cls-1{fill:none;stroke:#91a8cf;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.69px;}</style></defs><title>do</title><rect class="cls-1" x="1.34" y="1.34" width="50" height="50" rx="12" ry="12"/></svg>'

console.log("hakkas peale2")

document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('note').value;
  if (value) {
	 addNote(value);
  
  }
});

document.getElementById('note').addEventListener('keydown', function(e){
	var value = this.value;
	if (e.code === 'Enter' && value){
	addNote(value);
	}
})
function addNote(value){
	addNoteTodoM(value);
    document.getElementById('note').value='';
  
    notes.todo.push(value);
    notesObjectUpdated();
	
	
}

function renderTodoList(){
	if (!notes.todo.length && !notes.completed.length) return;
	
	for (var i = 0; i<notes.todo.length; i++){
		var value = notes.todo[i];
		addNoteTodoM(value);
	}
		
	for (var j=0; j<notes.completed.length; j++) {
		var value = notes.completed[j];
		addNoteTodoM(value, true);
		
	}
}
function notesObjectUpdated(){
	localStorage.setItem('todoList', JSON.stringify(notes));
}

function removeNote(){
	var note = this.parentNode.parentNode;
	var parent = note.parentNode;
	var id = parent.id;
	var value = note.innerText;
	if (id === 'todo') {
		notes.todo.splice(notes.todo.indexOf(value), 1);
	} else {
		notes.completed.splice(notes.completed.indexOf(value), 1);
	}
	notesObjectUpdated();
	parent.removeChild(note);

}

var notes = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')): {
	todo: [],
	completed: []
};

console.log(notes);
renderTodoList();

function completeNote(){
	var note = this.parentNode.parentNode;
	var parent = note.parentNode;
	var id = parent.id;
	var value = note.innerText;
	
	
	if (id === 'todo') {
		notes.todo.splice(notes.todo.indexOf(value), 1);
		notes.completed.push(value);
	} else {
		notes.completed.splice(notes.completed.indexOf(value), 1);
		notes.todo.push(value);
	}
	
	notesObjectUpdated();
	
	var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

	parent.removeChild(note);
	target.insertBefore(note, target.childNodes[0]);

}

//lisab asja listi
function addNoteTodoM(text, completed){

	var list = (completed) ? document.getElementById('completed'):document.getElementById('todo');
	//console.log(list);
	var note = document.createElement('li');
	note.innerText = text;

	var buttons = document.createElement('div');
	buttons.classList.add('buttons');

	var remove = document.createElement('button');
	remove.classList.add('remove');
	remove.innerHTML = removeSVG;

	//lisan nüüd kustutamise eventi

	remove.addEventListener('click', removeNote);


	var complete = document.createElement('button');
	complete.classList.add('complete');
	complete.innerHTML = completeSVG;
	complete.addEventListener('click', completeNote);

	buttons.appendChild(remove);
	buttons.appendChild(complete);
	note.appendChild(buttons);

	list.insertBefore(note, list.childNodes[0]);
	
}

// https://codepen.io/beeeees/pen/tsBwe
// https://www.w3schools.com/howto/howto_js_todolist.asp
// https://www.youtube.com/watch?v=bGLZ2pwCaiI&t=109s
// https://www.youtube.com/watch?v=XGOJVfOW-bo