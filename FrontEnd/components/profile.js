import { header, menu } from './home.js'
import { 
    fetchProfile, 
    globalState,
    fetchUsers,
    fetchGamesResults,
} from '../scripts/fetchData.js';
    
export async function profileComponent() {
    await fetchProfile();
    await fetchUsers();
    await fetchGamesResults();

    if (globalState.user === null || globalState.users === null || globalState.gamesResults === null)
        return (`cant fetch user data`)

    // get username parameter from url to fetch user data
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    let user = globalState.user;
    if (username) {
        user = globalState.users.find(user => user.username === username);
        if (!user) {
            return (
                header() +
                menu() +
                `<div id="profile" class="error">Dont found any user of this name: ${username}</div>`
            )
        }
    }
        
    return (
        header() +
        menu() +
        profileContent(user)
    )
}

function profileContent(user) {
    return (`
        <div id="profile">
            <div class="profile-header">
                <div class="profile-pic-container">
                    <img src="${user.avatar}" alt="${user.username}" class="profile-pic" style="box-shadow: rgba(61, 189, 167, 0.5) 0px 0px 20px;">
                </div>
                <div class="profile-info">
                    <h1>${user.first_name} ${user.last_name}</h1>
                    <p>@${user.username}</p>
                    <p>Level ${user.game_stats[0].level}</p>
                    ${profileButtons(user)}
                </div>
            </div>

            <div class="stats-container" w-tid="20">
                <div class="stat-box" w-tid="21">
                    <h3 w-tid="22">Matches Played</h3>
                    <p w-tid="23">${user.game_stats[0].total_games}</p>
                </div>
                <div class="stat-box" w-tid="24">
                    <h3 w-tid="25">Match Loses</h3>
                    <p w-tid="26">${user.game_stats[0].lost_games}</p>
                </div>
                <div class="stat-box" w-tid="27">
                    <h3 w-tid="28">Match Wins</h3>
                    <p w-tid="29">${user.game_stats[0].won_games}</p>
                </div>
                <div class="stat-box" w-tid="30">
                    <h3 w-tid="31">Tournament Wins</h3>
                    <p w-tid="32">${user.game_stats[0].won_tournaments}</p>
                </div>
            </div>

            ${getLastMatches(user)}
            <div class="achievements">
                <h2>Achievements</h2>
                <div class="achievement-grid">
                    <div class="achievement-item">
                        <div class="achievement-icon">🏆</div>
                        <div class="achievement-info">
                            <h3>Tournament Champion</h3>
                            <p>Win a major PingPongMasters tournament</p>
                        </div>
                    </div>
                    <div class="achievement-item">
                        <div class="achievement-icon">🔥</div>
                        <div class="achievement-info">
                            <h3>On Fire</h3>
                            <p>Win 10 matches in a row</p>
                        </div>
                    </div>
                    <div class="achievement-item">
                        <div class="achievement-icon">🎯</div>
                        <div class="achievement-info">
                            <h3>Precision Master</h3>
                            <p>Achieve 95% serve accuracy in 50 matches</p>
                        </div>
                    </div>
                    <div class="achievement-item">
                        <div class="achievement-icon">⚡</div>
                        <div class="achievement-info">
                            <h3>Speed Demon</h3>
                            <p>Win a match in under 5 minutes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)
}

export function getLastMatches(user) {
    if (!globalState.gamesResults) {
        return (`
            <div class="match-history" w-tid="42">
                <h2 w-tid="43" class="">Recent Matches</h2>
                <div class="match-list" w-tid="44">
                    <p>No match found.</p>
                </div>
            </div>
        `)
    }
    
    const lastMatches = globalState.gamesResults.filter(game => {
        return (game.player_1 === user.username || game.player_2 === user.username)
    })
    return (`
        <div class="match-history" w-tid="42">
            <h2 w-tid="43" class="">Recent Matches</h2>
            <div class="match-list" w-tid="44">
                ${getMatches(user, lastMatches)}
            </div>
        </div>
    `)
}

function getMatches(user, games){
    const innerHtml = games.map(game => {
        let score = '';
        let vs = '';
        let isWin = false;

        if (game.player_1 === user.username && game.score_1 > game.score_2) 
            isWin = true;
        else if (game.player_2 === user.username && game.score_2 > game.score_1) 
            isWin = true;

        if (game.player_1 === user.username) {
            score = `${game.score_1} - ${game.score_2}`;
            vs = `${game.player_1} vs. ${game.player_2}`;
        } else {
            score = `${game.score_2} - ${game.score_1}`;
            vs = `${game.player_2} vs. ${game.player_1}`;
        }
    
        return (`
            <div class="match-item">
                <span>${vs}</span>
                <span>Score: ${score}</span>
                <span class="match-result ${isWin ? 'win': 'loss'}">${isWin ? 'Win': 'Lost'}</span>
            </div>
        `)
    })
    if (innerHtml.length === 0)
        return (`<p>No matches found</p>`)
    else if (innerHtml.length > 5)
        return innerHtml.slice(0, 5).join('\n');
    else
        return innerHtml.join('\n');
}

function profileButtons(user) {
    const requestButton = {innerHtml: `<i key=${user.username} class="fas fa-user-plus"></i>`, class: 'btn btn-request', key: user.username};
    const editButton = {innerHtml: 'Edit Profile', class: 'edit-profile-btn', key: user.username};
    const acceptButton = {innerHtml: `<i key=${user.username} class="fas fa-user-check"></i>`, class: 'btn btn-accept', key: user.username};
    const declineButton = {innerHtml: `<i key=${user.username} class="fas fa-user-times"></i>`, class: 'btn btn-decline', key: user.username};
    const declineButtonReverse = {innerHtml: `<i key=${user.username} class="fas fa-user-times"></i>`, class: 'btn btn-decline-reverse', key: user.username};
    const unFriendButton = {innerHtml: `<i key=${user.username} class="fas fa-user-minus"></i>`, class: 'btn btn-unfriend', key: user.username};
    const blockButton = {innerHtml: `<i key=${user.username} class="fas fa-user-slash"></i>`, class: 'btn btn-block', key: user.username};
    const sendMessageButton = {innerHtml: `<i key=${user.username} class="fas fa-envelope"></i>`, class: 'btn btn-message', key: user.username};
    const playButton = {innerHtml: `<i key=${user.username} class="fas fa-gamepad"></i>`, class: 'btn btn-play', key: user.username};
    let isRequest = false;
    let isFriend = false;
    let isSend = false;

    if (globalState.user.username === user.username)
        return (getButtons([editButton]))

    globalState.user.friend_requests.forEach(request => {
        if (request.sender.username === user.username) 
            isRequest = true;
    })

    globalState.friends.forEach(friend => {
        if (friend.friend.username === user.username) 
            isFriend = true;
    })

    globalState.user.sent_requests.forEach(r => {
        if (r.receiver.username === user.username)
            isSend = true;
    })

    if (isRequest) 
        return (getButtons([acceptButton, declineButton]))
    else if (isFriend)
        return (getButtons([sendMessageButton, playButton, unFriendButton, blockButton]))
    else if (isSend)
        return (getButtons([declineButtonReverse]))
    else
        return (getButtons([requestButton]))
}

export function getButtons(buttons) {
    const buttonHTML = buttons.map(button => {
        return (`
            <button class="${button.class}" key="${button.key}">${button.innerHtml}</button>
        `)
    })

    return buttonHTML.join('\n');
}