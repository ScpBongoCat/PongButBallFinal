//Settin up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth - 15;
ctx.canvas.height = window.innerHeight - 21;

//DEFINE EVERYTHINNGGGG
let a = 10;
let x = canvas.width / 2 - 25;
let y = canvas.height / 2 - 25;
let vx = 0;
let vy = a;
let P1L = 400;
let P1H = canvas.height / 2 - P1L / 2;
let P2L = 400;
let P2H = canvas.height / 2 - P2L / 2;
let score = 0;

let bounceamount = 1;
let gamestart = false;

//Ball, Paddles, And Bounce
function update() {
  //Ball

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  x += vx;
  y += vy;
  ctx.fillRect(x, y, 50, 50);

  //Paddles

  ctx.fillRect(0, P1H, 40, P1L);
  ctx.fillRect(canvas.width - 40, P2H, 40, P2L);

  //Left Paddle

  if (x <= 40 && x >= 0 && y >= P1H - 40 && y <= P1H + P1L) {
    vx = a;
    ctx;
    P1H = Math.floor(Math.random() * (canvas.height - P1L - 40 - 40 + 1)) + 40;
    ctx.clearRect(0, 40, 40, 1110);

    score = score + 1;
    if (bounceamount < 2 && gamestart == true) {
      bounceamount = bounceamount + 1;
    }

    if (P1L > 100) {
      P1L = P1L - 10;
      a = a + 0.05;
    } else {
      a = a + 0.1;
    }
  }

  //Right Paddle

  if (
    x >= canvas.width - 80 &&
    x <= canvas.width &&
    y >= P2H - 40 &&
    y <= P2H + P2L
  ) {
    vx = -a;
    P2H = Math.floor(Math.random() * (canvas.height - P2L - 40 - 40 + 1)) + 40;
    ctx.clearRect(canvas.width - 40, 40, canvas.width, canvas.height - 40);

    score = score + 1;
    if (bounceamount < 2 && gamestart == true) {
      bounceamount = bounceamount + 1;
    }

    if (P2L > 100) {
      P2L = P2L - 10;
      a = a + 0.05;
    } else {
      a = a + 0.1;
    }
  }

  //Top & Bottom

  ctx.fillRect(0, 0, canvas.width, 40);

  ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

  if (y <= 0 + 40) {
    vy = a;
  }
  if (y >= canvas.height - 90) {
    vy = -a;
  }
  requestAnimationFrame(update);
}
update();

//Key Press Events
window.addEventListener("keydown", function (e) {
  //Restart!

  if (e.key == "r") {
    vy = a;
    vx = 0;
    x = canvas.width / 2 - 25;
    y = canvas.height / 2 - 25;
    P1L = 400;
    P1H = canvas.height / 2 - P1L / 2;
    P2L = 400;
    P2H = canvas.height / 2 - P2L / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gamestart = false;
    score = 0;
    a = 10;
    bounceamount = 1;
  }

  //Start Game

  if (e.key == "g" && gamestart == false) {
    vx = a;
    gamestart = true;
  }

  //Movement Up and Down

  if (e.key == "w" && bounceamount > 0) {
    vy = -a;
    if (gamestart == true) {
      bounceamount = bounceamount - 1;
    }
  }
  if (e.key == "s" && bounceamount > 0) {
    vy = a;
    if (gamestart == true) {
      bounceamount = bounceamount - 1;
    }
  }
});

//Text!
function text() {
  //Before Game Text

  if (gamestart == false) {
    ctx.textAlign = "center";
    ctx.font = "30px Arial";
    ctx.fillText("Press G to start the game!", canvas.width / 2, 80);
    ctx.fillText("Use W and S to move up and down!", canvas.width / 2, 120);
  }

  // During Game Text

  if (gamestart == true) {
    ctx.textAlign = "center";
    ctx.font = "30px Arial";
    ctx.fillText("Score:" + score, canvas.width / 2, 120);
    ctx.fillText("Press R to restart!", canvas.width / 2, 80);
    ctx.fillText(
      "Change Direction Amount:" + bounceamount,
      canvas.width / 2,
      canvas.height - 50
    );
  }

  //Game Over

  if (x < 0 || x > canvas.width) {
    ctx.textAlign = "center";
    ctx.font = "100px Arial";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  }
  requestAnimationFrame(text);
}
text();
