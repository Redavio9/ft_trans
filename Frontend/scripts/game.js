// select canvas 
export function gameScript() {
    const canvas = document.querySelector('#pong')

    const context = canvas.getContext('2d')

    let gameStarted = false

    let playerDir = 'right'

    // open socket connection

    // handle the player direction from the server
    function handlePlayerDir(dir) {
        playerDir = dir
        console.log('Player dir: ', playerDir)
    }

    function updateGame(data) {
        RightPlayer = data.RightPlayer
        LeftPlayer = data.LeftPlayer
        Ball = data.Ball
        console.log('RightPlayer: ', RightPlayer)
        console.log('LeftPlayer: ', LeftPlayer)
        console.log('Ball: ', Ball)
    }

    // define game constants
    // game
    let WINNING_SCORE = 3
    let FPS = 60

    // ball
    let BALL_START_SPEED = 1
    let BALL_MAX_SPEED = 10
    let SPEED = .1
    let BALL_RADIUS = 10

    // player 
    let PLAYER_COLOR = '#508C9B'
    let PLAYER_WIDTH = 15
    let PLAYER_HEIGHT = 150

    // AI
    let AI_LEVEL = 0.1

    // Net
    let NET_SPACE = 5


    // Game Objects
    const Net = {
        x: canvas.width / 2 - 1,
        y: 0,
        width: 2,
        height: 10,
        color: '#201E43'
    }

    let Ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        speed: 1.00,
        velocityX: 5,
        velocityY: 5,
        color: '#EEEEEE'
    }

    let RightPlayer = {
        x: 0,
        y: canvas.height / 2 - PLAYER_HEIGHT / 2,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        color: PLAYER_COLOR,
        score: 0,
    }

    let LeftPlayer = {
        x: canvas.width - PLAYER_WIDTH,
        y: canvas.height / 2 - PLAYER_HEIGHT / 2,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        color: PLAYER_COLOR,
        score: 0,
    }



    
    // Draw shapes and text
function drawRect(x, y, width, height, color ){
    context.fillStyle = color
    context.fillRect(x, y, width, height)
}

function drawCircle(x, y, radius, color){
    context.fillStyle = color
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2, false)
    context.closePath()
    context.fill()
}

function drawText(text, x, y, color ){ 
    context.fillStyle = color
    context.font = '50px fantasy'
    context.fillText(text, x, y)
}

function drawNet(){
    for (let i = 0; i <= canvas.height; i += Net.height + NET_SPACE) {
        drawRect(Net.x, i, Net.width, Net.height, Net.color)
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, '#134B70')
    
    // call drawNet function
    drawNet()

    // call drawRect function
    drawRect(RightPlayer.x, RightPlayer.y, RightPlayer.width, RightPlayer.height, RightPlayer.color)
    drawRect(LeftPlayer.x, LeftPlayer.y, RightPlayer.width, LeftPlayer.height, LeftPlayer.color)

    // call drawCircle function
    drawCircle(Ball.x, Ball.y, Ball.radius, Ball.color)

    // call drawText function
    drawText(RightPlayer.score, canvas.width / 4, 100, '#201E43')
    drawText(LeftPlayer.score,  canvas.width - (canvas.width / 4) , 100, '#201E43')

}

// collision detection
function collision(ball, player){
    player.top = player.y
    player.bottom = player.y + player.height
    player.left = player.x
    player.right = player.x + player.width

    ball.top = ball.y - ball.radius
    ball.bottom = ball.y + ball.radius
    ball.left = ball.x - ball.radius
    ball.right = ball.x + ball.radius

    return ball.right > player.left && ball.top < player.bottom && ball.left < player.right && ball.bottom > player.top
}

function resetBall() {
    Ball.x = canvas.width / 2
    Ball.y = canvas.height / 2
    Ball.speed = BALL_START_SPEED
    Ball.velocityX = -Ball.velocityX
    Ball.velocityY = -Ball.velocityY
}

function lerp(a, b, n) {
    return (1 - n) * a + n * b
}

canvas.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect()
    RightPlayer.y = e.clientY - rect.top - LeftPlayer.height / 2
})

