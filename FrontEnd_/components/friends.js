import { header, menu } from '../scripts/components.js'
import { fetchProfile, globalState, fetchUsers } from '../scripts/fetchData.js';
import { urlHandler } from '../scripts/routes.js';

export async function friendsComponent() {
    if (globalState.user === null) 
        await fetchProfile();
    if (globalState.user === null)
        return (`cant fetch user data`)

    // get query string from url search param and filter by query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get('search');
    let friends = globalState.friends;
    let requests = globalState.requests;
    if (search) {
        friends = globalState.friends.filter(user => {
            if (user.friend.username === globalState.user.username) return false;
            return user.friend.username.includes(search) || user.friend.first_name.includes(search) || user.friend.last_name.includes(search)
        })

        requests = globalState.requests.filter(user => {
            return user.sender.username.includes(search) || user.sender.first_name.includes(search) || user.sender.last_name.includes(search)
        })
    }
    return (
        header() +
        menu() +
        friendsContent(friends, requests)
    )
}

export function friendsContent(friends, requests) {
    let userRequestLength = 0;
    let userFriendsLength = 0;

    if (globalState.friends) 
        userFriendsLength = globalState.friends.length
    if (globalState.requests)
        userRequestLength = globalState.requests.length;

    return (`
    <div class="friends-list" w-tid="6">
        <div class="friend-header" w-tid="7">
            <h2 w-tid="8">Friends Hub</h2>
            <div class="friend-stats" w-tid="9">
                <div class="stat-card" w-tid="10">
                    <div class="stat-number" w-tid="11">${userFriendsLength}</div>
                    <div class="stat-label" w-tid="12">Total Friends</div>
                </div>
                <div class="stat-card" w-tid="13">
                    <div class="stat-number" w-tid="14">0</div>
                    <div class="stat-label" w-tid="15">Online Now</div>
                </div>
                <div class="stat-card" w-tid="16">
                    <div class="stat-number" w-tid="17">${userRequestLength}</div>
                    <div class="stat-label" w-tid="18">New Requests</div>
                </div>
            </div>
            <div class="search-bar" w-tid="19">
                <input type="text" class="search-input" placeholder="Search friends..." w-tid="20">
            </div>
        </div>
        
        <h3 w-tid="21">Friend Requests</h3>
        <div class="friend-requests" w-tid="22">
            ${friendsRequests(requests)}
        </div>

        <h3 w-tid="49">Friends List</h3>
        <div class="friends-list" w-tid="50">
            ${friendsList(friends)}
        </div>
    </div>
    `)
}

function friendsRequests(requests) {
    if (!requests || requests.length === 0) {
        return (`
            <div class="no-friends" w-tid="51">
                No friend requests found
            </div>
        `)
    }
    const innerHTML = requests.map(r => {
        return (`
            <div class="friend-card" w-tid="23" style="display: flex;">
                <div class="friend-info" w-tid="24">
                    <div class="friend-avatar-container" w-tid="25">
                        <img src="${r.sender.avatar}" alt="${r.sender.username}" class="friend-avatar" w-tid="26" data-image_id="1" alt-rewritten="${r.sender.first_name} ${r.sender.last_name}, a young boxer with a determined expression, stands in boxing stance within a visually striking black and white portrait photograph.">
                    </div>
                    <div class="friend-details" w-tid="27">
                        <div class="friend-name" w-tid="28">${r.sender.first_name} ${r.sender.last_name}</div>
                        <div class="friend-level" w-tid="29">Level: ${r.sender.id}</div>
                        <div class="friend-registered" w-tid="30">Registered: </div>
                    </div>
                </div>
                <div class="friend-actions">
                    <button class="btn btn-accept" key="${r.sender.username}" ><i key="${r.sender.username}" class="fas fa-user-check"></i></button>
                    <button class="btn btn-decline" key="${r.sender.username}" ><i key="${r.sender.username}" class="fas fa-user-times"></i></button>
                    <button class="btn btn-view" key="${r.sender.username}" ><i key="${r.sender.username}" class="fas fa-eye"></i></button>
                </div>
            </div>
        `)
    })

    return innerHTML.join('\n')
}

function friendsList(friends) {
    if (!friends || friends.length === 0) {
        return (`
            <div class="no-friends" w-tid="51">
                No friends found
            </div>
        `)
    }
    const innerHTML = friends.map(r => {
        console.log(r.friend)
        console.log(r.friend.online) 
        return (`
            <div class="friend-card"style="display: flex;">
                <div class="friend-info">
                    <div class="friend-avatar-container">
                        <img src="${r.friend.avatar}" alt="${r.friend.username}" class="friend-avatar">
                        ${getOnlineStatus(r)}
                    </div>
                    <div class="friend-details">
                        <div class="friend-name">${r.friend.first_name} ${r.friend.last_name}</div>
                        <div class="friend-level">Level: ${r.friend.game_stats[0].level}</div>
                        <div class="friend-registered">Registered: May 15, 2022</div>
                    </div>
                </div>
                <div class="friend-actions">
                    <button class="btn btn-message" key="${r.friend.username}"><i key="${r.friend.username}" class="fas fa-envelope"></i></button>
                    <button class="btn btn-play" key="${r.friend.username}"><i key="${r.friend.username}" class="fas fa-gamepad"></i></button>
                    <button class="btn btn-unfriend" key="${r.friend.username}"><i key="${r.friend.username}" class="fas fa-user-minus"></i></button>
                    <button class="btn btn-block" key="${r.friend.username}"><i key="${r.friend.username}" class="fas fa-user-slash"></i></button>
                    <button class="btn btn-view" key="${r.friend.username}"><i key="${r.friend.username}" class="fas fa-eye"></i></button>
                </div>
            </div>    
        `)
    })

    return innerHTML.join('\n');
}

function getOnlineStatus(user) {
    if (globalState.onlineUsers && globalState.onlineUsers.includes(user.friend.username))
        return (`<div class="status-indicator status-online"></div>`)
    else
        return (`<div class="status-indicator status-offline"></div>`)
}

export async function friendsScript() {
    const searchButton = document.querySelector('.search-bar .search-input');
    if (searchButton) {
        searchButton.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const searchValue = e.target.value;
                history.pushState({}, '', '/friends?search=' + searchValue)
                urlHandler();
            }
        })
    }
}