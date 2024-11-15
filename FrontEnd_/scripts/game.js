import { globalTournamentState } from "./fetchData.js"
import { handleMatchEnd } from "../components/tournamentModes.js"
import { urlHandler } from "./routes.js"

// select canvas 
export function gameScriptAi() {
    const canvas = document.querySelector('#pong')

    const context = canvas.getContext('2d')

    // define game constants
    // game
    let WINNING_SCORE = 3
    let FPS = 60

    // ball
    let BALL_START_SPEED = 1
    let BALL_MAX_SPEED = 8
    let SPEED = .02

    // player 
    let PLAYER_COLOR = '#508C9B'
    let PLAYER_WIDTH = 15
    let PLAYER_HEIGHT = 150

    // AI
    let AI_LEVEL = 0.01

    // Net
    let NET_SPACE = 5

    let gameInterval = 0


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

    let LeftPlayer = {
        x: 0,
        y: canvas.height / 2 - PLAYER_HEIGHT / 2,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        color: PLAYER_COLOR,
        score: 0,
    }

    let RightPlayer = {
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
        drawRect(LeftPlayer.x, LeftPlayer.y, LeftPlayer.width, LeftPlayer.height, LeftPlayer.color)
        drawRect(RightPlayer.x, RightPlayer.y, LeftPlayer.width, RightPlayer.height, RightPlayer.color)

        // call drawCircle function
        drawCircle(Ball.x, Ball.y, Ball.radius, Ball.color)

        // call drawText function
        drawText(LeftPlayer.score, canvas.width / 4, 100, '#201E43')
        drawText(RightPlayer.score,  canvas.width - (canvas.width / 4) , 100, '#201E43')

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
        Ball.x = canvas.width / 2;
        Ball.y = canvas.height / 2;
        Ball.velocityX = -Ball.velocityX;
        Ball.velocityY = -Ball.velocityY;
        Ball.speed = 0;

        setTimeout(() => {
            Ball.speed = BALL_START_SPEED;
        }, 3000);
    }

    function lerp(a, b, n) {
        return (1 - n) * a + n * b
    }

    canvas.addEventListener('mousemove', (e) => {
        let rect = canvas.getBoundingClientRect()
        LeftPlayer.y = e.clientY - rect.top - RightPlayer.height / 2
    })

    // move player using keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' || e.key == 'w') {
            LeftPlayer.y -= 30
        } else if (e.key === 'ArrowDown' || e.key == 's') {
            LeftPlayer.y += 30
        }
    })

    function update() {
        // Calculate the new position
        let newX = Ball.x + Ball.velocityX * Ball.speed;
        let newY = Ball.y + Ball.velocityY * Ball.speed;

        // Check for collisions with top and bottom walls
        if (newY + Ball.radius > canvas.height || newY - Ball.radius < 0) {
            Ball.velocityY = -Ball.velocityY;
            newY = Ball.y + Ball.velocityY * Ball.speed; // Recalculate newY
        }

        // Determine which player to check for collision
        let player = (newX < canvas.width / 2) ? LeftPlayer : RightPlayer; 

        // Check for collision with player paddle
        if (lineRect(Ball.x, Ball.y, newX, newY, 
                    player.x, player.y, player.width, player.height)) {
            
            // Collision occurred, handle it
            let collidePoint = Ball.y - (player.y + player.height / 2);
            collidePoint = collidePoint / (player.height / 2);

            let angleRad = collidePoint * Math.PI / 4;

            let direction = (Ball.x < canvas.width / 2) ? 1 : -1;

            Ball.velocityX = direction * Ball.speed * Math.cos(angleRad) * 8;
            Ball.velocityY = Ball.speed * Math.sin(angleRad) * 8;
            
            if (Ball.speed < BALL_MAX_SPEED)
                Ball.speed += SPEED;

            // Update newX and newY based on new velocities
            newX = Ball.x + Ball.velocityX;
            newY = Ball.y + Ball.velocityY;
        }

        // Update ball position
        Ball.x = newX;
        Ball.y = newY;

        // Check for scoring
        if (Ball.x - Ball.radius < 0) {
            if (RightPlayer.score == WINNING_SCORE - 1) {
                RightPlayer.score++;
                gameOver('Right Player');
                return ;
            }
            RightPlayer.score++;
            resetBall();
        } else if (Ball.x + Ball.radius > canvas.width) {
            if (LeftPlayer.score == WINNING_SCORE - 1) {
                LeftPlayer.score++;
                gameOver('Left Player');
                return ;
            }
            LeftPlayer.score++;
            resetBall();
        }

        // AI movement
        let targetPosition = Ball.y - PLAYER_HEIGHT / 2;
        RightPlayer.y = lerp(RightPlayer.y, targetPosition, AI_LEVEL);
    }

    // game over
    async function gameOver(winner) {
        FPS = 0;
        Ball.speed = 0;
        clearInterval(gameInterval);
        if (globalTournamentState.name.length > 0) {
            console.log('game over');
            await handleMatchEnd(LeftPlayer.score, RightPlayer.score);
            history.pushState(null, null, '/first-mode');
            urlHandler();
        }
        console.log(`name is ${globalTournamentState.name}`);
        console.log(`Game Over! ${winner} Wins!`);
    }

    // Helper function to check line-rectangle collision
    function lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
        // Check if the line has hit any of the rectangle's sides
        // uses the Line/Line function below
        let left =   lineLine(x1,y1,x2,y2, rx,ry,rx,ry+rh);
        let right =  lineLine(x1,y1,x2,y2, rx+rw,ry,rx+rw,ry+rh);
        let top =    lineLine(x1,y1,x2,y2, rx,ry,rx+rw,ry);
        let bottom = lineLine(x1,y1,x2,y2, rx,ry+rh,rx+rw,ry+rh);

        // If ANY of the above are true, the line has hit the rectangle
        if (left || right || top || bottom) {
            return true;
        }
        return false;
    }

    // Helper function to check line-line collision
    function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
        // Calculate the direction of the lines
        let uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
        let uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

        // If uA and uB are between 0-1, lines are colliding
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            return true;
        }
        return false;
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
        gameInterval = setInterval(game, 1000 / FPS)
    }  

    function coolCountdown(callback, seconds) {
        const countdownElement = document.getElementById('countdown');
        const gameCover = document.getElementById('game-cover');
        let count = seconds;

        countdownElement.style.display = 'block';
        gameCover.style.display = 'block';

        function updateCount() {
            countdownElement.textContent = count;
            countdownElement.classList.add('highlight');

            setTimeout(() => {
                countdownElement.classList.remove('highlight');
            }, 250);

            if (count > 0) {
                count--;
                setTimeout(updateCount, 1000);
            } else {
                countdownElement.textContent = 'Go!';
                setTimeout(() => {
                    countdownElement.style.display = 'none';
                }, 1000);
                countdownElement.style.display = 'none';
                gameCover.style.display = 'none';
                callback();
            }
        }

        updateCount();
    }

    coolCountdown(startGame, 5);

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

    let LeftPlayer = {
        x: 0,
        y: canvas.height / 2 - 50 / 2,
        width: 5,
        height: 50,
        color: 'red'
    }

    let RightPlayer = {
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
        drawRect(LeftPlayer.x, LeftPlayer.y, LeftPlayer.width, LeftPlayer.height, playerColor)
        drawRect(RightPlayer.x, RightPlayer.y, LeftPlayer.width, RightPlayer.height, playerColor)
    
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
            LeftPlayer.color = playerColor
            RightPlayer.color = playerColor
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
