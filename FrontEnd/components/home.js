import { fetchProfile, globalState } from '../scripts/fetchData.js';
import { TicTacToeStatistics } from '../components/tictactoe/fetch.js'

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
                        <button class="btn button-accept" key="${r.sender.username}"><i key=${r.sender.username} class="fas fa-user-check"></i></button>
                        <button class="btn button-decline" key="${r.sender.username}"><i key=${r.sender.username} class="fas fa-user-times"></i></button>
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
                    <li><a href="#" class="profile-link"><i class="fas fa-user"></i></a></li>
                    <li class="active"><a href="#" class="game"><i class="fas fa-gamepad"></i></a></li>
                    <li><a href="#" class="friend-list-link"><i class="fas fa-users"></i></a></li>
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
                        <p>play offine game, with your friend.</p>
                        <img src="images/classic.png" alt="" />
                        <a href="#">Play now</a>
                    </div>

                    <div class="model tic-tac center">
                        <h4>Tic Tac</h4>
                        <p>Enjoy with online Tic Tac game.</p>
                        <img src="images/tournament .png" alt="" />
                        <a href="#">Play now</a>
                    </div>

                    <div class="model tournament">
                        <h4>TOURNAMENT</h4>
                        <p>Create tournament, or join to tournament.</p>
                        <img src="images/tournament .png" alt="" />
                        <a href="#">Play now</a>
                    </div>
                    
                </div>
            </div>

            <div class="charts-row">
                <div class="chart-container">
                    <canvas id="Pie" width="400" height="400"></canvas>
                </div>
            </div>
            <div class="charts-row">
                <div class="chart-container">
                    <canvas id="pieChart-tic-tac"></canvas>
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
            <div class="notifications-panel-header">
                <div class="notification-list">
                    ${getHeaderNotifications()}
                </div>
            </div>
        </div>    
    `)
}

function friends() {
    const innerHTML = globalState.requests.map(r => {
        return (`
            <div class="friend">
                <img src="${r.sender.avatar}" alt="${r.sender.first_name} ${r.sender.last_name}">
                <h4>${r.sender.first_name} ${r.sender.last_name}</h4>
                <a href="#" class="accept">Accept</a>
                <a href="#" class="reject">Decline</a>
            </div>
        `)
    })

    if (innerHTML.length === 0) 
        return `No friend requests`;
    return innerHTML.join('\n');

}

export async function chartScript() {
    const pieCtxTicTac = document.getElementById('pieChart-tic-tac').getContext('2d');

    const data = await TicTacToeStatistics()
    if (data.win_count == 0 && data.draw_count == 0 &&  data.loss_count == 0){

        data.win_count = 100;
        data.draw_count = 100;
        data.loss_count = 100;
    }
    const wonGames = data.win_count;
    const lostGames = data.loss_count;
    const drawGames = data.draw_count;
    // const totalGames = wonGames + lostGames;

    const pieChartTicTac = new Chart(pieCtxTicTac, {
        type: 'doughnut',
        data: {
            labels: ['Victories', 'Defeats', 'Draws'],
            datasets: [{
                data: [wonGames, lostGames, drawGames],
                backgroundColor: [
                    'rgba(111, 166, 255, 0.8)',
                    'rgba(111, 166, 200, 1.5)',
                    'rgba(255, 107, 161, 0.8)'
                ],
                borderColor: [
                    'rgba(111, 166, 255, 1)',
                    'rgba(111, 166, 200, 1.2)',
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
}

function drawText(ctx, text, x, y, options = {}) {
    // Set default values for font size, color, and alignment
    const fontSize = options.fontSize || '16px';
    const fontFamily = options.fontFamily || 'Arial';
    const color = options.color || '#000';
    const align = options.align || 'center';
    const baseline = options.baseline || 'middle';

    // Apply the font style and color
    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;

    // Draw the text on the canvas
    ctx.fillText(text, x, y);
}


export function drawPieChartAnimated(data, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const colors = ['#3DBDA7', '#36A2EB', '#FFCE56', '#4BC0C0'];
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = 150;
    const total = data.reduce((sum, value) => sum + value, 0);    
    let startAngle = 0;
    let progress = 0;

    drawText(ctx, 'Pie Chart', 0, 0, {
        fontSize: '20px',
        color: '#FFFFFF',
        align: 'left',
        baseline: 'top'
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for animation
        progress += 0.02;

        startAngle = 0; // Reset start angle for each frame
        data.forEach((value, index) => {
            const sliceAngle = (value / total) * (2 * Math.PI);
            const endAngle = startAngle + sliceAngle * Math.min(progress, 1);

            // Draw pie slice
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, startAngle, endAngle);
            ctx.closePath();

            ctx.fillStyle = colors[index];
            ctx.fill();

            // Calculate midpoint angle for percentage text placement
            const midAngle = startAngle + sliceAngle / 2;
            const textX = x + (radius / 2) * Math.cos(midAngle); // Adjust to position inside slice
            const textY = y + (radius / 2) * Math.sin(midAngle);

            // Draw percentage text
            const percentage = ((value / total) * 100).toFixed(1) + '%';
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(percentage, textX, textY);

            startAngle += sliceAngle; // Update start angle for next slice
        });
        const colorss = {
            // wins:   '#4CAF50', // Green for wins
            // draws:  '#FFC107', // Yellow for draws
            // losses: '#FFFFFF' // Red for losses
            wins:   '#3DBDA7',
            draws:  '#36A2EB',
            losses: '#FFCE56'
        };
        const padding = 70;
        // Draw legend
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = colorss.wins;
        ctx.fillText("Wins", canvas.width - padding + 20, padding + 20);
        ctx.fillStyle = colorss.draws;
        ctx.fillText("Draws", canvas.width - padding + 20, padding + 40);
        ctx.fillStyle = colorss.losses;
        ctx.fillText("Losses", canvas.width - padding + 20, padding + 60);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}




export function drawLineChartAnimated(dataSets, labels, canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const padding = 70;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    // Colors for each line
    const colors = {
        wins: '#4CAF50', // Green for wins
        draws: '#FFC107', // Yellow for draws
        losses: '#F44336' // Red for losses
    };

    const maxData = Math.max(...dataSets.wins, ...dataSets.draws, ...dataSets.losses);
    const yStep = chartHeight / maxData;
    const xStep = chartWidth / (dataSets.wins.length - 1);

    let progress = 0;

    function animate() {
        progress += 0.02;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw axes
        ctx.strokeStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Draw y-axis labels
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = 0; i <= maxData; i += Math.ceil(maxData / 5)) {
            const y = canvas.height - padding - i * yStep;
            ctx.fillText(i, padding - 10, y);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + 5, y);
            ctx.stroke();
        }

        // Draw each line
        Object.keys(dataSets).forEach((key) => {
            ctx.strokeStyle = colors[key];
            ctx.beginPath();

            dataSets[key].forEach((value, index) => {
                const x = padding + index * xStep;
                const y = canvas.height - padding - value * yStep * progress;

                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();
        });

        // Draw legend
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = colors.wins;
        ctx.fillText("Wins", canvas.width - padding + 20, padding + 20);
        ctx.fillStyle = colors.draws;
        ctx.fillText("Draws", canvas.width - padding + 20, padding + 40);
        ctx.fillStyle = colors.losses;
        ctx.fillText("Losses", canvas.width - padding + 20, padding + 60);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

export async function drawCharts(){

    const data = await TicTacToeStatistics()
    if (data.win_count == 0 && data.draw_count == 0 &&  data.loss_count == 0){

        data.win_count = 100;
        data.draw_count = 100;
        data.loss_count = 100;
    }
    drawPieChartAnimated([data.win_count, data.draw_count, data.loss_count ],'Pie');
}
