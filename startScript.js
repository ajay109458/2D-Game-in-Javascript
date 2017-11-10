// Get canvas element in order to render anything 
var canvas = document.getElementById("myCanvas");

// 2D rendering context
var ctx = canvas.getContext("2d");

// Draw a red square on the canvas
ctx.beginPath();
ctx.rect(20, 40, 50, 70);
ctx.fillStyle = "#FFFFFF";
ctx.fill();
ctx.closePath();



function drawCircle(x, y, radius) {
    // Draw an arc
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, false);
    ctx.fillStyle="yellow";
    ctx.fill();
    ctx.closePath();
}