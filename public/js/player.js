//Liste von Characteren

const spriteWidth = 100
const spriteHeight = 100

let gameFrame = 0
let stagger = 0
const staggerFrame = 18
let index = 2
let size = 4


const characters = {
    Soldier: {
        run: { frames: 8, image: new Image() },
        attack: { frames: 6, image: new Image() },
        idle: { frames: 6, image: new Image() },
        hitbox: {
            offsetX: 154,
            offsetY: 143,
            width: (spriteWidth * size) - 314,
            height: (spriteHeight * size) - 304
        }
    },
    Orc: {
        run: { frames: 8, image: new Image() },
        attack: { frames: 6, image: new Image() },
        idle: { frames: 6, image: new Image() },
        hitbox: {
            offsetX: 160,
            offsetY: 150,
            width: (spriteWidth * size) - 315,
            height: (spriteHeight * size) - 313
        }
    }
}
//Sprite Bilder Routen
characters.Soldier.run.image.src = "assets/characters/Soldier/Soldier-Walk.png"
characters.Soldier.attack.image.src = "assets/characters/Soldier/Soldier-Attack01.png"
characters.Soldier.idle.image.src = "assets/characters/Soldier/Soldier-Idle.png"

characters.Orc.run.image.src = "assets/characters/Orc/Orc-Walk.png"
characters.Orc.attack.image.src = "assets/characters/Orc/Orc-Attack01.png"
characters.Orc.idle.image.src = "assets/characters/Orc/Orc-Idle.png"





function drawPlayer(ctx, animation, x, y) {

    if ((stagger % staggerFrame) === 0) {
        gameFrame++
    }

    const frameX = spriteWidth * (gameFrame % animation.frames)
    const frameY = spriteHeight * 0

    ctx.drawImage(

        animation.image,
        frameX,
        frameY,
        spriteWidth,
        spriteHeight,
        x,
        y,
        spriteWidth * size,
        spriteHeight * size
    )
    stagger++
}

//--------------------------Spieler logik------------------------
const keys = {}

window.addEventListener("keydown", e => keys[e.key] = true)
window.addEventListener("keyup", e => keys[e.key] = false)



class Player {
    constructor(characters, x, y, speed = 5, keys = {},) {
        this.characters = characters
        this.facingLeft = false
        this.state = "idle"
        this.x = x
        this.y = y
        this.speed = speed
        this.keys = keys
        this.moving = false

        this.width = spriteWidth * size;
        this.height = spriteHeight * size;


        this.attack = false
        this.canAttack = true

        this.colisionCounter = 0
        this.hasHit = false

        this.hp = 100
        this.displayedHP = 100

        this.hitbox = characters.hitbox

        // this.hitbox.characters = {
        //     offsetX: 160,
        //     offsetY: 157,
        //     width: (spriteWidth * size) - 334,
        //     height: (spriteHeight * size) - 328
        // }
    }

    movingPlayer() {
        this.moving = false

        if (keys[this.keys.left]) {
            this.x -= this.speed
            this.moving = true
            this.facingLeft = true
        }
        if (keys[this.keys.right]) {
            this.x += this.speed
            this.moving = true
            this.facingLeft = false
        }
        if (keys[this.keys.up]) {
            this.y -= this.speed
            this.moving = true
        }
        if (keys[this.keys.down]) {
            this.y += this.speed
            this.moving = true
        }

        if (this.moving) {
            this.state = "run"
        } else {
            this.state = "idle"
        }
    }

    attackPlayer() {
        if (this.canAttack && keys[this.keys.hit]) {

            this.attack = true;
            this.canAttack = false
            this.hasHit = false
            this.state = "attack";

            setTimeout(() => {
                this.attack = false
                this.state = "idle"
            }, 200)

            setTimeout(() => {
                this.canAttack = true
            }, 700)
        }

        if (this.attack) {
            this.state = "attack"
        }



    }

    checkCollision() {

        const hit = (this.x + this.hitbox.offsetX) < (playerTwo.x + playerTwo.hitbox.offsetX + playerTwo.hitbox.width) &&
            (this.x + this.hitbox.offsetX + this.hitbox.width) > (playerTwo.x + playerTwo.hitbox.offsetX) &&
            (this.y + this.hitbox.offsetY) < (playerTwo.y + playerTwo.hitbox.offsetY + playerTwo.hitbox.height) &&
            (this.y + this.hitbox.offsetY + this.hitbox.height) > (playerTwo.y + playerTwo.hitbox.offsetY)


        if (hit && this.attack && !this.hasHit) {
            this.colisionCounter++
            this.hp -= 10  //von dem spieler geht die HP Zahl runter nicht vom Gegner, wenn spieler HP = 0, dann 
            this.hasHit = true

            console.log("Collison:" + this.colisionCounter)
            console.log("ENEmy HP:" + this.hp)
        }
    }

    drawHitbox(ctx) {
        ctx.strokeStyle = "red"
        ctx.lineWidth = 2
        ctx.strokeRect(
            this.x + this.hitbox.offsetX,
            this.y + this.hitbox.offsetY,
            this.hitbox.width,
            this.hitbox.height
        )
    }

    drawHealthBar(ctx, x, y, hp, { bg, border, fill, text }) {
        //Hotbars vertauscht, so auch im restlichen code ansprechen
        const width = 600
        const height = 45

        ctx.fillStyle = bg
        ctx.fillRect(x, y, width, height)

        ctx.fillStyle = fill
        ctx.fillRect(x, y, width * (this.displayedHP / 100), height)

        ctx.strokeStyle = border
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, width, height)

        const speed = 0.1
        this.displayedHP += (this.hp - this.displayedHP) * speed

        ctx.fillStyle = "white"
        ctx.font = "20px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(text , x + width / 2, y + height / 2)
    }

    draw(ctx) {
        const animation = this.characters[this.state]
        drawPlayer(ctx, animation, this.x, this.y)
    }

}




