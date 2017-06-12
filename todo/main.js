var removeSVG = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.68 52.68"><defs><style>.cls-1,.cls-2,.cls-3{fill:none;stroke:#ed1d24;stroke-linecap:round;stroke-linejoin:round;}.cls-1{stroke-width:2.68px;}.cls-2{stroke-width:3.2px;}.cls-3{stroke-width:3.2px;}</style></defs><title>delete</title><rect class="cls-1" x="1.34" y="1.34" width="50" height="50" rx="12" ry="12"/><line class="cls-2" x1="9.21" y1="8.1" x2="44.6" y2="43.43"/><line class="cls-3" x1="43.97" y1="8.6" x2="9.04" y2="44.38"/></svg>'
var completeSVG = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.69 52.69"><defs><style>.cls-1{fill:none;stroke:#91a8cf;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.69px;}</style></defs><title>do</title><rect class="cls-1" x="1.34" y="1.34" width="50" height="50" rx="12" ry="12"/></svg>'


document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('note').value;
  if (value) addNoteTodo(value);
  document.getElementById('note').value='';
});

function removeNote(){
	var note = this.parentNode.parentNode;
	var parent = note.parentNode;

	parent.removeChild(note);

}
function completeNote(){
	var note = this.parentNode.parentNode;
	var parent = note.parentNode;
	var id = parent.id;
	var target = (id === 'todo') ? document.getElementById('done'):document.getElementById('todo');

	parent.removeChild(note);
	target.insertBefore(note, target.childNodes[0]);

}


//lisab asja listi
function addNoteTodo(text){

	var list = document.getElementById('todo');

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
