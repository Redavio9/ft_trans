// socket_manager.js
let gameState = {
    'player': 'X',
    'board': [],
    'move': '',
    'socket': null,
    'images': null,
    'key': null,
    'gameStatus': "",
    'isError': false,
    'errorMessage': "",
    'timerInterval': 0,
    'totalSeconds': 0
};

function removeMove(error, move){
    alert(error);
    const button = document.getElementById(move);
    button.innerHTML = '';
    button.disabled = false;
}

function lockEveryButton(){
    for (let i = 0; i < 9; i++) {
        const button = document.getElementById(i);
        button.disabled = true;
    }
}

function displayWinnerPopUp(winner){
    document.querySelector('.game-over-popup').style.display = 'block';
    document.querySelector('.emoji').innerText = '🎉';
    document.querySelector('h2').innerText = 'Match over!';
    document.querySelector('p').innerText = `The Winner of this match is : ${winner}`;//check
}

function displayDrawPopUp(){
    document.querySelector('.game-over-popup').style.display = 'block';
    document.querySelector('.emoji').innerText = '🎉';
    document.querySelector('h2').innerText = 'No Winner in this Match';
}

function socket_onmessage(){
    // Listen for messages from the server
    gameState.socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        gameState.gameStatus = data.status;
        if (gameState.gameStatus == "start"){
            gameState.move = data.move;
            gameState.player = data.player;
            console.log("data.match : ", data.match)
            if (data.error !== undefined)
                removeMove(data.error, data.move)
            else {
                if (data.winner == 'X' || data.winner == 'O') {
                    lockEveryButton()
                    //fetch for the name of user using (data.user)
                    displayWinnerPopUp(data.winner)//check
                }
                if (data.winner == 'Draw')
                    displayDrawPopUp()
                applyMoveToBoard()
            }
        }
        else
            console.log(gameState.gameStatus)
    };
}

function socket_onopen(){
    gameState.socket.onopen = async function() {
        console.log("WebSocket connection opened.");
    };
}

function socket_onclose(){
    gameState.socket.onclose = function(event) {
        console.log("WebSocket connection closed:", event);
    };
}

function socket_onerror(){
    gameState.socket.onerror = function(error) {
        console.error("WebSocket error:", error);
    };
}

function updateBoard(board) {
    // Update the board with the current state
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < 3; j++) {
            const btnId = (i * 3) + j;  // Calculate button ID from row (i) and column (j)
            const button = document.getElementById(btnId); // Get button by ID

            if (button) {
                // Check if the current board position is occupied
                if (board[i][j] !== null) {
                    // If occupied, update the button with the appropriate image
                    button.innerHTML = `<img src="${gameState.images[board[i][j]]}" alt="${board[i][j]}" width="30%">`;
                    button.disabled = true; // Disable button since the spot is taken
                }
            }
        }
    }
}

async function setup_board(){
    console.log("gameState.key : ", gameState.key)
    const response = await fetch(`http://127.0.0.1:8000/tictactoe/match/${gameState.key}/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
    })
    console.log("gameState.key : ", gameState.key)
    // Uncaught (in promise) Error: Network response was not ok
    if (!response.ok) {
        // Log the error response text
        const errorText = await response.text();
        console.error('Error:', errorText);
        throw new Error('Network response was not ok');
    }
    const data = await response.json()
    gameState.player = data.current_turn;
    gameState.board  = data.board;
    console.log("data.board : ", data.board)
    // if (data.winner)
    updateBoard(data.board)
}

function socket_initializtions(){
    const urlParams = new URLSearchParams(window.location.search);
    const roomName = urlParams.get('match_key');
    gameState.key = roomName;
    console.log({roomName})
    if (roomName == null){
        console.log("****", {roomName})
        gameState.isError = true
        gameState.errorMessage = "roomName is null"
    } else {
        //Fetch for verify if roomName Valid or not
        document.getElementById('Board_MatchKey').innerText = gameState.key
        gameState.player = 'X'
        gameState.socket = new WebSocket(`ws://127.0.0.1:8000/ws/tictactoe/${roomName}/`);
        gameState.images = {
            'X': '../../images/tictactoe/X.png',
            'O': '../../images/tictactoe/O.png'
        };
        gameState.gameStatus = "";
        // setup_board()
    }
}

function sendMessageToServer(user_id){
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const move = button.id;
            console.log("move 1337: ", move)
            let ids = "012345678";
            if (ids[move]){
                if (!button.disabled) {  // Only allow move if button isn't already clicked
                    gameState.socket.send(JSON.stringify({
                        'move': move,
                        'player': gameState.player,
                        'user': user_id
                    }));

                }
            }
        });
    });
}

function applyMoveToBoard(){
    const button = document.getElementById(gameState.move);
    button.innerHTML = `<img src="${gameState.images[gameState.player]}" alt="${gameState.player}" width="30%">`;
    button.disabled = true;  // Disable the button after it's clicked to prevent further moves
    document.getElementById('turnof').innerText = gameState.player == 'X' ? 'O' : 'X'
}

export function socket_management_(user_id){
    socket_initializtions()
    if (gameState.isError == false && gameState.socket){
        socket_onopen()
        socket_onmessage()
        socket_onclose()
        socket_onerror()
        sendMessageToServer(user_id)
    }
    else{
        console.log("Error : " , gameState.errorMessage)
    }
}
