const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// PLAYER
let player = {
  x: 100,
  y: canvas.height - 150,
  width: 50,
  height: 50,
  velocityY: 0,
  gravity: 1,
  jump: -15
};

// SISTEMA
let coins = [];
let score = 0;
let obstacles = [];
let gameOver = false;
let gameSpeed = 6;

// CRIAR MOEDAS
// CRIAR MOEDAS
function spawnCoin() {
  coins.push({
    x: canvas.width,
    y: canvas.height - 120 - Math.random() * 100,
    size: 20
  });
} 
// ATUALIZAR JOGO
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // PLAYER FÍSICA
  player.velocityY += player.gravity;
  player.y += player.velocityY;

  if (player.y > canvas.height - 150) {
    player.y = canvas.height - 150;
    player.velocityY = 0;
  }

  // PLAYER DESENHO
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // MOEDAS
  ctx.fillStyle = "yellow";
  coins.forEach((coin, index) => {
  coin.x -= gameSpeed;
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
    ctx.fill();

    // COLISÃO
    if (
      player.x < coin.x + coin.size &&
      player.x + player.width > coin.x - coin.size &&
      player.y < coin.y + coin.size &&
      player.y + player.height > coin.y - coin.size
    ) {
      coins.splice(index, 1);
      score++;
    }

    // REMOVE MOEDA FORA DA TELA
    if (coin.x < 0) {
      coins.splice(index, 1);
    }
  });

  // HUD
  document.getElementById("hud").innerText = "Moedas: " + score;

  requestAnimationFrame(update);
}

update();

// PULAR TECLADO
document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    player.velocityY = player.jump;
  }
});

// PULAR TOQUE (TELA)
document.addEventListener("touchstart", () => {
  player.velocityY = player.jump;
});

// BOTÃO MOBILE
const jumpBtn = document.getElementById("jumpBtn");

jumpBtn.addEventListener("click", () => {
  player.velocityY = player.jump;
});

// RESPONSIVO
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
