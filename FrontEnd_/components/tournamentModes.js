import { urlHandler } from "../scripts/routes.js";
import { globalState, fetchProfile, globalTournamentState } from "../scripts/fetchData.js";

export async function firstModeComponent() {
    if (globalState.user === null)
        await fetchProfile();

    if (globalState.user === null)
        return (`cant fetch user data`)

    return (`
        <div class="first-mode">
            <h2>${globalTournamentState.name}</h2>
            <div class="tournament-info">
                Tournament ID: <span id="tournamentId">PPM2023</span>
                <button class="copy-button" onclick="copyTournamentId()">Copy ID</button>
            </div>
            <div class="bracket" w-tid="11">
                <div class="round" id="round1" w-tid="12">${round1()}</div>
                <div class="round" id="round2" w-tid="53">${round2()}</div>
                <div class="round" id="round3" w-tid="74">${round3()}</div>
            </div>
            <button class="bottom-leave-button" w-tid="86">Leave Tournament</button>
        </div>
    `)
}

function matchTemplate(match) {
    return (`
        <div class="match in-progress">
            <div class="player winner">
                <span class="player-name">${match.player1.username}</span>
                ${scoreTemplate(match.player1.score)}
            </div>
            <div class="player">
                <span class="player-name">${match.player2.username}</span>
                ${scoreTemplate(match.player2.score)}
            </div>
            <div class="paddle paddle-left"></div>
            <div class="paddle paddle-right"></div>
            <div class="ball"></div>
        </div>
    `)
}

function scoreTemplate(score) {
    if (score)
        return (`<span class="player-score">${score}</span>`)
    return (``)
}

function round1(){
    return (`
        ${matchTemplate(globalTournamentState.round1.match1)}
        ${matchTemplate(globalTournamentState.round1.match2)}
        ${matchTemplate(globalTournamentState.round1.match3)}
        ${matchTemplate(globalTournamentState.round1.match4)}
    `)
}

function round2(){
    return (`
        ${matchTemplate(globalTournamentState.round2.match1)}
        ${matchTemplate(globalTournamentState.round2.match2)}
    `)
}

function round3(){
    return (`
        ${matchTemplate(globalTournamentState.round3.match1)}
    `)
}

export async function secondModeComponent() {
    if (globalState.user === null)
        await fetchProfile();

    if (globalState.user === null)
        return (`cant fetch user data`)

    return (`
        <div class="first-mode">
            <h2>ping Pong masters</h2>
            <div class="tournament-info" w-tid="8">
                Tournament ID: <span id="tournamentId" w-tid="9">PPM2023</span>
                <button class="copy-button" w-tid="10">Copy ID</button>
            </div>
            <div class="bracket" w-tid="11">
                <div class="round" id="round2" w-tid="53">
                    <div class="match in-progress" w-tid="54">
                        <div class="player" w-tid="55">
                            <span class="player-name advanced" w-tid="56">Alice</span>
                            <span class="player-score" w-tid="57">10</span>
                        </div>
                        <div class="player" w-tid="58">
                            <span class="player-name advanced" w-tid="59">Charlie</span>
                            <span class="player-score" w-tid="60">9</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="61"></div>
                        <div class="paddle paddle-right" w-tid="62"></div>
                        <div class="ball" w-tid="63"></div>
                    </div>
                    <div class="match in-progress" w-tid="64">
                        <div class="player" w-tid="65">
                            <span class="player-name advanced" w-tid="66">Grace</span>
                            <span class="player-score" w-tid="67">10</span>
                        </div>
                        <div class="player" w-tid="68">
                            <span class="player-name advanced" w-tid="69">Frank</span>
                            <span class="player-score" w-tid="70">8</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="71"></div>
                        <div class="paddle paddle-right" w-tid="72"></div>
                        <div class="ball" w-tid="73"></div>
                    </div>
                </div>
                <div class="round" id="round3" w-tid="74">
                    <div class="match" w-tid="75">
                        <div class="player" w-tid="76">
                            <span class="player-name" w-tid="77">TBD</span>
                            <span class="player-score" w-tid="78">0</span>
                        </div>
                        <div class="player" w-tid="79">
                            <span class="player-name" w-tid="80">TBD</span>
                            <span class="player-score" w-tid="81">0</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="82"></div>
                        <div class="paddle paddle-right" w-tid="83"></div>
                        <div class="ball" w-tid="84"></div>
                    </div>
                </div>
            </div>
            <button class="bottom-leave-button" w-tid="86">Leave Tournament</button>
        </div>
    `)
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {}
}

export function tournamentModesScript() {
    const leaveTournamentButton = document.querySelector('.first-mode .bottom-leave-button');
    if (leaveTournamentButton) {
        leaveTournamentButton.addEventListener('click', function () {
            history.pushState(null, null, '/tournament');
            urlHandler();
        })
    }

    const copyButton = document.querySelector('.first-mode .copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', function () {
            const tournamentId = document.querySelector('.first-mode .tournament-info span').innerText;
            copyToClipboard(tournamentId);
        })
    }

    // run the tournament
    function startTournament() {
        const user = globalTournamentState.round1.match1.player1.username;

        if (globalTournamentState.round1.match1.player1.score === null) {
            console.log('game started');
        }
        // history.pushState(null, null, '/game');
        // urlHandler();

        
    }

    startTournament()
}