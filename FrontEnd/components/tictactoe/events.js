import { createTicTacToeMatch, joinTicTacToeMatch, TicTacToeStatistics } from './fetch.js'
import { urlHandler } from "../../scripts/routes.js";

function redirectToGameBoard(roomName)
{
    history.pushState(null, null, `/tictactoe_board?match_key=${roomName}`);
    urlHandler();
}

export function createMatchEvent(){
    document.getElementById('createMatchForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const match_key = await createTicTacToeMatch();
        if (match_key)
            redirectToGameBoard(match_key)
    });
}

export function playGameFrHome_(){
    const playGame = document.getElementById('playGameFrHome');
    if(playGame){
        playGame.addEventListener('click', async function(event) {
            event.preventDefault();
            
            const match_key = await createTicTacToeMatch();
            if (match_key)
                redirectToGameBoard(match_key)
        });
    }
}

export function joinMatchEvent(){
    document.getElementById('joinMatchForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const joinKey = document.getElementById('joinKey').value;
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

async function copyMatchKeyBtn(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {}
}

export function copyMatchKeyEvent(){
    const MatchKeyBtn = document.getElementById('copyMatchKeyBtn');
    if (MatchKeyBtn) {
        MatchKeyBtn.addEventListener('click', function () {
            const match_key = document.getElementById('Board_MatchKey').innerText;
            console.log({match_key})
            copyMatchKeyBtn(match_key);
        })
    }
}
