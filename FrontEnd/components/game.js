import { fetchProfile, fetchUsers, globalState } from "../scripts/fetchData.js";
import { header, menu } from "./home.js";
import { getLastMatches } from "./profile.js";


export async function gameComponent() {
    await fetchProfile();
    await fetchUsers();

    if (!globalState.user) {
        return (`cant fetch data`);
    }

  return (
    header() +
    menu() + 
    await gameContent() +
    await gameSidebar()
  )
}

export async function gameContent() {
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

            ${await getLastMatches(globalState.user)}
            
        </div>    
    `)
}

export async function gameSidebar() {
    return (`
        <div class="sidebar">
            <h2>Play With Friends</h2>
            <div class="friends">
                ${friends()}
            </div>
        </div>
    `)
}

function friends() {
    const innerHTML = globalState.friends.map(r => {
        return (`
            <div class="friend">
                <img src="${r.friend.avatar}" alt="${r.friend.username}'s photo">
                <h4>${r.friend.first_name} ${r.friend.last_name}</h4>
                <a href="#" key="${r.friend.username}" id="playGameFrHome">Play</a>
            </div>
        `)
    })
    if (innerHTML.length === 0) 
        return '<h4>No friends available</h4>';
    return innerHTML.join('\n');
}

export async function gameAiComponent() {
    await fetchProfile();

    if (!globalState.user) {
        return (`cant fetch data`);
    }

    return (`
        <div class="game-over-popup">
            <div class="popup">
                <div class="emoji">🏆</div>
                <h2>Victory Achieved!</h2>
                <p>Congratulations on your spectacular win! What's your next move?</p>
                <div class="buttons">
                    <button class="exit" >Exit</button>
                </div>
            </div>
        </div>
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