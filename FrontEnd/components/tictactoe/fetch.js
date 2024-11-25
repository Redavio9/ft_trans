export async function createTicTacToeMatch(){
    try {
        const response = await fetch('http://127.0.0.1:8000/tictactoe/create-match/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json()
        if (data.status === 'success') {
            // alert(`Match created with key: ${data.match_key}`);
            return data.match_key;
        } else {
            return null;
        }
    } catch(error) {
        onsole.error('Error:', error)
    }
}

export async function joinTicTacToeMatch(joinKey){
    console.log("1337 Here !!!", {joinKey})
    try{
        const response = await fetch(`http://127.0.0.1:8000/tictactoe/join-match/${joinKey}/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: `joinKey=${joinKey}`
            body: JSON.stringify({
                joinKey: joinKey
            })
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json()
        if (data.status === 'success') {
            // alert(`Match created with key: ${data.match_key}`);
            return data.match_key;
        } else {
            return null;
        }
    } catch(error) {
        onsole.error('Error:', error)
    }
}

export async function TicTacToeStatistics() {
    try {
        const response = await fetch(`http://127.0.0.1:8000/tictactoe/matches_statistics/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Log the error response text
            const errorText = await response.text();
            console.error('Error:', errorText);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return ({
                    "win_count": data.win_count,
                    "loss_count": data.loss_count,
                    "draw_count": data.draw_count,
                    "total_games_played": data.total_games_played
        })
        
    } catch (error) {
        console.error("Error fetching statistics:", error);
    }
}

export async function getMatchesHistory(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/tictactoe/match_history/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Log the error response text
            const errorText = await response.text();
            console.error('Error:', errorText);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.matches
        
    } catch (error) {
        console.error("Error fetching statistics:", error);
    }
}

export async function tictactoe_getUser(){
    const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'GET',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        }
    });

    const userData = await response.json();
    return userData.user.id;
}
