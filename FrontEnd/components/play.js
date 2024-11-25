import { globalState, fetchProfile } from "../scripts/fetchData.js";
import { handleViewMessage } from "../scripts/generalMessage.js";
import { urlHandler } from "../scripts/routes.js";

const data = {
    user: null,
    otherUser: {name: null, avatar: null}
}

export async function classicGameComponent() {
    await fetchProfile();

    if (!globalState.user) {
        return (`cant fetch data`);
    }

    if (data.otherUser.name === null) {
        return (`
            <div class="modal" style="display: block;">
                <div class="two-fa-modal ">
                    <div class="two-fa-modal-content">
                        <h2>Who want play with you ?</h2>
                        <input type="text" id="2faCode" class="tournament-name-input" placeholder="Name">
                        <button class="btn confirm-2fa tournament">Confirm</button>
                    </div>
                </div>
            </div>
        `)
    }

    return (`
        <div class="game-over-popup">
            <div class="popup">
                <div class="emoji">🏆</div>
                <h2>Victory Achieved!</h2>
                <p>Congratulations on your spectacular win! What's your next move?</p>
                <div class="buttons">
                    <button class="exit" >Exit</button>
                </div>
            </div>
        </div>
        <div class="game-container">
            <div id="countdown">5</div>
            <div id="game-cover"></div>
            <i class="fas fa-times"></i>
            <div class="player-field">
                <img src="${globalState.user.avatar}" alt="${globalState.user.username}'s photo">
                <h4>${globalState.user.username}</h4>
            </div>
            <canvas id="pong" width="950px" height="500"></canvas>
            <div class="player-field">
                <img src="../images/avatars/avatar1.webp" alt="${data.otherUser.name}">
                <h4>${data.otherUser.name}</h4>
            </div>
        </div>
    `)
}

export async function classicGame() {
    if (data.otherUser.name === null) {
        const confirm2fa = document.querySelector('.confirm-2fa');
        confirm2fa?.addEventListener('click', async () => {
            const name = document.getElementById('2faCode').value;
            if (name === globalState.user.username) {
                handleViewMessage({
                    type: 'error',
                    message: 'Name cannot be same as your name',
                    title: 'Error',
                    icon: 'fas fa-exclamation-triangle'
                })
                return ;
            }
            data.otherUser.name = name;
            await urlHandler();
        })
        return ;
    }

    const closeGame = document.querySelector('.exit');
    closeGame?.addEventListener('click', () => {
        history.pushState(null, null, '/game');
        urlHandler();
    })

    const newGame = document.getElementById('new-game');
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
    // let AI_LEVEL = 0.01

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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'w' && LeftPlayer.y > 0) {
            LeftPlayer.y -= 50
        } else if (e.key === 's' && LeftPlayer.y < canvas.height - (LeftPlayer.height / 2)) {
            LeftPlayer.y += 50
        } else if (e.key === 'ArrowUp' && RightPlayer.y > 0) {
            RightPlayer.y -= 50
        } else if (e.key === 'ArrowDown' && RightPlayer.y < canvas.height - (RightPlayer.height / 2)) {
            RightPlayer.y += 50
        }
        
    })


    async function update() {
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
    }

    // game over
    async function gameOver(winner) {
        FPS = 0;
        Ball.speed = 0;
        clearInterval(gameInterval);
        document.querySelector('.game-over-popup').style.display = 'block';
        document.querySelector('.emoji').innerText = '🎉';
        document.querySelector('h2').innerText = 'Match over!';
        document.querySelector('p').innerText = `${winner === 'Right Player' ? data.otherUser.name : globalState.user.username} wins!`;
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

    async function game(){
        await update()
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
