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
