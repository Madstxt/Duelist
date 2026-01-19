const canvas = document.getElementById("myCanvas")

const CANVAS_WIDTH = canvas.width = window.innerWidth
const CANVAS_HEIGHT = canvas.height = window.innerHeight

const ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

const bg = new Image()
bg.src = "assets/ui/Arena.png"

let gameOver = false


let playerOne = new Player(characters.Soldier, 400, 250, 2, { left: "a", right: "d", up: "w", down: "s", hit: "e" })

let playerTwo = new Player(characters.Orc, 1000, 250, 2, { left: "j", right: "l", up: "i", down: "k", hit: "o" })



function gameLoop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        ctx.drawImage(bg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)


        playerOne.movingPlayer()
        playerOne.attackPlayer()
        playerOne.checkCollision(playerTwo)
        playerTwo.drawHealthBar(ctx, 130, 50, playerTwo.hp, { bg: "rgba(0, 46, 142, 0.52)", border: "rgba(0, 46, 142, 1)", fill: "rgba(0, 46, 142, 1)", text: "Spieler 1" })
        playerOne.draw(ctx)

        playerTwo.movingPlayer()
        playerTwo.attackPlayer()
        playerTwo.checkCollision(playerOne)
        playerOne.drawHealthBar(ctx, 1150, 50, playerOne.hp, { bg: "rgba(137, 0, 0, 0.52)", border: "rgba(137, 0, 0, 1)", fill: "rgba(137, 0, 0, 1)", text: "Spieler 2" })

        playerTwo.draw(ctx)

        playerOne.drawHitbox(ctx)
        playerTwo.drawHitbox(ctx)

        checkWin()
    }

    requestAnimationFrame(gameLoop)
}

function checkWin() {
    if (playerTwo.hp <= 0) {
        gameOver = true
        alert("SPIELER 2 hat gewonnen")
    } else if (playerOne.hp <= 0) {
        gameOver = true
        alert("SPIELER 1 hat gewonnen")
    }
}

gameLoop()