function update() {
    Ball.x += Ball.velocityX * Ball.speed
    Ball.y += Ball.velocityY * Ball.speed

    if (Ball.y + Ball.radius > canvas.height || Ball.y - Ball.radius < 0) {
        Ball.velocityY = -Ball.velocityY
    }

    let player = (Ball.x < canvas.width / 2) ? RightPlayer : LeftPlayer

    if (collision(Ball, player)) {
        
        let collidePoint = Ball.y - (player.y + player.height / 2)
        collidePoint = collidePoint / (player.height / 2)

        let angleRad = collidePoint * Math.PI / 4

        let direction = (Ball.x < canvas.width / 2) ? 1 : -1

        Ball.velocityX = direction * Ball.speed * Math.cos(angleRad) * 8
        Ball.velocityY = Ball.speed * Math.sin(angleRad) * 8

        // Ball.speed += 1

        // Ball.velocityX = -Ball.velocityX
        Ball.speed += SPEED
    }

    if (Ball.x - Ball.radius < 0) {
        LeftPlayer.score++
        resetBall()
    } else if (Ball.x + Ball.radius > canvas.width) {
        RightPlayer.score++
        resetBall()
    }

    let targetPosition = Ball.y - PLAYER_HEIGHT / 2
    LeftPlayer.y = lerp(LeftPlayer.y, targetPosition, AI_LEVEL)
}

// pause game
function pauseGame() {
    
    Ball.speed = 0
}

function game(){
    update()
    render()
}

render()


// start game
function startGame() {
    Ball.speed = BALL_START_SPEED
    setInterval(game, 1000 / FPS)
}  

startGame();

}

let tableColor = 'blue'

let ballColor = 'red'

let playerColor = 'red'

let netColor = 'red'

let netDirection = 0

export function gameSettingScript() {
    const canvas = document.querySelector('#game-setting-canvas')

    const context = canvas.getContext('2d')

    let Net = {
        x: canvas.width / 2 - 1,
        y: 0,
        width: 2,
        height: 10,
        color: 'red'
    }

    let RightPlayer = {
        x: 0,
        y: canvas.height / 2 - 50 / 2,
        width: 5,
        height: 50,
        color: 'red'
    }

    let LeftPlayer = {
        x: canvas.width - 5,
        y: canvas.height / 2 - 50 / 2,
        width: 5,
        height: 50,
        color: 'red'
    }

    function drawRect(x, y, width, height, color ){
        context.fillStyle = color
        context.fillRect(x, y, width, height)
    }
    
    function drawCircle(x, y, radius, color){
        context.fillStyle = color
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2, false)
        context.closePath()
        context.fill()
    }
    
    function drawText(text, x, y, color ){ 
        context.fillStyle = color
        context.font = '50px fantasy'
        context.fillText(text, x, y)
    }
    
    function drawNet(color, direction){
        if (direction == 0) {
            for (let i = 0; i <= canvas.height; i += Net.height + 5) {
                drawRect(Net.x, i, Net.width, Net.height, color)
            }
        } else if (direction == 1) {
            for (let i = 0; i <= canvas.height; i += Net.height) {
                drawRect(Net.x, i, Net.width, Net.height, color)
            }
        }
    }
    
    function render(){
        drawRect(0, 0, canvas.width, canvas.height, tableColor)
        
        // call drawNet function
        drawNet(netColor, netDirection)
    
        // call drawRect function
        drawRect(RightPlayer.x, RightPlayer.y, RightPlayer.width, RightPlayer.height, playerColor)
        drawRect(LeftPlayer.x, LeftPlayer.y, RightPlayer.width, LeftPlayer.height, playerColor)
    
        // call drawCircle function
        drawCircle(canvas.width / 2, canvas.height / 2, 8, ballColor)
    }
    render()

    const player = document.querySelectorAll('.player .color span')
    const playerDir = document.querySelectorAll('.player .direction span')
    const net = document.querySelectorAll('.net .color span')
    const netDir = document.querySelectorAll('.net .direction span')
    const ball = document.querySelectorAll('.ball span')
    const table = document.querySelectorAll('.table span')

    player.forEach(p => {
        p.addEventListener('click', (e) => {
            playerColor = e.target.getAttribute('color')
            RightPlayer.color = playerColor
            LeftPlayer.color = playerColor
            render()
        })
    })

    playerDir.forEach(p => {
        p.addEventListener('click', (e) => {
            playerDir.forEach(p => {
                p.classList.remove('active')
            })
            e.target.classList.add('active')
        })
    })

    net.forEach(n => {
        n.addEventListener('click', (e) => {
            netColor = e.target.getAttribute('color')
            render()
        })
    })

    netDir.forEach(n => {
        n.addEventListener('click', (e) => {
            netDirection = e.target.getAttribute('direction')
            netDir.forEach(n => {
                n.classList.remove('active')
            })
            e.target.classList.add('active')
            render()
        })
    })

    ball.forEach(b => {
        b.addEventListener('click', (e) => {
            ballColor = e.target.getAttribute('color')
            render()
        })
    })

    table.forEach(t => {
        t.addEventListener('click', (e) => {
            tableColor = e.target.getAttribute('color')
            render()
        })
    })
}