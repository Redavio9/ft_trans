import { urlHandler } from "../scripts/routes.js";
import { globalState, fetchProfile } from "../scripts/fetchData.js";

export const userInfo = {
    id: null,
    name: null,
    avatar: null,
    otherPlayer: null,
}

export async function gameStartingComponent() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch user data`)
    }

    userInfo.id = globalState.user.id;
    userInfo.name = globalState.user.username;
    userInfo.avatar = globalState.user.avatar;

    return (`
        <div class="game-waiting-container">
            <div class="game-waiting" w-tid="6">
                <h1 w-tid="7">Ping Pong Match</h1>
                <div class="players" w-tid="8">
                    <div class="player" w-tid="9">
                        <img class="player-photo" src="${userInfo.avatar}" alt="${userInfo.name}'s photo" width="120" height="120" w-tid="10" data-image_id="0" alt-rewritten="A warm portrait photograph of a smiling young man with short dark hair.">
                        <div class="player-name" w-tid="11">${userInfo.name}</div>
                    </div>
                    <div class="vs" w-tid="12">VS</div>
                    <div class="player" w-tid="13">
                        <div class="player-photo" w-tid="17">
                            <img class="" src="../images/avatars/avatar2.webp" alt="Player 2 photo" width="120" height="120" w-tid="14" data-image_id="1" style="" alt-rewritten="A playful cartoon avatar with spiky blue hair.">                        
                        </div>
                        <div class="player-name" w-tid="15">Waiting...</div>
                    </div>
                </div>
                <div class="waiting" w-tid="16">Searching For Opponent!</div>
            </div>
        </div>
    `)
}

export const data = {
    roomName: '',
};

export let user = null

export function gameStartingComponentScript() {
    // start connection to the server
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/game/');

    ws.onopen = function () {}

    // receive message from the server
    ws.onmessage = function (event) {
        const message = JSON.parse(event.data);
        handleMessages(message);
    }

    // handle disconnection
    ws.onclose = function () {
        ws.close();
    }

    // handle messages from the server
    function handleMessages(message) {
        if (message.type == 'channel_name') {
            ws.send(JSON.stringify({
                type: 'join',
                channel: message.channel_name,
                user: userInfo
            }))
        } else if (message.type == 'game_start') {
            data.roomName = message.message.roomName;
            setTimeout(() => {
                ws.close();
                history.pushState(null, null, '/play');
                urlHandler();
            }, 5000)
            setTimeout(() => {
                const userImage = document.querySelector('.player-photo img');
                const userName = document.querySelectorAll('.player-name')[1];
                const waitingMsg = document.querySelector('.game-waiting-container .waiting');
                
                if (message.message.firstUser.id != userInfo.id) 
                    userInfo.otherPlayer = message.message.firstUser;
                else
                    userInfo.otherPlayer = message.message.secondUser;

                waitingMsg.innerHTML = 'Opponent found! Get ready to play!';
                userImage.src = `${userInfo.otherPlayer.avatar}`;
                userImage.style = "animation: fadeOut 1s ease-in-out;";
                userName.innerHTML = userInfo.otherPlayer.name;

                if (userInfo.otherPlayer.direction == 'left') 
                    userInfo.direction = 'right';
                else
                    userInfo.direction = 'left';
            }, 3000)
        }
    }
}


