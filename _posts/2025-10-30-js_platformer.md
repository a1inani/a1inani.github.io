---
layout: post
title: JavaScript Game Development 1 - Platformer Basics
date: 2025-10-30
description: Building a first 2D platformer with JavaScript and HTML5 Canvas
tags: JavaScript HTML5-Canvas Game-Development
categories: Game-Development
---

I decided to pause the AthenaEnv path for a while and focus on fundamentals. This short series documents my attempt to learn game development in plain JavaScript with HTML5 Canvas, without frameworks.

## What I am building first

Goal: Create a simple 2D platformer where the player can move and jump.

Topics Covered:

- Setting up HTML/CSS/JS structure
- Drawing with the Canvas API
- Game loop using requestAnimationFrame()
- Keyboard input handling
- Gravity, jumping, and collision detection

Outcome: You'll have a green box that jumps across platforms and reaches a goal.

## Code

index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First JS Game</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <canvas id="gameCanvas" width="800" height="400"></canvas>
    <script src="game.js"></script>
  </body>
</html>
```

style.css

```css
body {
  margin: 0;
  overflow: hidden;
  background: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

canvas {
  border: 2px solid white;
  background-color: black;
}
```

game.js

```javascript
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let goal = { x: 700, y: 130, width: 30, height: 30, color: "gold" };

let player = {
  x: 50,
  y: 300,
  width: 50,
  height: 50,
  color: "lime",
  dy: 0,
  gravity: 0.6,
  jumpPower: -12,
  grounded: false,
};

let keys = {};

document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

let gameWon = false;

function update() {
  if (gameWon) return;

  if (keys["KeyA"] && player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }

  if (keys["ArrowRight"]) player.x += 5;
  if (keys["ArrowLeft"]) player.x -= 5;

  player.dy += player.gravity;
  player.y += player.dy;

  checkCollisions();

  if (player.x < goal.x + goal.width && player.x + player.width > goal.x && player.y < goal.y + goal.height && player.y + player.height > goal.y) {
    gameWon = true;
    alert("You win!");
    document.location.reload();
  }

  draw();
  requestAnimationFrame(update);
}

let platforms = [
  { x: 0, y: 350, width: 800, height: 50, color: "gray" },
  { x: 200, y: 250, width: 250, height: 20, color: "gray" },
  { x: 500, y: 180, width: 100, height: 20, color: "gray" },
];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of platforms) {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.width, p.height);
  }

  ctx.fillStyle = goal.color;
  ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function checkCollisions() {
  player.grounded = false;
  for (let p of platforms) {
    if (player.x < p.x + p.width && player.x + player.width > p.x && player.y + player.height > p.y && player.y + player.height < p.y + p.height) {
      player.y = p.y - player.height;
      player.dy = 0;
      player.grounded = true;
    }
  }
}

update();
```

## Running it locally

1. Save the three files (`index.html`, `style.css`, `game.js`) in one folder.
2. Open `index.html` in a browser.
3. Move with left and right arrows.
4. Press `A` to jump.

## What I learned

- The game loop is the backbone of everything.
- Collision logic looks simple, but edge cases appear quickly.
- Small constants (gravity, jump force, speed) heavily affect game feel.

## Next Steps

- Replace `alert()` + page reload with an in-canvas win state UI
- Add restart and pause controls
- Improve collision detection to handle side hits and platform edges better
- Add camera movement and a larger level
- Add collectible items and a basic score system
