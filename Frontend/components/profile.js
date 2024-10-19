import { navigate } from '../main.js';

export function renderProfile() {

  if (!document.getElementById('startgame-css')) 
  {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'stylesprofile.css';
    link.id = 'startgame-css';
    document.head.appendChild(link);
  } 
  const content = document.getElementById('content');
  content.innerHTML = "";
  const header = document.getElementById('header');
  header.innerHTML = `
    <div class="dashboard-container">
    <h1>Player Dashboard</h1>
    <!-- Player info section -->
    <div class="player-info">
        <div>
            <h3>Name</h3>
            <p>John Doe</p>
        </div>
        <div>
            <h3>Matches Played</h3>
            <p>50</p>
        </div>
        <div>
            <h3>Ranking</h3>
            <p>#12</p>
        </div>
    </div>
    <!-- Graph for statistics -->
    <canvas id="playerStats"></canvas>
  </div>
  `;
}



