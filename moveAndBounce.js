// Get canvas element in order to render anything 
var canvas = document.getElementById("myCanvas");

// 2D rendering context
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;
var ballColor = "#0095DD"

// Draw a red square on the canvas
function draw() {
    clearCanvas();
    var isBallCollied = checkForCollision();
    var color
    if(isBallCollied) {
        ballColor = getRandomColor();
    }
    drawBall(x, y);
    x += dx;
    y += dy;
}
setInterval(draw, 30);

function checkForCollision() {
    var isBallCollided = false;

    if(y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
        isBallCollided = true;
    }

    if(x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
        isBallCollided = true;
    }

    return isBallCollided;
}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for(var i=0; i < 6; i++) {
        color += letters[Math.floor(Math.random()*16)];
    } 
    return color;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBall(xC, yC) {
   drawCircle(xC, yC, ballRadius, ballColor);
}

function drawCircle(xC, yC, radius, color) {
    // Draw an arc
    ctx.beginPath();
    ctx.arc(xC, yC, radius, 0, Math.PI*2, false);
    ctx.fillStyle= (color) ? color : "yellow";
    ctx.fill();
    ctx.closePath();
}