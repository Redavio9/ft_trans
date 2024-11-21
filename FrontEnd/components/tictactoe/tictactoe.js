import { globalState, fetchProfile } from "../../scripts/fetchData.js";

export async function ticTacToeComponent() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch user data`)
    }

    return (`
        <div class="gameForm">
            <h2>Tic-Tac-Toe</h2>
            <div class="create-tournament">TEST</div>

            <!-- Create Match Form -->
            <form method="POST"  id="createMatchForm" action="/tictactoe/create-match/">
                <!-- <h3>Create Match</h3> -->
                <input type="text" id="matchKey" placeholder="Enter match key (optional)">
                <input type="submit" value="Create Match" id="tictactoe_createMatch">
                <!-- <strong id="matchCode"></strong> -->
            </form>

            <hr>

            <!-- Join Match Form -->
            <form id="joinMatchForm">
                <h3>Join Match</h3>
                <input type="text" id="joinKey" placeholder="Enter unique match key" required>
                <input type="submit" value="Join Match">
            </form>
            
            <hr>

            <form id="tictactoe_statistic">
                <h3>View statistics</h3>
                <input type="submit" value="View statistics">
            </form>

            </div>
            `)
}

export async function ticTacToeBoard() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch user data`)
    }

    return (`
        <div id="app">
            <h1>Tic-Tac-Toe</h1>
            <div class="timer" id="timer">00:00:00</div>
            <div class="game-container">
                <!-- Left player info -->

                <!-- Tic-Tac-Toe board -->
                <div id="tictactoe_board">
                    <div class="row">
                        <button id="0"></button>
                        <button id="1"></button>
                        <button id="2"></button>
                    </div>
                    <div class="row">
                        <button id="3"></button>
                        <button id="4"></button>
                        <button id="5"></button>
                    </div>
                    <div class="row">
                        <button id="6"></button>
                        <button id="7"></button>
                        <button id="8"></button>
                    </div>
                </div>

                <!-- Right player info -->
            </div>
            <strong id="match_key"></strong>
        </div>
    `)
}

export async function ticTacToeDashboard() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch user data`)
    }

    return (`
        <div id="container" style=" background-color: #000; width: 1200px ; height: 650px;">
            <div id="dashboard" >
                <div id="statistics">
                    <h1 style="color: white;">TicTacToe Statistics Dashboard</h1>
                    <p>Games Played: <span id="gamesPlayed">?</span></p>
                    <p>Win Rate: <span id="winRate"></span>?</p>
                    <p>Average Score: <span id="averageScore">?</span></p>
                    <p>Average Response Time: <span id="averageResponseTime">?</span></p>
                    <p>Average Time per matches : <span id="averageTimePerMatches">?</span></p>

                </div>
                <canvas id="Pie" width="500" height="400"></canvas>
                <canvas id="LineChart" width="500" height="400"></canvas>
            </div>
        </div>
    `)
}

// Not Used
export async function tictactoeWaitingPly() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch user data`)
    }
    
    const id = 'TEST';
    const name = 'TEST';
    const avatar = 'TEST';
    return (`
        <div class="game-waiting-container">
            <div class="game-waiting" w-tid="6">
                <h1 w-tid="7">Ping Pong Match</h1>
                <div class="players" w-tid="8">
                    <div class="player" w-tid="9">
                        <img class="player-photo" src="../images/avatars/${avatar}" alt="${name}'s photo" width="120" height="120" w-tid="10" data-image_id="0" alt-rewritten="A warm portrait photograph of a smiling young man with short dark hair.">
                        <div class="player-name" w-tid="11">${name}</div>
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
