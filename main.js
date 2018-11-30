var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x = 200, y = 100;
var dx = 10, dy = -5;
var paddleWidth = 60, paddleHeight = 10, paddleSpeed = 40;
var ballRadius = 10;
var timeRepeatInterval = 80;
var paddleX = (canvas.width - paddleWidth) / 2
var rightPressed = false, leftPressed = false;
var brickColCount=3, brickRowCount=5;
var brickWidth=70, brickHeight= 20, brickMargin= 10;
var brickOffsetLeft=5, brickOffsetTop=5;
var score =0, lives=3;

var bricks= [];
for(c=0;c<brickColCount; c++){
  bricks[c]=[];
  for(r=0;r<brickRowCount;r++){
    bricks[c][r]={x:0,y:0, status:1}
  }
}

document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("mousemove", mouseMoveHandler);

function drawBricks(){
  for (c=0;c<brickColCount;c++)
    for(r=0;r<brickRowCount;r++){
      if(bricks[c][r].status==1){
        var brickX =r*(brickWidth+brickMargin)+brickOffsetLeft;
        var brickY =c*(brickHeight+brickMargin)+brickOffsetTop;
        bricks[c][r].x=brickX;
        bricks[c][r].y=brickY;
        ctx.beginPath();
        ctx.rect(brickX ,brickY, brickWidth, brickHeight);
        ctx.fillStyle= 'blue';
        ctx.fill();
        ctx.closePath();
      }
    }
}
function keyUpHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  }
}
function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 39) {
    rightPressed = true;
  }
}
function mouseMoveHandler(e){
  var relativeMouseX = e.clientX - canvas.offsetLeft;
  if(relativeMouseX> paddleWidth/2 && relativeMouseX<canvas.width - paddleWidth/2){
    paddleX = relativeMouseX - paddleWidth/2;
  }
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}
function collisionDetection(){
  for(c=0;c<brickColCount;c++){
    for(r=0;r<brickRowCount;r++){
      if(bricks[c][r].status==1){
        var b=bricks[c][r];
        if( x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
          bricks[c][r].status=0;
          dy=-dy;
          score++;
        }
      }
    }
  }
}
function dispScore(){
  ctx.font="18px Arial";
  ctx.fillStyle='red';
  ctx.fillText("Score:" + score, 10,20);
}
function dispLives(){
  ctx.font="18px Arial";
  ctx.fillStyle='red';
  ctx.fillText("Lives:" + lives, 100,20);
}
function checkWin(){
  if(score== brickRowCount * brickColCount){
    alert("YOU WIN");
    var checkContinue = prompt("Do you wish to continue? (Y/n)");
    if (checkContinue=="Y" || checkContinue == "y")
      document.location.reload();
    else {
      throw "Thanks for playing!"
    }
    document.location.reload();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  dispScore();
  dispLives();
  checkWin();

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy + ballRadius > canvas.height) {
    if (x < paddleX + paddleWidth && x > paddleX) {
      dy = -dy;
    } else {
      lives--;
      if(lives<0){
        alert("GAME OVER");
        var continueGame = prompt("Do you wish to continue? (Y/n)");
        if (continueGame=="Y" || continueGame == "y")
          document.location.reload();
        else {
          throw "Thanks for playing!"
        }
      }
      else{
        x=200;
        y=200;
        dx=10;
        dy=-5;
        paddleX= (canvas.width-paddleWidth)/2;
      }
    }
  }
  if (x + dx < ballRadius || x + dx + ballRadius > canvas.width) {
    dx = -dx;

  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  }
  if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed;
  }
  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

draw();
