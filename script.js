var canvas = document.getElementById('canvas');//CANVAS
var context = canvas.getContext('2d');//VIEW
context.lineWidth = 4; //DRAWING LINE
var down = false; // MOUSE PRESSED OR NOT

//CANVAS SIZE
canvas.width = 800; 
canvas.height= 550;

canvas.addEventListener('mousemove', draw);


// ON MOUSE BUTTON DOWN
canvas.addEventListener('mousedown', function(){
	down = true; //change to true
	context.beginPath(); //reset current path if dont reset
	// the buttom clear will not work
	context.moveTo(xPos,yPos); // moves to x and y
	canvas.addEventListener("mousemove", draw);
});

//чтобы линия отщеликвалась-заканчивалась
canvas.addEventListener('mouseup', function(){
	down = false;
});

function draw(e){
	xPos = e.clientX - canvas.offsetLeft; //e is MouseEvent object
	yPos = e.clientY - canvas.offsetTop;

	/*alert(canvas.offsetLeft);
	alert(canvas.offsetTop);
	alert(xPos);
	alert(yPos);*/

	if(down == true){
		context.lineTo(xPos, yPos); //create line but doesnt draw it
		context.stroke(); //stroke for drawing
	}
}

//take the color
function changeColor(color){
	context.strokeStyle = color;
}
//clears all drawings
function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height); // position
}