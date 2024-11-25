import { showFriendRequest, handleFriendAccept, handleFriendDecline, showGameRequest } from "./generalMessage.js";
import { urlHandler } from "./routes.js";

export const globalState = {
    user: null,
    users: null,
    friends: null,
    requests: null,
    sendRequests: null,
    game: null,
    ws: null,
    onlineUsers: null,
    gamesResults: null,
};

export const globalTournamentState = {
    name: null,
    isWinner: false,
    isContinue: false,
    isReset: false,
    vs: '',
    aiLevel: 0.08,
    round1: {
        match1: {player1: {username: '', score: null, status: 'waiting'}, player2: {username: 'Bob', score: null, status: 'waiting'}},
        match2: {player1: {username: 'Charlie', score: null, status: 'waiting'}, player2: {username: 'David', score: null, status: 'waiting'}},
        match3: {player1: {username: 'Eve', score: null, status: 'waiting'}, player2: {username: 'Frank', score: null, status: 'waiting'}},
        match4: {player1: {username: 'Grace', score: null, status: 'waiting'}, player2: {username: 'grave', score: null, status: 'waiting'}},
    },
    round2: {
        match1: {player1: {username: 'wating...', score: null, status: 'waiting'}, player2: {username: 'wating...', score: null, status: 'waiting'}},
        match2: {player1: {username: 'wating...', score: null, status: 'waiting'}, player2: {username: 'wating...', score: null, status: 'waiting'}},
    },
    round3: {
        match1: {player1: {username: 'wating...', score: null, status: 'waiting'}, player2: {username: 'wating...', score: null, status: 'waiting'}},
    }
}

export function resetTournament() {
    globalTournamentState.name = null;
    globalTournamentState.isReset = false;
    globalTournamentState.isWinner = false;
    globalTournamentState.isContinue = false;
    globalTournamentState.vs = '';
    globalTournamentState.aiLevel = 0.08;
    globalTournamentState.round1 = {
        match1: {player1: {username: '', score: null, status: 'waiting'}, player2: {username: 'Bob', score: null, status: 'waiting'}},
        match2: {player1: {username: 'Charlie', score: null, status: 'waiting'}, player2: {username: 'David', score: null, status: 'waiting'}},
        match3: {player1: {username: 'Eve', score: null, status: 'waiting'}, player2: {username: 'Frank', score: null, status: 'waiting'}},
        match4: {player1: {username: 'Grace', score: null, status: 'waiting'}, player2: {username: 'grave', score: null, status: 'waiting'}},
    }
    globalTournamentState.round2 = {
        match1: {player1: {username: 'wating...', score: null, status: 'waiting'}, player2: {username: 'wating...', score: null, status: 'waiting'}},
        match2: {player1: {username: 'wating...', score: null, status: 'waiting'}, player2: {username: 'wating...', score: null, status: 'waiting'}},
    }
    globalTournamentState.round3 = {
        match1: {player1: {username: 'wating...', score: null, status: 'waiting'}, player2: {username: 'wating...', score: null, status: 'waiting'}},
    }
}

export async function fetchProfile() {
    const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'GET',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        }
    });

    const userData = await response.json();
    if (userData?.code === 'token_not_valid') {
        // if true then remove access_token and refresh_token from Cookies
        document.cookie = 'access_token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'refresh_token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setTimeout(() => {
            history.pushState(null, null, '/singin');
            urlHandler();
        }, 1000);
    }

    globalState.user = userData?.user;
    globalState.requests = userData.user?.friend_requests;
    globalState.sendRequests = userData.user?.sent_requests;
    globalState.friends = userData.user?.friends;
    globalState.game = userData.user?.game_stats;

    if (!globalState.ws)
        globalState.ws = new WebSocket(`ws://127.0.0.1:8000/ws/realtimenotifications/${globalState.user.username}/`);
    globalState.ws.onmessage = function (e) {
        const data = JSON.parse(e.data);
        if (data.message.type === 'friend_request')
            showFriendRequest(data.message.message.sender);
        else if (data.message.type === 'friend_accept')
            handleFriendAccept(data.message.message.sender);
        else if (data.message.type === 'friend_decline')
            handleFriendDecline({title: 'Friend Request Declined', message: data.message.message.sender + ' has declined your friend request', icon: 'fas fa-user-minus', type: 'info'});
        else if (data.message.type === 'game_request'){
            showGameRequest(data.message.message.key)
        }
        else if (data.message.type === 'online') {
            globalState.onlineUsers = data.message.users;
        }
    }

    globalState.ws.onclose = function (e) {
        globalState.ws.close();
        globalState.ws = null;
    }
}

export async function sendRealTimeNotification(type, message) {
    if (globalState.user === null)
        return ;
    if (globalState.ws.readyState !== 1)
        globalState.ws = new WebSocket(`ws://127.0.0.1:8000/ws/realtimenotifications/${globalState.user.username}/`);
    globalState.ws.send(JSON.stringify({
        type: type,
        message: message
    }));
}

export async function fetchUsers() {
    const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'GET',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        }
    })
    const usersData = await response.json();
    globalState.users = usersData.users;
}

export async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchGamesResults() {
    const response = await fetch(`http://127.0.0.1:8000/api/user_games_history/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json());
    if (response?.message)
        globalState.gamesResults = response.game_history;
}