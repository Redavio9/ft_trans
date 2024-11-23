import { userInfo, data, user } from "./gameWaiting.js"
import { urlHandler } from "../scripts/routes.js";
import { globalState, fetchProfile, delay } from "../scripts/fetchData.js";

let Ball = {
    x: 950 / 2,
    y: 500 / 2,
    radius: 10,
    speed: 0.5,
    velocityX: 5,
    velocityY: 5,
    color: '#EEEEEE'
}

let LeftPlayer = {
    x: 0,
    y: 500 / 2 - 150 / 2,
    width: 15,
    height: 150,
    color: 'red',
    score: 0,
}

let RightPlayer = {
    x: 950 - 15,
    y: 500 / 2 - 150 / 2,
    width: 15,
    height: 150,
    color: 'red',
    score: 0,
}

export async function gameOnlineComponent() {
    if (!globalState.user) 
        await fetchProfile();

    if (globalState.user === null)
        return (`cant fetch user data`)

    let LeftUser, RightUser;

    // check if no room name, then exit this function
    if (data.roomName == '' || userInfo.otherPlayer == null) 
        return;

    if (userInfo.otherPlayer.direction == 'left') {
        LeftUser = userInfo.otherPlayer;
        RightUser = userInfo;
    } else {
        LeftUser = userInfo;
        RightUser = userInfo.otherPlayer;
    }

    return (`
        <div class="game-over-popup">
            <div class="popup">
                <div class="emoji">🏆</div>
                <h2>Victory Achieved!</h2>
                <p>Congratulations on your spectacular win! What's your next move?</p>
                <div class="buttons">
                    <button class="new-match">New Match</button>
                    <button class="exit" >Exit</button>
                </div>
            </div>
        </div>
        <div class="game-container">
            <div id="countdown" style="display: none;">5</div>
            <div id="game-cover" style="display: none;"></div>
            <i class="fas fa-times"></i>
            <div class="player-field">
                <img src="${LeftUser.avatar}" alt="">
                <h4>${LeftUser.name}</h4>
            </div>
            <canvas id="pong" width="950px" height="500"></canvas>
            <div class="player-field">
                <img src="${RightUser.avatar}" alt="">
                <h4>${RightUser.name}</h4>
            </div>
        </div>
    `);
}

export async function gameOnlineScript() {
    if (data.roomName == '' || userInfo.otherPlayer == null) {
        history.pushState(null, null, '/game');
        urlHandler();
        return ;
    }

    
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/play/' + data.roomName + '/');
    document.querySelector('.exit').addEventListener('click', () => {
        ws.close();
        history.pushState(null, null, '/game');
        urlHandler();
    })

    let gameStarted = false

    ws.onopen = function () {}

    ws.onmessage = async function (event) {
        const message = JSON.parse(event.data);
        if (message.type == 'game_update') {
            Ball = message.ball;
            LeftPlayer = message.leftPlayer;
            RightPlayer = message.rightPlayer;
            render();
        } else if (message.type == 'game_start') {
            gameStarted = true;
            startGame();
        } else if (message.type == 'send_message') {
        } else if (message.type == 'reset_ball') {
            await resetBall(message)
        } else if (message.type == 'game_over') {
            clearInterval(gameInterval);
            if (message.winner == userInfo.direction) {
                document.querySelector('.game-over-popup').style.display = 'block';
            } else {
                document.querySelector('.game-over-popup').style.display = 'block';
                document.querySelector('.emoji').innerText = '😢';
                document.querySelector('h2').innerText = 'Defeat!';
                document.querySelector('p').innerText = `Don't be disheartened! Every loss is a chance to learn and grow. Ready for another challenge?`;
            }
            // intial the rightplayer and leftplayer and ball 
            Ball = {
                x: 950 / 2,
                y: 500 / 2,
                radius: 10,
                speed: 0.5,
                velocityX: 5,
                velocityY: 5,
                color: '#EEEEEE'
            }
            LeftPlayer = {
                x: 0,
                y: 500 / 2 - 150 / 2,
                width: 15,
                height: 150,
                color: 'red',
                score: 0,
            }
            RightPlayer = {
                x: 950 - 15,
                y: 500 / 2 - 150 / 2,
                width: 15,
                height: 150,
                color: 'red',
                score: 0,
            }
        }
    }

    ws.onclose = function () {}

    const canvas = document.querySelector('#pong')

    const context = canvas.getContext('2d')

    // define game constants
    // game
    let FPS = 60

    // ball
    let BALL_START_SPEED = 1

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

    async function resetBall(message) {
        clearInterval(gameInterval);
        Ball = message.ball;
        LeftPlayer = message.leftPlayer;
        RightPlayer = message.rightPlayer;

        Ball.x = 950 / 2;
        Ball.y = 500 / 2;
        Ball.velocityX = -Ball.velocityX;
        Ball.velocityY = -Ball.velocityY;

        render();
        startGame()
    }

    canvas.addEventListener('mousemove', (e) => {
        if (!gameStarted)
            return ;
        let rect = canvas.getBoundingClientRect()
        if (userInfo.direction == 'left') {
            LeftPlayer.y = e.clientY - rect.top - LeftPlayer.height / 2
        } else {
            RightPlayer.y = e.clientY - rect.top - RightPlayer.height / 2
        }
        render()
    })

    function game(){
        ws.send(JSON.stringify({
            type: 'game_update',
            roomName: data.roomName,
            ball: Ball,
            leftPlayer: LeftPlayer,
            rightPlayer: RightPlayer
        }))
        render()
    }

    render()

    // start game
    function startGame() {
        Ball.speed = BALL_START_SPEED
        gameInterval = setInterval(game, 1000 / FPS)
    }
}

function createConfetti() {
    const confettiColors = ['#f1c40f', '#e67e22', '#e74c3c', '#2ecc71', '#3498db'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        document.body.appendChild(confetti);

        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        }).onfinish = () => confetti.remove();
    }
}