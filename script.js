var canvas = document.getElementById('canvas');//CANVAS
var context = canvas.getContext('2d');//VIEW
context.lineWidth = 4; //DRAWING LINE
var down = false; // MOUSE PRESSED OR NOT
context.fillStyle = "white"; //CANVAS BACKGROUND WHITE
context.fillRect(0, 0, canvas.width, canvas.height); //RECTANGLE TO FILL BACKGROUND WHITE
context.lineCap = "round";
canvas.addEventListener('mousemove', draw);

// ON MOUSE BUTTON DOWN
canvas.addEventListener('mousedown', function(){
	down = true; //change to true
	context.beginPath(); //reset current path if dont reset
	// the buttom clear will not work
	context.moveTo(xPos,yPos); // moves to x and y
	canvas.addEventListener("mousemove", draw);
});

//LINE TO END(will not continue)
canvas.addEventListener('mouseup', function(){
	down = false;
});

function draw(e){
	
	xPos = e.clientX - canvas.getBoundingClientRect().left; // FIXED PROBLEM AND NOW CAN MOVE CANVAS EVERYTHERE
	yPos = e.clientY - canvas.getBoundingClientRect().top;

	if(down == true){
		context.lineTo(xPos, yPos); //create line but doesnt draw it
		context.stroke(); //stroke for drawing
	}
}

//TAKE THE COLOR FROM PALETTE
function changeColor(color){
	context.strokeStyle = color; //PALETTE
	context.fillStyle = color; //FOR CANVAS FULL FILLING
}
//clears all drawings
function clearCanvas(){
	context.fillStyle = "white"; //CANVAS "ILLUSION" OF CLEARNING
	context.fillRect(0, 0, canvas.width, canvas.height);
}

//BRUSH SIZE CHANGES
function changeBrushSize(size){
	context.lineWidth = size;
}

//FILLING CANVAS
function fillCanvas() {
	context.fillRect(0, 0, canvas.width, canvas.height);
}

//CHANGE BRUSH STYLE

//IMAGE SAVING FUNCTION
function saveImage() {
    var gh = canvas.toDataURL('png');
    var a  = document.createElement('a');
    a.href = gh;
    a.download = 'image.png';
    a.click()
}