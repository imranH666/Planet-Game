const playerElemet = document.querySelector("#player")
const btn = document.querySelector(".btn")
const btnBox = document.querySelector(".btn-box")
const gameOverBox = document.querySelector(".game-over")
const gameOverBtn = document.querySelector(".game-over button")
const music = document.querySelector(".music")
const body = document.querySelector("body")
const scoreElemet = document.querySelector("#score")
const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.width = 100
        this.height = 100
        // this.playerNumberCount = 1
        const image = new Image();
        image.src = "images/player.png"
        image.onload = () => {
            this.image = image
            this.position = {
                x: canvas.width / 2 - 100 / 2,
                y: canvas.height - 100,
            }
        }
    }
    draw() {
        if(this.image) {
            ctx.beginPath()
            ctx.fillStyle = "red"
            // ctx.arc(this.position.x + 50, this.position.y + 50, 40, 0, Math.PI * 2)
            ctx.drawImage(this.image, this.position.x, this.position.y, 100, 100)
            ctx.fill()
        }
    }
}

class Projectile {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 10
        this.color = "red"
        const image = new Image()
        image.src = "./images/projectile1.png"
        image.onload = () => {
            this.image = image
        }
    }
    draw() {
        ctx.save()
        ctx.beginPath()
        // ctx.fillStyle = this.color
        // ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(-0.7 + Math.atan2(this.velocity.y, this.velocity.x))
        ctx.drawImage(this.image, - 105, - 90, 100, 100)
        ctx.fill()
        ctx.restore()
    }
    update() {
        if(this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
}

class EnemyProjectile {
    constructor({position, enemyPrjectileVelocity, shootNumber}) {
        this.position = position
        this.velocity = enemyPrjectileVelocity
        this.radius = 20
        this.shootNumber = shootNumber
        let shootPNG = [
            "./images/astroid.png",
            "./images/planet2.png"
        ]
        const image = new Image()
        image.src = shootPNG[this.shootNumber > 10 ? 0 : this.shootNumber]
        image.onload = () => {
            this.image = image
        }
    }
    draw() {
        if(this.shootNumber > 10) {
            ctx.beginPath()
            ctx.fillStyle = "#ff00005e"
            ctx.arc(this.position.x + 15, this.position.y + 15, this.radius, 0, Math.PI * 2)
            ctx.drawImage(this.image, this.position.x, this.position.y, 30, 30)
            ctx.fill()
        }else {
            ctx.beginPath()
            ctx.fillStyle = "#ff00005e"
            // ctx.arc(this.position.x + 15, this.position.y + 15, this.radius, 0, Math.PI * 2)
            ctx.drawImage(this.image, this.position.x, this.position.y, 30, 30)
            ctx.fill()
        }
    }
    update() {
        if(this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
}

class Gan {
    constructor() {
        this.position = {
            x: canvas.width / 2,
            y: canvas.height - 50,
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = -1.5
        this.radius = 10
        this.opacity = 0
        this.color = "green"
        const image = new Image()
        image.src = "./images/gan2.png"
        image.onload = () => {
            this.image = image
        }
    }
    draw() {
        if(this.image) {
            ctx.save()
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
            ctx.translate(this.position.x, this.position.y)
            ctx.rotate(this.rotation + Math.atan2(this.velocity.y, this.velocity.x))
            ctx.drawImage(this.image, -40, 0, 80, 100)
            ctx.fill()
            ctx.restore()
        }
    }
    update(velocity) {
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }
    }
}

class Enemy {
    constructor({position, size, planetNumber, shootVelocity}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 2,
        }
        this.size = size
        this.radius = 50
        this.planetNumber = planetNumber
        this.shootVelocity = shootVelocity
        this.color = "#ff000071"
        this.hitCount = 1
        const planetStore = [
            "./images/g-planet1.png",
            "./images/g-planet2.png",
            "./images/g-planet3.png",
            "./images/g-planet4.png",
            "./images/g-planet5.png",
            "./images/g-planet6.png",
            "./images/g-planet7.png",
            "./images/g-planet8.png",
            // "./images/aircraft1.png",
        ]
        const image = new Image()
        image.src = planetStore[this.planetNumber]
        image.onload = () => {
            this.image = image
            this.width = 500 * this.size
            this.height = 500 * this.size
            
        }
    }
    draw() {
        ctx.save()
        ctx.beginPath()
        // ctx.fillStyle = this.color
        // ctx.arc(this.position.x + this.width / 2, this.position.y + this.height / 2, this.width * 0.4, 0, Math.PI * 2)
        ctx.drawImage(this.image, this.position.x , this.position.y, this.width, this.height)
        ctx.fill()
        ctx.restore()
    }
    update() {
        if(this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
    shoot(shoots) {
        shoots.push(new EnemyProjectile({
            position: {
                x: this.position.x + this.width/2,
                y: this.position.y + this.height,
            },
            enemyPrjectileVelocity: {
                x: this.shootVelocity.x,
                y: this.shootVelocity.y
            },
            shootNumber: 0,
        }))
    }
}

class Aircraft {
    constructor({position, size, planetNumber, shootVelocity}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 2,
        }
        this.size = size
        this.planetNumber = planetNumber
        this.shootVelocity = shootVelocity
        this.color = "#ff000071"
        this.hitCount = 1
        const planetStore = [
            "./images/aircraft1.png",
            "./images/aircraft3.png",
            "./images/aircraft5.png",
            "./images/aircraft2.png",
            "./images/aircraft6.png",
            "./images/aircraft7.png",
        ]
        const image = new Image()
        image.src = planetStore[this.planetNumber]
        image.onload = () => {
            this.image = image
            this.width = 500 * this.size
            this.height = 500 * this.size
        }
    }
    draw() {
        const aircraftRotation = [-1.7, -1.5, -3.1, 0.8, -3.1, -2.5]
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.color
        // ctx.arc(this.position.x + this.width / 2, this.position.y + this.height / 2, this.width * 0.4, 0, Math.PI * 2)
        if(this.planetNumber === 0) {
            ctx.translate(this.position.x + (this.width/2), this.position.y + (this.height))
            ctx.rotate(aircraftRotation[0])
            ctx.drawImage(this.image, 0, -this.width/2.5, this.width, this.height)

        }else if (this.planetNumber === 1) {
            ctx.translate(this.position.x + (this.width/2), this.position.y + (this.height+20))
            ctx.rotate(aircraftRotation[1])
            ctx.drawImage(this.image, 0, -this.height/2, this.width, this.height)

        }else if (this.planetNumber === 2) {
            ctx.translate(this.position.x + this.width, this.position.y + this.height)
            ctx.rotate(aircraftRotation[2])
            ctx.drawImage(this.image, 0, 0, this.width, this.height)

        }else if (this.planetNumber === 3) {
            ctx.translate(this.position.x + (this.width/2), this.position.y + (this.height+this.height/5))
            ctx.rotate(aircraftRotation[3])
            ctx.drawImage(this.image, -this.width, -this.height, this.width, this.height)

        }else if (this.planetNumber === 4) {
            ctx.translate(this.position.x + this.width, this.position.y + this.height)
            ctx.rotate(aircraftRotation[2])
            ctx.drawImage(this.image, 0, 0, this.width, this.height)

        }else if (this.planetNumber === 5) {
            ctx.translate(this.position.x + this.width, this.position.y + (this.height+40))
            ctx.rotate(aircraftRotation[5])
            ctx.drawImage(this.image, this.width/2, -this.height/9, this.width, this.height)
        }
        ctx.fill()
        ctx.restore()
    }
    update() {
        if(this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
    shoot(shoots) {
        shoots.push(new EnemyProjectile({
            position: {
                x: this.position.x + this.width/2,
                y: this.position.y + this.height,
            },
            enemyPrjectileVelocity: {
                x: this.shootVelocity.x,
                y: this.shootVelocity.y
            },
            shootNumber: 1,
        }))
    }
}

class AlienSpace {
    constructor({position, size, planetNumber, shootVelocity}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 2,
        }
        this.size = size
        this.radius = 50
        this.planetNumber = planetNumber
        this.shootVelocity = shootVelocity
        this.color = "#ff000071"
        this.hitCount = 1
        const planetStore = [
            "./images/a1.png",
            "./images/a2.png",
            "./images/a3.png",
            "./images/a4.png",
            "./images/a5.png",
            "./images/a6.png",
        ]
        const image = new Image()
        image.src = planetStore[this.planetNumber]
        image.onload = () => {
            this.image = image
            this.width = 500 * this.size
            this.height = 500 * this.size
            
        }
    }
    draw() {
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.color
        // ctx.arc(this.position.x + this.width / 2, this.position.y + this.height / 2, this.width * 0.4, 0, Math.PI * 2)
        ctx.drawImage(this.image, this.position.x , this.position.y, this.width, this.height)
        ctx.fill()
        ctx.restore()
    }
    update() {
        if(this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
    shoot(shoots) {
        shoots.push(new EnemyProjectile({
            position: {
                x: this.position.x + this.width/2,
                y: this.position.y + this.height,
            },
            enemyPrjectileVelocity: {
                x: this.shootVelocity.x,
                y: this.shootVelocity.y
            },
            shootNumber: 20,
        }))
    }
}

class Devil {
    constructor({position, size, planetNumber, shootVelocity}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 2,
        }
        this.size = size
        this.radius = 50
        this.planetNumber = planetNumber
        this.shootVelocity = shootVelocity
        this.color = "#ff000071"
        this.hitCount = 0
        const planetStore = [
            "./images/devil1.png",
        ]
        const image = new Image()
        image.src = planetStore[this.planetNumber]
        image.onload = () => {
            this.image = image
            this.width = 500 * this.size
            this.height = 500 * this.size
        }
    }
    draw() {
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = this.color
        // ctx.arc(this.position.x, this.position.y, this.width * 0.4, 0, Math.PI * 2)
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(-1.5 + (Math.atan2(this.shootVelocity.y, this.shootVelocity.x)));
        ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height)
        ctx.fill()
        ctx.restore()
    }
    update() {
        if(this.image) {
            this.draw()
            this.position.x += this.shootVelocity.x
            this.position.y += this.shootVelocity.y
        }
    }
}

class BackgroundImages {
    constructor({position, velocity, width, height, bgNumber}) {
        this.velocity = velocity
        this.position = position
        this.bgNumber = bgNumber
        let backgroundImageStore = [
            "./images/bg3.png",
            "./images/bg4.png",
            "./images/cloud.png",
            "./images/galaxy1.png",
            "./images/galaxy2.png",
            "./images/galaxy3.png",
        ]
        const image = new Image()
        image.src = backgroundImageStore[this.bgNumber]
        image.onload = () => {
            this.image = image
            
            this.width = width
            this.height = height
        }
    }
    draw() {
        ctx.fillStyle = "red"
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        if(this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
}

class Particle {
    constructor({position, velocity, radius, width, height, png, fades}) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.width = width
        this.height = height
        this.opacity = 1
        this.png = png
        this.fades = fades
        const particlePNG = [
            "./images/particle.png", 
            "./images/astroid.png", 
            "./images/devil1.png", 
            "./images/planet2.png",
            "./images/planet3.png"
        ]
        const image = new Image()
        image.src = particlePNG[this.png]
        image.onload = () => {
            this.image = image
        }
    }
    draw() {
        ctx.save()
        ctx.beginPath()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = "red"
        // ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        ctx.fill()
        ctx.restore()
    }
    update() {
        if(this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            if(this.fades) {
                this.opacity -= 0.01
            }
        }
    }
}

const player = new Player()
const gan = new Gan()
let projectiles = []
let enemies = []
let particles = []
let backgroundImages = []
let shootsStore = []
let devils = []
let aircrafts = []
let alienSpaces = []
let ships = []
let frems = 0
let gameOver = true
let attackCount = 15
let totalScore = 0
let checkGameOver = false


function animate() {
    if(!gameOver) return
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    if(checkGameOver) {
        attackCount--
        playerElemet.textContent = attackCount
    }
    if(attackCount <= 0) {
        gameOver = false
        gameOverBox.style.display = "block"
    }
    
    backgroundImages.forEach((backgroundImage, backgroundImageIndex) => {
        // console.log(backgroundImage.position.y - 200 >= canvas.height)
        if(backgroundImage.position.y - 200 >= canvas.height) {
            setTimeout(() => {
                backgroundImages.splice(backgroundImageIndex, 1)
            }, 0)
            
        }else {
            backgroundImage.update()
        }
        
    })

    particles.forEach((particle, particleIndex) => {
        if(particle.opacity <= 0) {
            particles.splice(particleIndex, 1)
        }else {
            particle.update()
        }
    })

    ships.forEach((ship) => {
        ship.update()
    })

    alienSpaces.forEach((alienSpace, alienSpaceIndex) => {
        if(alienSpace.position.y - 300 >= canvas.height) {
            alienSpaces.splice(alienSpaceIndex, 1)
        }else {
            alienSpace.update()
            if (alienSpace.position.y === -50) {
                if(totalScore > 10000) {
                    alienSpace.shoot(shootsStore)
                    setTimeout(() => {
                        alienSpace.shoot(shootsStore)
                    }, 500)
                    setTimeout(() => {
                        alienSpace.shoot(shootsStore)
                    }, 1000)
                    setTimeout(() => {
                        alienSpace.shoot(shootsStore)
                    }, 1500)
                    setTimeout(() => {
                        alienSpace.shoot(shootsStore)
                    }, 2000)
                }else if(totalScore > 7000) {
                    alienSpace.shoot(shootsStore)
                    setTimeout(() => {
                        alienSpace.shoot(shootsStore)
                    }, 500)
                    setTimeout(() => {
                        alienSpace.shoot(shootsStore)
                    }, 1000)
                    setTimeout(() => {
                        alienSpace.shoot(shootsStore)
                    }, 1500)
                }else if (totalScore > 5000) {
                    alienSpace.shoot(shootsStore)
                    setTimeout(() => {
                        alienSpace.shoot(shootsStore)
                    }, 500)
                    setTimeout(() => {
                        alienSpace.shoot(shootsStore)
                    }, 1000)
                }else {
                    alienSpace.shoot(shootsStore)
                }
            }
        }

        if (
            alienSpace.position.x + alienSpace.width >= player.position.x &&
            alienSpace.position.y + alienSpace.height >= player.position.y &&
            alienSpace.position.x <= player.position.x + player.width
        ) {
            checkGameOver = true
            setTimeout(() => {
                checkGameOver = false
            }, 2)
        }
    })

    aircrafts.forEach((aircraft, aircraftIndex) => {
        if(aircraft.position.y - 300 >= canvas.height) {
            aircrafts.splice(aircraftIndex, 1)
        }else {
            aircraft.update()
            if (aircraft.position.y === -50) {
                aircraft.shoot(shootsStore);
            }
        }

        if (
            aircraft.position.x + aircraft.width >= player.position.x &&
            aircraft.position.y + aircraft.height >= player.position.y &&
            aircraft.position.x <= player.position.x + player.width
        ) {
            checkGameOver = true
            setTimeout(() => {
                checkGameOver = false
            }, 2)
        }
    })

    shootsStore.forEach((shoot, shootIndex) => {
        const dist = Math.hypot((player.position.x + 50) - shoot.position.x, (player.position.y + 50) - shoot.position.y)
        if(dist - 40 - shoot.radius < 1) {
            checkGameOver = true
            setTimeout(() => {
                checkGameOver = false
            }, 2)
        }
        
        // shoot and projectiles calculate
        projectiles.forEach((projectile, particleIndex) => {
            const dist = Math.hypot(shoot.position.x - projectile.position.x, shoot.position.y - projectile.position.y)
            if(dist - projectile.radius - shoot.radius < 1) {
                shootsStore.splice(shootIndex, 1)
                projectiles.splice(particleIndex, 1)
                totalScore += 5
                scoreElemet.textContent = totalScore

                for(let i = 1; i <= 6; i++) {
                    particles.push(new Particle({
                        position: {
                            x: projectile.position.x, 
                            y: projectile.position.y
                        }, 
                        velocity: {
                            x: (Math.random() - 0.5) * 2, 
                            y: (Math.random() - 0.5) * 2
                        }, 
                        radius: 10,
                        width: Math.random() * 15 + 5,
                        height: Math.random() * 15 + 5,
                        png: 1,
                        fades: true
                    }))
                }
            }
        })
        shoot.update()
    })

    projectiles.forEach((projectile, projectileIndex) => {
        if(projectile.position.y <= 0 || projectile.position.x <= 0 || projectile.position.x >= canvas.width) {
            projectiles.splice(projectileIndex, 1)
        }else {
            projectile.update()
            gan.update(projectile.velocity)
        }

        enemies.forEach((enemy, enemyIndex) => {            
            const dist = Math.hypot((enemy.position.x + enemy.width / 2) - projectile.position.x, (enemy.position.y + enemy.height / 2) - projectile.position.y);
            if (dist - (enemy.width * 0.4) - projectile.radius < 1) {
                if(Math.floor(enemy.width * 0.4) >= 70 && Math.floor(enemy.width * 0.4) <= 200) {
                    if(enemy.hitCount >= 3) {
                        enemies.splice(enemyIndex, 1)

                        totalScore += 30
                        scoreElemet.textContent = totalScore
                    }else {
                        enemy.hitCount++
                    }
                }else if(Math.floor(enemy.width * 0.4) >= 50 && Math.floor(enemy.width * 0.4) <= 69) {
                    if(enemy.hitCount >= 2) {
                        enemies.splice(enemyIndex, 1)

                        totalScore += 20
                        scoreElemet.textContent = totalScore
                    }else {
                        enemy.hitCount++
                    }
                }else {
                    enemies.splice(enemyIndex, 1)

                    totalScore += 10
                    scoreElemet.textContent = totalScore
                }
                
                projectiles.splice(projectileIndex, 1)

                

                for(let i = 1; i <= Math.floor(enemy.width * 0.4) / 2; i++) {
                    particles.push(new Particle({
                        position: {
                            x: projectile.position.x, 
                            y: projectile.position.y
                        }, 
                        velocity: {
                            x: (Math.random() - 0.5) * 4, 
                            y: (Math.random() - 0.5) * 4
                        }, 
                        radius: 10,
                        width: Math.random() * 35 + 10,
                        height: Math.random() * 35 + 10,
                        png: 0,
                        fades: true
                    }))
                }
            }
        })

        aircrafts.forEach((aircraft, aircraftIndex) => {
            const dist = Math.hypot((aircraft.position.x + aircraft.width/2) - projectile.position.x, (aircraft.position.y + aircraft.height/2) - projectile.position.y)
            if(dist - (Math.round(aircraft.width * 0.4)) - projectile.radius < 1) {
                if(Math.floor(aircraft.width * 0.4) >= 70 && Math.floor(aircraft.width * 0.4) <= 200) {
                    if(aircraft.hitCount >= 5) {
                        aircrafts.splice(aircraftIndex, 1)

                        totalScore += 30
                        scoreElemet.textContent = totalScore
                    }else {
                        aircraft.hitCount++
                    }
                }else if(Math.floor(aircraft.width * 0.4) >= 50 && Math.floor(aircraft.width * 0.4) <= 69) {
                    if(aircraft.hitCount >= 3) {
                        aircrafts.splice(aircraftIndex, 1)

                        totalScore += 20
                        scoreElemet.textContent = totalScore
                    }else {
                        aircraft.hitCount++
                    }
                }else {
                    aircrafts.splice(aircraftIndex, 1)

                    totalScore += 10
                    scoreElemet.textContent = totalScore
                }
             
                projectiles.splice(projectileIndex, 1)
    
                for(let i = 1; i <= Math.round(aircraft.width/2); i++) {
                    particles.push(new Particle({
                        position: {
                            x: projectile.position.x, 
                            y: projectile.position.y
                        }, 
                        velocity: {
                            x: (Math.random() - 0.5) * 2, 
                            y: (Math.random() - 0.5) * 2
                        }, 
                        radius: 10,
                        width: Math.random() * 15 + 5,
                        height: Math.random() * 15 + 5,
                        png: 3,
                        fades: true
                    }))
                }
            }
        })

        alienSpaces.forEach((alienSpace, alienSpaceIndex) => {
            const dist = Math.hypot((alienSpace.position.x + alienSpace.width/2) - projectile.position.x, (alienSpace.position.y + alienSpace.height/2) - projectile.position.y)
            if(dist - (Math.round(alienSpace.width * 0.4)) - projectile.radius < 1) {
                if(Math.floor(alienSpace.width * 0.4) >= 70 && Math.floor(alienSpace.width * 0.4) <= 200) {
                    if(alienSpace.hitCount >= 5) {
                        alienSpaces.splice(alienSpaceIndex, 1)
                    }else {
                        alienSpace.hitCount++
                    }
                }else if(Math.floor(alienSpace.width * 0.4) >= 50 && Math.floor(alienSpace.width * 0.4) <= 69) {
                    if(alienSpace.hitCount >= 3) {
                        alienSpaces.splice(alienSpaceIndex, 1)
                    }else {
                        alienSpace.hitCount++
                    }
                }else {
                    alienSpaces.splice(alienSpaceIndex, 1)
                }

                projectiles.splice(projectileIndex, 1)

                totalScore += 20
                scoreElemet.textContent = totalScore

                for(let i = 1; i <= 30; i++) {
                    particles.push(new Particle({
                        position: {
                            x: projectile.position.x, 
                            y: projectile.position.y
                        }, 
                        velocity: {
                            x: (Math.random() - 0.5) * 4, 
                            y: (Math.random() - 0.5) * 4
                        }, 
                        radius: 10,
                        width: Math.random() * 20 + 5,
                        height: Math.random() * 20 + 5,
                        png: 4,
                        fades: true
                    }))
                }
            }
        })
    })

    enemies.forEach((enemy, enemyIndex) => {
        if (
            enemy.position.x + enemy.width >= player.position.x &&
            enemy.position.y + enemy.height >= player.position.y &&
            enemy.position.x <= player.position.x + player.width
        ) {
            checkGameOver = true
            setTimeout(() => {
                checkGameOver = false
            }, 2)
        }

        if(enemy.position.y - 500 >= canvas.height) {
            enemies.splice(enemyIndex, 1);
        }else {
            enemy.update();
            if(totalScore > 500) {
                if (enemy.position.y === -50) {
                    if(totalScore >= 1000) {
                        enemy.shoot(shootsStore);
                        setTimeout(() => {
                            enemy.shoot(shootsStore);
                        }, 1000)
                    }else {
                        enemy.shoot(shootsStore);
                    }
                }
            }
        }
    });

    devils.forEach((devil, devilIndex) => {
        devil.update()
        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(devil.position.x - projectile.position.x, devil.position.y - projectile.position.y)
            if(dist - devil.radius - projectile.radius < 1) {
                if(devil.hitCount > 5) {
                    devils.splice(devilIndex, 1)

                    totalScore += 50
                    scoreElemet.textContent = totalScore

                    attackCount += attackCount < 15 ? 1 : 0
                    playerElemet.textContent = attackCount

                    for(let i = 1; i <= 30; i++) {
                        particles.push(new Particle({
                            position: {
                                x: projectile.position.x, 
                                y: projectile.position.y
                            }, 
                            velocity: {
                                x: (Math.random() - 0.5) * 4, 
                                y: (Math.random() - 0.5) * 4
                            }, 
                            radius: 10,
                            width: Math.random() * 35 + 10,
                            height: Math.random() * 35 + 10,
                            png: 2,
                            fades: true
                        }))
                    }
                }else {
                    devil.hitCount++
                }
                projectiles.splice(projectileIndex, 1)
            }
        })

        const dist = Math.hypot(devil.position.x - (player.position.x + 50), devil.position.y - (player.position.y + 50))
        if(dist - devil.radius - player.width < 1) {
            checkGameOver = true
            setTimeout(() => {
                checkGameOver = false
            }, 50)
        }
    })

    gan.draw()
    player.draw()

    if(totalScore >= 200) {
        if(frems % 1000 === 0) {
            const position = {
                x: Math.random() * canvas.width - 50,
                y: -200
            }
            const size = Math.random() * 0.3 + 0.1
            const planetNumber = 0
            const angle = Math.atan2((canvas.height - 50) - position.y, (canvas.width / 2 - 20) - position.x)
            const shootVelocity = {
                x: Math.cos(angle) * 2,
                y: Math.sin(angle) * 2
            }
            devils.push(new Devil({position, size, planetNumber, shootVelocity}))
        }
    }

    if(totalScore >= 0 && totalScore <= 3000) {
        if(frems % 100 === 0) {
            const position = {
                x: Math.random() * canvas.width - 50,
                y: -200
            }
            const size = Math.random() * 0.3 + 0.1
            const planetNumber = Math.round(Math.random() * 7)
            const angle = Math.atan2((canvas.height - 50) - position.y, (canvas.width / 2 - 50) - position.x)
            const shootVelocity = {
                x: Math.cos(angle) * 2,
                y: Math.sin(angle) * 2
            }
            enemies.push(new Enemy({position, size, planetNumber, shootVelocity}))
        }

    }else if (totalScore >= 3001 && totalScore <= 5000) {
        if(frems % 70 === 0) {
            const position = {
                x: Math.random() * canvas.width - 50,
                y: -200
            }
            const size = Math.random() * 0.5 + 0.1
            const planetNumber = Math.round(Math.random() * 5)
            const angle = Math.atan2((canvas.height - 50) - position.y, (canvas.width / 2 - 50) - position.x)
            const shootVelocity = {
                x: Math.cos(angle) * 2,
                y: Math.sin(angle) * 2
            }
            aircrafts.push(new Aircraft({position, size, planetNumber, shootVelocity}))
        }

    }else if (totalScore >= 5001 && totalScore <= 7000) {
        if(frems % 60 === 0) {
            const position = {
                x: Math.random() * canvas.width - 50,
                y: -200
            }
            const size = Math.random() * 0.3 + 0.1
            const planetNumber = Math.round(Math.random() * 5)
            const angle = Math.atan2((canvas.height - 50) - position.y, (canvas.width / 2 - 50) - position.x)
            const shootVelocity = {
                x: Math.cos(angle) * 2,
                y: Math.sin(angle) * 2
            }
            alienSpaces.push(new AlienSpace({position, size, planetNumber, shootVelocity}))
        }

    }else if (totalScore >= 7001 && totalScore <= 10000) {
        if(frems % 40 === 0) {
            const position = {
                x: Math.random() * canvas.width - 50,
                y: -200
            }
            const size = Math.random() * 0.3 + 0.1
            const planetNumber = Math.round(Math.random() * 5)
            const angle = Math.atan2((canvas.height - 50) - position.y, (canvas.width / 2 - 50) - position.x)
            const shootVelocity = {
                x: Math.cos(angle) * 2,
                y: Math.sin(angle) * 2
            }
            alienSpaces.push(new AlienSpace({position, size, planetNumber, shootVelocity}))
        }

    }else {
        if(frems % 30 === 0) {
            const position = {
                x: Math.random() * canvas.width - 50,
                y: -200
            }
            const size = Math.random() * 0.3 + 0.1
            const planetNumber = Math.round(Math.random() * 5)
            const angle = Math.atan2((canvas.height - 50) - position.y, (canvas.width / 2 - 50) - position.x)
            const shootVelocity = {
                x: Math.cos(angle) * 2,
                y: Math.sin(angle) * 2
            }
            alienSpaces.push(new AlienSpace({position, size, planetNumber, shootVelocity}))
        }
    }
    
    if(frems % 100 === 0) {
        if(totalScore >= 0 && totalScore <= 1000) {
            backgroundImages.push(new BackgroundImages({
                position: {
                    x: Math.random() * canvas.width - 50,
                    y: -400,
                },
                velocity: {
                    x: 0,
                    y: 0.5
                },
                width: 100,
                height: 400,
                bgNumber: 0
            }))

        }else if (totalScore >= 1001 && totalScore <= 2000) {
            backgroundImages.push(new BackgroundImages({
                position: {
                    x: Math.random() * canvas.width - 50,
                    y: -400,
                },
                velocity: {
                    x: 0,
                    y: 0.5
                },
                width: 100,
                height: 400,
                bgNumber: Math.round(Math.random() * 1)
            }))
            
        }else if (totalScore >= 2001 && totalScore <= 3000) {
            backgroundImages.push(new BackgroundImages({
                position: {
                    x: Math.random() * canvas.width - 50,
                    y: -400,
                },
                velocity: {
                    x: 0,
                    y: 0.5
                },
                width: 100,
                height: 400,
                bgNumber: 1
            }))
            
        }else if (totalScore >= 3001 && totalScore <= 5000) {
            backgroundImages.push(new BackgroundImages({
                position: {
                    x: Math.random() * canvas.width - 50,
                    y: -400,
                },
                velocity: {
                    x: 0,
                    y: 0.5
                },
                width: 400,
                height: 200,
                bgNumber: 2
            }))
            body.style.background = "#fff"

        }else {
            backgroundImages.push(new BackgroundImages({
                position: {
                    x: Math.random() * canvas.width - 50,
                    y: -400,
                },
                velocity: {
                    x: 0,
                    y: 0.5
                },
                width: 100,
                height: 100,
                bgNumber: Math.round(Math.random() * 3 + 2)
            }))
            body.style.background = "black"
        }
    }
    frems++
}

window.addEventListener("click", (e) => {
    const angle = Math.atan2(e.clientY - (canvas.height - 50), e.clientX - (canvas.width / 2))
    const position = {
        x: canvas.width / 2,
        y: canvas.height - 50,
    }
    const velocity = {
        x: Math.cos(angle) * 15,
        y: Math.sin(angle) * 15,
    }
    projectiles.push(new Projectile({position, velocity}))
})

btn.addEventListener("click", () => {
    btnBox.style.display = 'none'
    music.play()
    animate()
})

gameOverBtn.addEventListener("click", () => {
    location.reload()
    gameOverBox.style.display = "none"
})