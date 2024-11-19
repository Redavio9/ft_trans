import { fetchProfile, globalState } from "../scripts/fetchData.js";
import { header, menu } from "./home.js";
import { getLastMatches } from "./profile.js";


export async function gameComponent() {
    await fetchProfile();

    if (!globalState.user) {
        return (`cant fetch data`);
    }

  return (
    header() +
    menu() + 
    gameContent() +
    gameSidebar()
  )
}

export function gameContent() {
    return (`
        <div class="content">
            <div class="game-mode">
                <h2 class="heading">Games modes</h2>
                <div class="models">
                    <div class="model classic">
                        <h4>CLASSIC</h4>
                        <p>play online game, with random person.</p>
                        <img src="images/classic.png" alt="" />
                        <a href="#">Play now</a>
                    </div>

                    <div class="model center ai">
                        <h4>AI - MODE</h4>
                        <p>chose AI level and have fun.</p>
                        <img src="images/ai-mode.png" alt="" />
                        <a href="#">Play now</a>
                    </div>

                    <div class="model tournament">
                        <h4>TOURNAMENT</h4>
                        <p>Create tournament, or join to tournament.</p>
                        <img src="images/tournament .png" alt="" />
                        <a href="#">Play now</a>
                    </div>

                    <div class="model tic-tac ai">
                        <h4>Tic Tac</h4>
                        <p>Enjoy with online Tic Tac game.</p>
                        <img src="images/tournament .png" alt="" />
                        <a href="#">Play now</a>
                    </div>
                    
                </div>
            </div>

            ${getLastMatches()}
            
        </div>    
    `)
}

export function gameSidebar() {
    return (`
        <div class="sidebar">
            <h2>Play With Friends</h2>
            <div class="friends">
                <div class="friend">
                    <img src="images/profile.png" alt="">
                    <h4>Rida labbiz</h4>
                    <a href="#">Play</a>
                </div>

                <div class="friend">
                    <img src="images/profile.png" alt="">
                    <h4>Rida labbiz</h4>
                    <a href="#">Play</a>
                </div>

                <div class="friend">
                    <img src="images/profile.png" alt="">
                    <h4>Rida labbiz</h4>
                    <a href="#">Play</a>
                </div>

                <div class="friend">
                    <img src="images/profile.png" alt="">
                    <h4>Rida labbiz</h4>
                    <a href="#">Play</a>
                </div>

                <div class="friend">
                    <img src="images/profile.png" alt="">
                    <h4>Rida labbiz</h4>
                    <a href="#">Play</a>
                </div>

                <div class="friend">
                    <img src="images/profile.png" alt="">
                    <h4>Rida labbiz</h4>
                    <a href="#">Play</a>
                </div>
            </div>
        </div>
    `)
}

export async function gameAiComponent() {
    await fetchProfile();

    if (!globalState.user) {
        return (`cant fetch data`);
    }

    return (`
        <div class="game-container">
            <div id="countdown">5</div>
            <div id="game-cover"></div>
            <i class="fas fa-times"></i>
            <div class="player-field">
                <img src="images/profile.png" alt="">
                <h4>Player</h4>
            </div>
            <canvas id="pong" width="950px" height="500"></canvas>
            <div class="player-field">
                <img src="images/profile.png" alt="">
                <h4>Player</h4>
            </div>
        </div>
    `)
}