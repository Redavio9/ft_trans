import { header, menu } from './home.js'
import { 
    fetchProfile, 
    globalState,
    fetchUsers,
    fetchGamesResults,
} from '../scripts/fetchData.js';
    
import { getMatchesHistory } from '../components/tictactoe/fetch.js'

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
                `<div id="profile" class="error">Dont found any user with this name: ${username}</div>`
            )
        }
    }
        
    return (
        header() +
        menu() +
        await profileContent(user)
    )
}

import { TicTacToeStatistics } from '../components/tictactoe/fetch.js'
 
async function profileContent(user) {
    const data = await TicTacToeStatistics()
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
                    <p w-tid="23">${data.total_games_played}</p>
                </div>
                <div class="stat-box" w-tid="24">
                    <h3 w-tid="25">Match Loses</h3>
                    <p w-tid="26">${data.loss_count}</p>
                </div>
                <div class="stat-box" w-tid="27">
                    <h3 w-tid="28">Match Wins</h3>
                    <p w-tid="29">${data.win_count}</p>
                </div>
                <div class="stat-box" w-tid="30">
                    <h3 w-tid="31">Match Draws</h3>
                    <p w-tid="32">${data.draw_count}</p>
                </div>
            </div>

            ${await getLastMatches(user)}
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

export async function getLastMatches(user) {
    const lastMatches = await getMatchesHistory(user.id);

    if (lastMatches.length <= 0) {
        return (`
            <div class="match-history" w-tid="42">
                <h2 w-tid="43" class="">Recent Matches</h2>
                <div class="match-list" w-tid="44">
                    <p>No match found.</p>
                </div>
            </div>
        `)
    }
    
    return (`
        <div class="match-history" w-tid="42">
            <h2 w-tid="43" class="">Recent Matches</h2>
            <div class="match-list" w-tid="44">
                ${getMatches(user, lastMatches)}
            </div>
        </div>
    `)
}

function getUsernameById(id) {
    let u = null
    globalState.users.map(user => {
        if (user.id === id)
            u = user.username;
    })
    return u;
}

function getId(username) {
    let id = null
    globalState.users.map(user => {
        if (user.username === username)
            id = user.id;
    })
    return id;
}

function getMatches(user, games){
    let innerHTML = '';
    console.log(games)
    games?.forEach(game => {
        let vs = `${getUsernameById(game.player_o_id)} vs ${getUsernameById(game.player_x_id)}`;
        let isWin = game.winner_id === user.id ? true : false;
        let isDraw = game.winner_id === null ? true : false;
        
            
        let date = game.created_at
        innerHTML += `
            <div class="match-item">
            <span>${vs}</span>
            <span>Score: ${date}</span>
            ${getSpan(isDraw, isWin)}
            </div>`
    })
    if (innerHTML.length === 0)
        return (`<p>No matches found</p>`)
    else
        return innerHTML;
}

function getSpan(isDraw, isWin) {
    if (!isDraw) {
        return (`<span class="match-result ${isWin ? 'win': 'loss'}">${isWin ? 'Win': 'Lost'}</span>`)
    } else 
        return (`<span class="match-result draw">Draw</span>`)
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