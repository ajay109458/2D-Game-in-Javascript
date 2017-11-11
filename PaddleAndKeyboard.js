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
var paddleColor = "#0095DD"
var brickColor = "#0095DD"

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var leftPressed = false;
var rightPressed = false; 

var brickRowCount = 3;
var brickColCount = 5; 
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;

var lives = 3;

var bricks = [];
for(c = 0; c < brickColCount; c++) {
    bricks[c] = [];
    for(r = 0;  r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1}
    }
}


// Draw a red square on the canvas
function draw() {
    clearCanvas();
    var isBallCollied = checkForCollision();
    if(isBallCollied) {
        // ballColor = getRandomColor();
    }
    handlePaddle();
    drawBall(x, y);
    collisionDetection();
    drawBricks();
    drawScore();
    drawLives();
    drawLives();
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

function handlePaddle() {
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0 ) {
        paddleX -= 7;
    }
    drawPaddle();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawBricks() {
    for(c = 0; c < brickColCount; c++ ) {
        for(r=0; r < brickRowCount; r++) {
            if( bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                drawRect(brickX, brickY, brickWidth, brickHeight, brickColor);
            }
        }
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function collisionDetection() {
    for(c = 0; c < brickColCount; c++ ) {
        for(r=0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    ballColor = getRandomColor();
                    b.status = 0;
                    score ++;
                    if(score == brickRowCount*brickColCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }   
                }
            }
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false)

draw();
//setInterval(draw, 40);

function keyDownHandler(e) {
    console.log("Key Down");
    if(e.keyCode == 39) {
        rightPressed = true;
    } else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e ) {
    console.log("Key Up");
    if(e.keyCode == 39) {
        rightPressed = false;
    } else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


function checkForWallorPaddleCollision() {
    var isBallCollided = false;

    if(isTopWallCollision()) {
        dy = -dy;
        isBallCollided = true;
    } else if (isBottomWallCollision()) {
        if(isPaddleCollision()) {
            dy = -dy;
            dx += (dx > 0) ? 0.2 : -0.2;
            dy += (dy > 0) ? 0.2 : -0.2; 
        } else {
            resetOnCollisionWithBottomWall();
        }
    }

    if(isLeftOrRightWallCollision()) {
        dx = -dx;
        isBallCollided = true;
    }

    return isBallCollided;
}

function resetOnCollisionWithBottomWall() {
    lives--;
    if(!lives) {
        alert("GAME OVER");
        document.location.reload();
    }
    else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width-paddleWidth)/2;
    }
}

function isPaddleCollision() {
    return (x > paddleX && x < paddleX + paddleWidth);
}

function isTopWallCollision() {
    return (y + dy < ballRadius);
}

function isBottomWallCollision() {
    return (y + dy > canvas.height - ballRadius);
}

function isLeftOrRightWallCollision() {
    return (x + dx < ballRadius || x + dx > canvas.width - ballRadius);
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

function drawPaddle() {
    drawRect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight, paddleColor);
}

function drawCircle(xC, yC, radius, color) {
    // Draw an arc
    ctx.beginPath();
    ctx.arc(xC, yC, radius, 0, Math.PI*2, false);
    ctx.fillStyle= (color) ? color : "yellow";
    ctx.fill();
    ctx.closePath();
}

function drawRect(xC, yC, width, height, color) {
    // Draw an arc
    ctx.beginPath();
    ctx.rect(xC, yC, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}