export function rendercontent() 
{

  console.log("contentHome");
  const header = document.getElementById('content');
  header.innerHTML += `
  <div class="col" style="font-family: Arial, Helvetica, sans-serif;"> 
  <div class="header-content">
    <h1 class="h4 mb-0">Hello <span class="text">Solix01!</span></h1>
                <p class="mb-0">Ready for a gaming surprise? Click 'Play' to start a random game.</p>
    </div>
  <!-- Game Modes -->
  <div id="game-mode" class="row">
      <div class="col-lg-3 m-3">
          <div class="card-game text-center p-3">
              <img src="../image.png" class="card-img-top" alt="Classic Mode">
              <div class="card-body">
                  <h5 class="card-title">CLASSIC</h5>
                  <p class="card-text">Play a game of ping pong</p>
                  <a href="/startgame" id="PLay-now" class="btn ">Play now</a>
              </div>
          </div>
      </div>
      <div class="col-lg-4 m-3">
          <div class="card-game text-center p-3">
              <img src="../ai.png" class="card-img-top mx-auto" alt="AI Mode">
              <div class="card-body">
                  <h5 class="card-title">AI MODE</h5>
                  <p class="card-text">Challenge the computer</p>
                  <a href="/startgame" id="PLay-now" class="btn ">Play now</a>
              </div>
          </div>
      </div>
      <div class="col-lg-3 m-3">
          <div class="card-game text-center p-3">
              <img src="../one.png" class="card-img-top mx-auto" alt="Friends Mode">
              <div class="card-body">
                  <h5 class="card-title">FRIENDS MODE</h5>
                  <p class="card-text">Beat your friends in 1 vs 1</p>
                  <a href="/startgame" id="PLay-now" class="btn ">Play now</a>
              </div>
          </div>
      </div>
  </div>

  <!-- Best Players -->
  <div class="home p-3">
      <h3 class="mb-3">Best Players</h3>
      <div class="row" >
          <!-- Player 1 -->
          <div class="col-lg-6 mb-3">
              <div class="bestplayer d-flex justify-content-between align-items-center  m-2 p-2 rounded">
                  <div class="d-flex align-items-center">
                      <img src="../avatars/avatar5.png" alt="Player 1" class="rounded-circle me-3">
                      <strong>KAMAZLI</strong>
                  </div>
                  <div class="d-flex align-items-center">
                      <span class="me-3">2540PTS</span>
                      <span class="badge bg-success">9.2</span>
                  </div>
              </div>
              <div class="bestplayer d-flex justify-content-between align-items-center m-2 p-2 rounded">
                  <div class="d-flex align-items-center">
                      <img src="../avatars/avatar5.png" alt="Player 1" class="rounded-circle me-3">
                      <strong>KAMAZLI</strong>
                  </div>
                  <div class="d-flex align-items-center">
                      <span class="me-3">2540PTS</span>
                      <span class="badge bg-success">9.2</span>
                  </div>
              </div>
              <div class="bestplayer d-flex justify-content-between align-items-center m-2 p-2 rounded">
                  <div class="d-flex align-items-center">
                      <img src="../avatars/avatar5.png" alt="Player 1" class="rounded-circle me-3">
                      <strong>KAMAZLI</strong>
                  </div>
                  <div class="d-flex align-items-center">
                      <span class="me-3">2540PTS</span>
                      <span class="badge bg-success">9.2</span>
                  </div>
              </div>
              <div class="bestplayer d-flex justify-content-between align-items-center m-2 p-2 rounded">
                  <div class="d-flex align-items-center">
                      <img src="../avatars/avatar5.png" alt="Player 1" class="rounded-circle me-3">
                      <strong>KAMAZLI</strong>
                  </div>
                  <div class="d-flex align-items-center">
                      <span class="me-3">2540PTS</span>
                      <span class="badge bg-success">9.2</span>
                  </div>
              </div>
              <div class="bestplayer d-flex justify-content-between align-items-center m-2 p-2 rounded">
                  <div class="d-flex align-items-center">
                      <img src="../avatars/avatar5.png" alt="Player 1" class="rounded-circle me-3">
                      <strong>KAMAZLI</strong>
                  </div>
                  <div class="d-flex align-items-center">
                      <span class="me-3">2540PTS</span>
                      <span class="badge bg-success">9.2</span>
                  </div>
              </div>
          </div>
          <!-- Player 2 -->
          <div class="col-lg-6 mb-3">
              <div class="bestplayer d-flex justify-content-between align-items-center m-2 p-2 rounded">
                  <div class="d-flex align-items-center">
                      <img src="../avatars/avatar5.png" alt="Player 2" class="rounded-circle me-3">
                      <strong>MOSSCLEF</strong>
                  </div>
                  <div class="d-flex align-items-center">
                      <span class="me-3">2320PTS</span>
                      <span class="badge bg-success">9.0</span>
                  </div>
              </div>
              <div class="bestplayer d-flex justify-content-between align-items-center m-2 p-2 rounded">
                  <div class="d-flex align-items-center">
                      <img src="../avatars/avatar5.png" alt="Player 2" class="rounded-circle me-3">
                      <strong>MOSSCLEF</strong>
                  </div>
                  <div class="d-flex align-items-center">
                      <span class="me-3">2320PTS</span>
                      <span class="badge bg-success">9.0</span>
                  </div>
              </div>
              <div class="bestplayer d-flex justify-content-between align-items-center m-2 p-2 rounded">
                  <div class="d-flex align-items-center">
                      <img src="../avatars/avatar5.png" alt="Player 2" class="rounded-circle me-3">
                      <strong>MOSSCLEF</strong>
                  </div>
                  <div class="d-flex align-items-center">
                      <span class="me-3">2320PTS</span>
                      <span class="badge bg-success">9.0</span>
                  </div>
              </div>
              <div class="bestplayer d-flex justify-content-between align-items-center m-2 p-2 rounded">
                  <div class="d-flex align-items-center">
                      <img src="../avatars/avatar5.png" alt="Player 2" class="rounded-circle me-3">
                      <strong>MOSSCLEF</strong>
                  </div>
                  <div class="d-flex align-items-center">
                      <span class="me-3">2320PTS</span>
                      <span class="badge bg-success">9.0</span>
                  </div>
              </div>
              <div class="bestplayer d-flex justify-content-between align-items-center m-2 p-2 rounded">
                  <div class="d-flex align-items-center">
                      <img src="../avatars/avatar5.png" alt="Player 2" class="rounded-circle me-3">
                      <strong>MOSSCLEF</strong>
                  </div>
                  <div class="d-flex align-items-center">
                      <span class="me-3">2320PTS</span>
                      <span class="badge bg-success">9.0</span>
                  </div>
              </div>
          </div>
          <!-- Player 3, 4, etc. -->
      </div>
  </div>
</div>

<!-- Recent Activity -->
<aside class="col-lg-3" style="font-family: Arial, Helvetica, sans-serif;">
  <div id="card-prf" class="card">
      <div class="d-flex align-items-center mb-3">
          <img src="./avatars/avatar2.png" alt="Profile" class="rounded-circle me-3 w-25 h-25">
          <div>
              <h4 id="text-prf" class="card-title">My Profile</h4>
              <p class="mb-0" style="color:#afa6f7;">SOLIX</p>
              <p class="mb-0" style="color:#afa6f7;">Level 6.18</p>
              <p class="text" style="color:#56fd0d; font-size:15px">+120PTS</p>
          </div>
      </div>
      <p>Last Game: <strong>Won</strong></p>
      <p>Status: <strong>Offline</strong></p>
  </div>

  <div class="activity card m-4 p-3">
      <h4 class="card-title mb-3">Recent Activity</h4>
      <div class="d-flex justify-content-between mb-3">
          <button class="btn btn-outline-light btn-sm">All</button>
          <button class="btn btn-outline-light btn-sm">Friends</button>
      </div>
      <ul class="list-unstyled">
          <li class="d-flex justify-content-between mb-2">
              <span>frankfurter won against schoukous</span>
              <span class="text-muted">10:21 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>mossclef won against tchaibi</span>
              <span class="text-muted">09:30 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>frankfurter won against schoukous</span>
              <span class="text-muted">10:21 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>mossclef won against tchaibi</span>
              <span class="text-muted">09:30 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>frankfurter won against schoukous</span>
              <span class="text-muted">10:21 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>mossclef won against tchaibi</span>
              <span class="text-muted">09:30 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>frankfurter won against schoukous</span>
              <span class="text-muted">10:21 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>mossclef won against tchaibi</span>
              <span class="text-muted">09:30 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>frankfurter won against schoukous</span>
              <span class="text-muted">10:21 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>mossclef won against tchaibi</span>
              <span class="text-muted">09:30 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>frankfurter won against schoukous</span>
              <span class="text-muted">10:21 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>mossclef won against tchaibi</span>
              <span class="text-muted">09:30 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>frankfurter won against schoukous</span>
              <span class="text-muted">10:21 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>mossclef won against tchaibi</span>
              <span class="text-muted">09:30 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>frankfurter won against schoukous</span>
              <span class="text-muted">10:21 AM</span>
          </li>
          <li class="d-flex justify-content-between mb-2">
              <span>mossclef won against tchaibi</span>
              <span class="text-muted">09:30 AM</span>
          </li>
          <!-- Other activity logs -->
      </ul>
  </div>
</aside>
  `;

fetch("http://127.0.0.1:8000/api/profile/", 
{
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: 'include',
})
  .then((response) => response.json())
  .then((data) => 
  {
    console.log(data);
    // const username1 = data.data.username;
    const userName = data.data.username;
    console.log('20');
    console.log(userName);
    // console.log(username1);
    const userNameElement = document.querySelector(".text");
    userNameElement.textContent = userName;
  })
  .catch((error) => 
  {
    console.error("Error fetching user info:", error);
    const userNameElement = document.querySelector(".text");
    userNameElement.textContent = "Guest0";
  });
}
