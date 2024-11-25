import { createTicTacToeMatch, joinTicTacToeMatch, TicTacToeStatistics } from './fetch.js'
import { urlHandler } from "../../scripts/routes.js";

function redirectToGameBoard(roomName)
{
    console.log("roomName 1337 : " , { roomName }); // Log room name for debugging
    history.pushState(null, null, `/tictactoe_board?match_key=${roomName}`);
    urlHandler();
}

export function createMatchEvent(){
    document.getElementById('createMatchForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const match_key = await createTicTacToeMatch();
        console.log({match_key})
        if (match_key)
            redirectToGameBoard(match_key)
    });
}

export function playGameFrHome_(){
    document.getElementById('playGameFrHome').addEventListener('click', async function(event) {
        event.preventDefault();
        
        const match_key = await createTicTacToeMatch();
        console.log({match_key})
        if (match_key)
            redirectToGameBoard(match_key)
    });
}

export function joinMatchEvent(){
    document.getElementById('joinMatchForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const joinKey = document.getElementById('joinKey').value;
        console.log({joinKey})
        const match_key = await joinTicTacToeMatch(joinKey);
        if (match_key)
            redirectToGameBoard(match_key)
    });
}

export async function displayStatistics(){
    document.getElementById('tictactoe_statistic').addEventListener('submit', function(event) {
        event.preventDefault();
        history.pushState(null, null, `/dashboard`);
        urlHandler();
    });
}

export function manageEvents(){
    createMatchEvent()
    joinMatchEvent()
    displayStatistics()
}

export function closePopUp(){
    document.querySelector('.exit').addEventListener('click', () => {
        history.pushState(null, null, '/tic-tac');
        urlHandler();
    })
}