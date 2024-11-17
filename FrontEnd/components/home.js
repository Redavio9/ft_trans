import { fetchProfile, globalState } from '../scripts/fetchData.js';

export async function homeComponent() {
    await fetchProfile();

    // check if cant fetch data
    if (!globalState.user) {
        return (`cant fetch data`);
    }
    return (
        header() +
        menu() +
        homeContent() +
        homeSidebar()
    )
}

export function header() {
    
    return (`
        <div class="header-background">
        <div class="header">
            <div class="search">
                <input type="text" placeholder="Search" />
            </div>
            <div class="profile">
                <i class="far fa-bell notification"></i>
                <i class="far fa-paper-plane send"></i>
                <img src="${globalState.user.avatar}" class="header-profile-link" alt="profile">
            </div>
            <div class="header-menu">
                <a href="#" class="profile-link"><i class="fas fa-user"></i> Profile</a>
                <a href="#" class="setting-link"><i class="fas fa-cog" aria-hidden="true"></i> Setting</a>
                <a href="#" class="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>

            <div id="notificationsPanel" class="notifications-panel" w-tid="11">
                <h3 w-tid="13" class="">Friend Requests</h3>
                <div class="notification-list" w-tid="14">
                    ${getHeaderNotifications()}
                </div>
            </div>
        </div>
        </div>
    `)
}

function getHeaderNotifications() {
    const innerHTML = globalState.requests.map(r => {
        return (`
            <div class="notification-item">
                <img src="${r.sender.avatar}" alt="${r.sender.first_name} ${r.sender.last_name}" class="notification-avatar">
                <div class="notification-content">
                    <div class="notification-header" >
                        <div class="notification-name">${r.sender.first_name} ${r.sender.last_name}</div>
                    </div>
                    <div class="notification-info">Level: ${r.sender.game_stats[0].level}</div>
                    <div class="notification-actions">
                        <button class="btn btn-accept" key="${r.sender.username}">Accept</button>
                        <button class="btn btn-decline" key="${r.sender.username}">Decline</button>
                    </div>
                </div>
            </div>
        `)
    })

    if (innerHTML.length === 0) 
        return `<div class="no-notifications">No notifications Yet</div>`;

    return innerHTML.join('');
}

export function menu() {
    return (`
        <div class="menu">
            <div class="logo">
                <img src="images/logo.png" alt="logo">
            </div>

            <div class="menu-items">
                <ul>
                    <li><a href="#" class="home"><i class="fas fa-home"></i></a></li>
                    <li><a href="#" class="friend-list-link"><i class="fas fa-users"></i></a></li>
                    <li class="active"><a href="#" class="game"><i class="fas fa-play-circle"></i></a></li>
                    <li><a href="#" class="game-setting-link"><i class="fas fa-sliders-h"></i></a></li>
                    <li><a href="#" class="account-setting-link"><i class="fas fa-cog"></i></a></li>
                </ul>
            </div>
        </div>
    `)
}

export function homeContent() {
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

            <div class="charts-row">
                <div class="chart-container">
                    <canvas id="pieChart-tic-tac"></canvas>
                </div>
            </div>

            <div class="charts-row">
                <div class="chart-container">
                    <canvas id="pieChart-ping"></canvas>
                </div>
            </div>
        </div>
    `)
}

export function homeSidebar() {
    return (`
        <div class="sidebar">
            <div class="profile">
                <h2>Profile</h2>
                <div class="image-cover">
                        <img src="${globalState.user.avatar}" alt="profile">
                        <div class="status">
                            <h4>${globalState.user.username}</h4>
                            <p>Level ${globalState.user.game_stats[0].level}</p>
                        </div>
                </div>
                <div class="profile-info">
                    <div>
                        <p>Last Game</p>
                        <h4>Won</h4>
                    </div>

                    <div>
                        <p>Status</p>
                        <h4 class="online">Online</h4>
                    </div>

                    <div>
                        <p>Progress</p>
                        <h4 class="progress">+120PTS</h4>
                    </div>
                </div>
            </div>

            <h2>Friend Request</h2>
            <div class="friend-request">
                <div class="friend">
                    <img src="images/profile.png" alt="">
                    <h4>Rida labbiz</h4>
                    <a href="#" class="accept">Accept</a>
                    <a href="#" class="reject">Decline</a>
                </div>

                <div class="friend">
                    <img src="images/profile.png" alt="">
                    <h4>Rida labbiz</h4>
                    <a href="#" class="accept">Accept</a>
                    <a href="#" class="reject">Decline</a>
                </div>

                <div class="friend">
                    <img src="images/profile.png" alt="">
                    <h4>Rida labbiz</h4>
                    <a href="#" class="accept">Accept</a>
                    <a href="#" class="reject">Decline</a>
                </div>

                <div class="friend">
                    <img src="images/profile.png" alt="">
                    <h4>Rida labbiz</h4>
                    <a href="#" class="accept">Accept</a>
                    <a href="#" class="reject">Decline</a>
                </div>
            </div>
        </div>    
    `)
}

export function chartScript() {
    const pieCtxTicTac = document.getElementById('pieChart-tic-tac').getContext('2d');
    const pieCtxPing = document.getElementById('pieChart-ping').getContext('2d');

    const totalGames = 247;
    const wonGames = Math.round(totalGames * 0.68);
    const lostGames = totalGames - wonGames;

    const pieChartTicTac = new Chart(pieCtxTicTac, {
        type: 'doughnut',
        data: {
            labels: ['Victories', 'Defeats'],
            datasets: [{
                data: [wonGames, lostGames],
                backgroundColor: [
                    'rgba(111, 166, 255, 0.8)',
                    'rgba(255, 107, 161, 0.8)'
                ],
                borderColor: [
                    'rgba(111, 166, 255, 1)',
                    'rgba(255, 107, 161, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            cutout: '65%',
            plugins: {
                title: {
                    display: true,
                    text: 'Tic Tac Statistics',
                    color: '#fff',
                    font: {
                        size: 16,
                        family: "'Poppins', sans-serif",
                        weight: '600'
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        padding: 20,
                        font: {
                            size: 14,
                            family: "'Poppins', sans-serif"
                        }
                    }
                }
            }
        }
    });

    const pieChartPing = new Chart(pieCtxPing, {
        type: 'doughnut',
        data: {
            labels: ['Victories', 'Defeats'],
            datasets: [{
                data: [wonGames, lostGames],
                backgroundColor: [
                    'rgba(111, 166, 255, 0.8)',
                    'rgba(255, 107, 161, 0.8)'
                ],
                borderColor: [
                    'rgba(111, 166, 255, 1)',
                    'rgba(255, 107, 161, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            cutout: '65%',
            plugins: {
                title: {
                    display: true,
                    text: 'PingPong Statistics',
                    color: '#fff',
                    font: {
                        size: 16,
                        family: "'Poppins', sans-serif",
                        weight: '600'
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        padding: 20,
                        font: {
                            size: 14,
                            family: "'Poppins', sans-serif"
                        }
                    }
                }
            }
        }
    });
}