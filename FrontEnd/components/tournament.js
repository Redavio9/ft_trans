import { urlHandler } from "../scripts/routes.js";
import { globalState, fetchProfile } from "../scripts/fetchData.js";
import { handleViewMessage } from "../scripts/generalMessage.js";
import { globalTournamentState } from "../scripts/fetchData.js";

export async function gameTournamentComponent() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch user data`)
    }

    return (`
        <div class="tournament-component">
            <h2> <i class="fas fa-arrow-left" title="Back To Game"></i> PING PONG Tournament hub</h2>
            <div class="options">
                <div class="option create">
                    <h3> create tournament </h3>
                    <p> Launch a new 4 or 8 player showdown </p>
                </div>
                <div class="option join">
                    <h3> JOIN TOURNAMENT </h3>
                    <p> Enter an existing battle or use an ID </p>
                </div>
            </div>
            <div class="create-tournament" id="createTournament">
                <h3>Create New Tournament</h3>
                <input type="text" class="tournamentName" placeholder="Give your tournament an epic name">
                <button>Launch Tournament</button>
            </div>

            <div class="join-tournament" id="joinTournament">
                <h3>Join Tournament</h3>
                <input type="text" id="tournamentId" placeholder="Enter Tournament ID to join the fray">
                <button>Join by ID</button>
                
                <div class="tournament-list" id="tournamentList" style="display: block;">
                    <div class="tournament-item" id="first-mode">
                        <span>Paddle Fury </span>
                        <p>7/8</p>
                        <button class="join-button">Enter Arena</button>
                    </div>
                    <div class="tournament-item" id="first-mode">
                        <span>Table Titans</span>
                        <p>7/8</p>
                        <button class="join-button">Enter Arena</button>
                    </div>
                    <div class="tournament-item" id="second-mode">
                        <span>Spin Masters</span>
                        <p>7/8</p>
                        <button class="join-button">Enter Arena</button>
                    </div>
                    <div class="tournament-item" id="first-mode">
                        <span>Ping Pong Legends</span>
                        <p>7/8</p>
                        <button class="join-button">Enter Arena</button>
                    </div>
                </div>
            </div>
        </div>
    `)
}

export function tournamentScript() {
    const joinTournamentButtom = document.querySelector('.tournament-component .options .join');
    const createTournamentButtom = document.querySelector('.tournament-component .options .create');
    const createTournament = document.getElementById('createTournament');
    const joinTournament = document.getElementById('joinTournament');

    if (joinTournamentButtom) {
        joinTournamentButtom.addEventListener('click', () => {
            createTournament.style.display = 'none';
            joinTournament.style.display = 'block';
        });
    }

    if (createTournamentButtom) {
        createTournamentButtom.addEventListener('click', () => {
            createTournament.style.display = 'block';
            joinTournament.style.display = 'none';
        });
    }

    const backToGame = document.querySelectorAll('.tournament-component h2 i');
    if (backToGame) {
        backToGame.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                history.pushState(null, null, '/game');
                urlHandler();
            })
        })
    }

    const firstMode = document.querySelectorAll('.tournament-list #first-mode button');
    if (firstMode) {
        firstMode.forEach(mode => {
            mode.addEventListener('click', () => {
                globalTournamentState.name = mode.parentElement.querySelector('span').textContent;
                history.pushState(null, null, '/first-mode');
                urlHandler();
            })
        })
    }

    // join tournament by ID
    const joinTournamentButton = document.querySelector('.tournament-component .join-tournament button');
    const tournamentId = document.querySelector('.tournament-component .join-tournament #tournamentId');
    joinTournamentButton?.addEventListener('click', async () => {
        if (!tournamentId?.value) {
            return handleViewMessage({
                message: 'Please enter a tournament ID',
                title: 'Error',
                type: 'error',
                icon: 'fas fa-exclamation-circle',
            })
        }

        globalTournamentState.name = "Ping Pong Tournament";
        history.pushState(null, null, '/first-mode');
        urlHandler();
    })

    // get tournament name and username from input fields
    const launchTournament = document.querySelector('.tournament-component .create-tournament button');
    const tournamentName = document.querySelector('.tournament-component .create-tournament .tournamentName');

    launchTournament.addEventListener('click', async () => {
        if (!tournamentName?.value ) {
            return handleViewMessage({
                message: 'Please enter a tournament name',
                title: 'Error',
                type: 'error',
                icon: 'fas fa-exclamation-circle',
            })
        }

        if (tournamentName && tournamentName.value) 
            globalTournamentState.name = tournamentName.value;
        else 
            globalTournamentState.name = "Ping Pong Tournament";
        history.pushState(null, null, '/first-mode');
        urlHandler();
    })
}