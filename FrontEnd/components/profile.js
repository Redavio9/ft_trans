import { header, menu } from '../scripts/components.js'
import { 
    fetchProfile, 
    globalState,
    fetchUsers,
} from '../scripts/fetchData.js';
    
export async function profileComponent() {
    if (globalState.user === null) 
        await fetchProfile();
    
    if (globalState.users === null) 
        await fetchUsers();

    if (globalState.user === null || globalState.users === null) {
        return (`cant fetch user data`)
    }

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
            <div class="profile-header" w-tid="11" style="/* transform: rotateY(-0.54deg) rotateX(-15.4deg); */">
                <div class="profile-pic-container" w-tid="12">
                    <img src="${user.avatar}" alt="${user.username}" class="profile-pic" w-tid="13" data-image_id="0" alt-rewritten="Neon-lit ping pong match captured in vibrant digital photograph." style="box-shadow: rgba(61, 189, 167, 0.5) 0px 0px 20px;">
                </div>
                <div class="profile-info" w-tid="15">
                    <h1 w-tid="16">${user.first_name} ${user.last_name}</h1>
                    <p w-tid="17">@${user.username}</p>
                    <p w-tid="18">Level ${user.game_stats[0].level}</p>
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

            <div class="match-history" w-tid="42">
                <h2 w-tid="43" class="">Recent Matches</h2>
                <div class="match-list" w-tid="44">
                    <div class="match-item" w-tid="45">
                        <span w-tid="46">vs. John Doe</span>
                        <span w-tid="47">Score: 21-18</span>
                        <span class="match-result win" w-tid="48">Win</span>
                    </div>
                    <div class="match-item" w-tid="49">
                        <span w-tid="50">vs. Emma Smith</span>
                        <span w-tid="51">Score: 19-21</span>
                        <span class="match-result loss" w-tid="52">Loss</span>
                    </div>
                    <div class="match-item" w-tid="53">
                        <span w-tid="54">vs. Mike Johnson</span>
                        <span w-tid="55">Score: 21-15</span>
                        <span class="match-result win" w-tid="56">Win</span>
                    </div>
                    <div class="match-item" w-tid="57">
                        <span w-tid="58">vs. Lisa Brown</span>
                        <span w-tid="59">Score: 21-12</span>
                        <span class="match-result win" w-tid="60">Win</span>
                    </div>
                    <div class="match-item" w-tid="61">
                        <span w-tid="62">vs. Tom Wilson</span>
                        <span w-tid="63">Score: 18-21</span>
                        <span class="match-result loss" w-tid="64">Loss</span>
                    </div>
                </div>
            </div>
            <div class="achievements" w-tid="65">
                <h2 w-tid="66">Achievements</h2>
                <div class="achievement-grid" w-tid="67">
                    <div class="achievement-item" w-tid="68">
                        <div class="achievement-icon" w-tid="69">🏆</div>
                        <div class="achievement-info" w-tid="70">
                            <h3 w-tid="71">Tournament Champion</h3>
                            <p w-tid="72">Win a major PingPongMasters tournament</p>
                        </div>
                    </div>
                    <div class="achievement-item" w-tid="73">
                        <div class="achievement-icon" w-tid="74">🔥</div>
                        <div class="achievement-info" w-tid="75">
                            <h3 w-tid="76">On Fire</h3>
                            <p w-tid="77">Win 10 matches in a row</p>
                        </div>
                    </div>
                    <div class="achievement-item" w-tid="78">
                        <div class="achievement-icon" w-tid="79">🎯</div>
                        <div class="achievement-info" w-tid="80">
                            <h3 w-tid="81">Precision Master</h3>
                            <p w-tid="82">Achieve 95% serve accuracy in 50 matches</p>
                        </div>
                    </div>
                    <div class="achievement-item" w-tid="83">
                        <div class="achievement-icon" w-tid="84">⚡</div>
                        <div class="achievement-info" w-tid="85">
                            <h3 w-tid="86">Speed Demon</h3>
                            <p w-tid="87">Win a match in under 5 minutes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)
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