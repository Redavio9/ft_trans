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
                <input type="submit" value="Create Match" id="tictactoe_createMatch" class="formInputs">
                <!-- <strong id="matchCode"></strong> -->
            </form>

            <hr>

            <!-- Join Match Form -->
            <form id="joinMatchForm">
                <input type="text" id="joinKey" placeholder="Enter unique match key" required>
                <hr>
                <input type="submit" value="Join Match" class="formInputs">
            </form>
            
            <hr>

            <form id="tictactoe_statistic">
                <input type="submit" value="View statistics" class="formInputs">
            </form>

        </div>
        `)
}
const data = {
    user: null,
    otherUser: {name: null, avatar: null}
}
export async function ticTacToeBoard() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch user data`)
    }

    return (`
        <div class="game-over-popup">
            <div class="popup">
                <div class="emoji">🏆</div>
                <h2>Victory Achieved!</h2>
                <p></p>
                <div class="buttons">
                    <button class="exit" >Exit</button>
                </div>
            </div>
        </div>
        <div id="app">
            <h1>Tic-Tac-Toe</h1>
            <div class="Board_MatchKey" id="Board_MatchKey">MatchKey</div>
            <button id="copyMatchKeyBtn">Copy Key</button>
            <div class="playerTurn" id="playerTurn">Turn of : <strong id="turnof">  </strong></div>
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

export async function ticTacToeDashboard(data) {
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
                    <p>Games Played: <span id="gamesPlayed">${data.total_games_played}</span></p>

                </div>
                <canvas id="Pie" width="500" height="400"></canvas>
                <canvas id="LineChart" width="500" height="400"></canvas>
            </div>
        </div>
    `)
}
