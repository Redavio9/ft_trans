
export function renderStartgame() {

if (!document.getElementById('startgame-css')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'stylesgame.css';
    link.id = 'startgame-css';
    document.head.appendChild(link);
}

const header = document.getElementById('content');
const navbar = document.getElementById('header');
navbar.innerHTML = "";
header.innerHTML = `
    <div class="game-container">
    <h1>Start Your Game</h1>

    <div class="option mb-4">
        <div class="option-title">Choose Your Racket</div>
        <select class="form-select" id="racket-select">
            <option value="red">Red Racket</option>
            <option value="blue">Blue Racket</option>
            <option value="green">Green Racket</option>
        </select>
        <img id="racket-image" src="redR.jpeg" alt="Racket Image">
    </div>

    <div class="option mb-4">
        <div class="option-title">Choose Your Terrain</div>
        <select class="form-select" id="terrain-select">
            <option value="wood">Wood Terrain</option>
            <option value="grass">Grass Terrain</option>
            <option value="concrete">Concrete Terrain</option>
        </select>
        <img id="terrain-image" src="Terrain.jpeg" alt="Terrain Image">
    </div>

    <button class="btn btn-custom" id="start-button">Start Game</button>
    </div>
`;
}