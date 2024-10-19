import { urlHandler } from "./routes.js";




export function massageScript() 
{
    document.addEventListener('DOMContentLoaded', function() 
    {
        const newMessageButton = document.getElementById("new_message");
     document.getElementById("message").onclick = ghid;

        if (newMessageButton) {
            newMessageButton.onclick = ghid;
        } else {
            console.error("Element with ID 'message' not found.");
        }

        function addMessage(message, sender) {
            const chatBox = document.getElementById('chat-content');
            const messageElement = document.createElement('p');
            if (sender === 'user') {
                messageElement.classList.add('right');
            } else {
                messageElement.classList.add('left');
            }
            
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
        }

        function new_message() {
            const messageInput = document.getElementById('chat-input');
            const message = messageInput.value;
            
            if (message.trim() !== '') {
                addMessage(message, 'user');
                messageInput.value = '';
            }
        }

        const ghid = (e) => {
            console.log("acht sghid");
            new_message();
        };
    });

}

export function showUser()
{
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
            const userNameElement = document.querySelector(".username");
            userNameElement.textContent = userName;
          })
          .catch((error) => 
          {
            console.error("Error fetching user info:", error);
            const userNameElement = document.querySelector(".username");
            userNameElement.textContent = "Guest";
          });
}

export function Showfriend() {
        fetch('http://127.0.0.1:8000/api/users/',
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            const users = data.data; 
            const chatFriendsContainer = document.querySelector('.chat-friends');
            
            chatFriendsContainer.innerHTML = '';
    
            users.forEach(user => {
            const friendDiv = document.createElement('div');
            friendDiv.classList.add('chat-friend');
            
            friendDiv.innerHTML = `
                <img src="../images/profile.png" alt="${user.username}">
                <p>${user.username}</p>
                <span class="${user.status === 'online' ? 'online' : 'offline'}"></span>
            `;
    
            chatFriendsContainer.appendChild(friendDiv);
            });
        })
        .catch(error => console.error('Error fetching users:', error));

}
export function ShowMysettings() {
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
            const userData = data.data;

            document.getElementById('S-firstName').value = userData.first_name;
            document.getElementById('S-lastName').value = userData.last_name;
            document.getElementById('S-email').value = userData.email;
          })
          .catch((error) => 
          {
            console.error("Error fetching user info:", error);
          });
}









export function gameComponent() {
    return (
      header() +
      menu() + 
      gameContent() +
      gameSidebar() +
        showUser()

    )
  }
  
  export function gameSettingComponent() {
      return (
          header() +
          menu() +
          gameSettingContent()
      )
  }
  
  export function homeComponent() {
      return (
          header() +
          menu() +
          homeContent() +
          homeSidebar() +
            showUser()
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
                <img src="images/profile.png" class="header-profile-link" alt="profile">
            </div>
            <div class="header-menu">
                <a href="#" class="profile-link"><i class="fas fa-user"></i> Profile</a>
                <a href="#" class="setting-link"><i class="fas fa-cog" aria-hidden="true"></i> Setting</a>
                <a href="#" class="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>

            <div id="notificationsPanel" class="notifications-panel" w-tid="11">
                <h3 w-tid="13" class="">Friend Requests</h3>
                <div class="notification-list" w-tid="14">
                    <div class="notification-item" w-tid="15">
                        <img src="https://replicate.delivery/yhqm/0RPmhda7lWrbPl8RLpt53DWN2GbsCLx0fEmFqH35yepqKdfmA/out-0.webp" alt="Emma Thompson" class="notification-avatar" w-tid="16" data-image_id="0" alt-rewritten="Portrait photograph of Emma Thompson">
                        <div class="notification-content" w-tid="17">
                            <div class="notification-header" w-tid="18">
                                <div class="notification-name" w-tid="19">Emma Thompson</div>
                                <div class="notification-time" w-tid="20">2 hours ago</div>
                            </div>
                            <div class="notification-info" w-tid="21">Level 42</div>
                            <div class="notification-actions" w-tid="22">
                                <button class="btn btn-accept" w-tid="23">Accept</button>
                                <button class="btn btn-decline" w-tid="24">Decline</button>
                            </div>
                        </div>
                    </div>
                    <div class="notification-item" w-tid="25">
                        <img src="https://replicate.delivery/yhqm/grxAjHAoWSbeQqeKAgRke0EeIkcLwLgHntHJ4zWZ89Brq09NB/out-0.webp" alt="Liam Jackson" class="notification-avatar" w-tid="26" data-image_id="1" alt-rewritten="A professional portrait photograph of Liam Jackson, the company's senior marketing manager.">
                        <div class="notification-content" w-tid="27">
                            <div class="notification-header" w-tid="28">
                                <div class="notification-name" w-tid="29">Liam Jackson</div>
                                <div class="notification-time" w-tid="30">3 hours ago</div>
                            </div>
                            <div class="notification-info" w-tid="31">Level 38 </div>
                            <div class="notification-actions" w-tid="32">
                                <button class="btn btn-accept" w-tid="33">Accept</button>
                                <button class="btn btn-decline" w-tid="34">Decline</button>
                            </div>
                        </div>
                    </div>
                    <div class="notification-item" w-tid="35">
                        <img src="https://replicate.delivery/yhqm/tg9evYIIWesFJUjVbtu5wLM1s5c0QCfeugttl4HEqJCpq09NB/out-0.webp" alt="Sophia Chen" class="notification-avatar" w-tid="36" data-image_id="2" alt-rewritten="Photographic portrait of Sophia Chen, a young woman with short dark hair and a pleasant expression.">
                        <div class="notification-content" w-tid="37">
                            <div class="notification-header" w-tid="38">
                                <div class="notification-name" w-tid="39">Sophia Chen</div>
                                <div class="notification-time" w-tid="40">1 hour ago</div>
                            </div>
                            <div class="notification-info" w-tid="41">Level 55</div>
                            <div class="notification-actions" w-tid="42">
                                <button class="btn btn-accept" w-tid="43">Accept</button>
                                <button class="btn btn-decline" w-tid="44">Decline</button>
                            </div>
                        </div>
                    </div>
                    <div class="notification-item" w-tid="45">
                        <img src="https://replicate.delivery/yhqm/TafaeUNe53XjAIvnlGt37UviChbRy3a7IUeXwBFJhwhvq09NB/out-0.webp" alt="Alex Rodriguez" class="notification-avatar" w-tid="46" data-image_id="3" alt-rewritten="Headshot portrait of baseball player Alex Rodriguez.">
                        <div class="notification-content" w-tid="47">
                            <div class="notification-header" w-tid="48">
                                <div class="notification-name" w-tid="49">Alex Rodriguez</div>
                                <div class="notification-time" w-tid="50">4 hours ago</div>
                            </div>
                            <div class="notification-info" w-tid="51">Level 61 • Paladin • 1 mutual friend</div>
                            <div class="notification-actions" w-tid="52">
                                <button class="btn btn-accept" w-tid="53">Accept</button>
                                <button class="btn btn-decline" w-tid="54">Decline</button>
                            </div>
                        </div>
                    </div>
                    <div class="notification-item" w-tid="55">
                        <img src="https://replicate.delivery/yhqm/KGmkDEJwrrpDFJeDJfwpDu6QicfelR9TxB8Spj8M6U3sq09NB/out-0.webp" alt="Olivia Kim" class="notification-avatar" w-tid="56" data-image_id="4" alt-rewritten="A close-up portrait photograph of a young woman with dark hair, wearing a neutral expression and simple jewelry.">
                        <div class="notification-content" w-tid="57">
                            <div class="notification-header" w-tid="58">
                                <div class="notification-name" w-tid="59">Olivia Kim</div>
                                <div class="notification-time" w-tid="60">5 hours ago</div>
                            </div>
                            <div class="notification-info" w-tid="61">Level 47</div>
                            <div class="notification-actions" w-tid="62">
                                <button class="btn btn-accept" w-tid="63">Accept</button>
                                <button class="btn btn-decline" w-tid="64">Decline</button>
                            </div>
                        </div>
                    </div>
                    <div class="notification-item" w-tid="65">
                        <img src="https://replicate.delivery/yhqm/XwtdiOxla3ryOVa1L7hkyrM57byBeWv0TuzhiuGvWW1VluvJA/out-0.webp" alt="Ethan Patel" class="notification-avatar" w-tid="66" data-image_id="5" alt-rewritten="Headshot portrait photograph of Ethan Patel, a young man with short dark hair and a friendly expression.">
                        <div class="notification-content" w-tid="67">
                            <div class="notification-header" w-tid="68">
                                <div class="notification-name" w-tid="69">Ethan Patel</div>
                                <div class="notification-time" w-tid="70">6 hours ago</div>
                            </div>
                            <div class="notification-info" w-tid="71">Level 53</div>
                            <div class="notification-actions" w-tid="72">
                                <button class="btn btn-accept" w-tid="73">Accept</button>
                                <button class="btn btn-decline" w-tid="74">Decline</button>
                            </div>
                        </div>
                    </div>
                    <div class="notification-item" w-tid="75">
                        <img src="https://replicate.delivery/yhqm/am2x0QVFbv62M5rlQbtWqsbLPvmXUAwrZfQKCjahU3GVluvJA/out-0.webp" alt="Isabella Martinez" class="notification-avatar" w-tid="76" data-image_id="6" alt-rewritten="A friendly, well-lit portrait of Isabella Martinez.">
                        <div class="notification-content" w-tid="77">
                            <div class="notification-header" w-tid="78">
                                <div class="notification-name" w-tid="79">Isabella Martinez</div>
                                <div class="notification-time" w-tid="80">7 hours ago</div>
                            </div>
                            <div class="notification-info" w-tid="81">Level 39</div>
                            <div class="notification-actions" w-tid="82">
                                <button class="btn btn-accept" w-tid="83">Accept</button>
                                <button class="btn btn-decline" w-tid="84">Decline</button>
                            </div>
                        </div>
                    </div>
                    <div class="notification-item" w-tid="85">
                        <img src="https://replicate.delivery/yhqm/aFKxrb3sF86MC1HlId1AfFCEWV7DvUGRvL47q80WelPrKdfmA/out-0.webp" alt="Noah Wilson" class="notification-avatar" w-tid="86" data-image_id="7" alt-rewritten="Headshot portrait of Noah Wilson, a man with short dark hair and a friendly smile.">
                        <div class="notification-content" w-tid="87">
                            <div class="notification-header" w-tid="88">
                                <div class="notification-name" w-tid="89">Noah Wilson</div>
                                <div class="notification-time" w-tid="90">8 hours ago</div>
                            </div>
                            <div class="notification-info" w-tid="91">Level 58</div>
                            <div class="notification-actions" w-tid="92">
                                <button class="btn btn-accept" w-tid="93">Accept</button>
                                <button class="btn btn-decline" w-tid="94">Decline</button>
                            </div>
                        </div>
                    </div>
                    <div class="notification-item" w-tid="95">
                        <img src="https://replicate.delivery/yhqm/la6TLxEjQiIKMxezixTlxSRa80YoidE0OeBzw9jNyAPqKdfmA/out-0.webp" alt="Ava Johnson" class="notification-avatar" w-tid="96" data-image_id="8" alt-rewritten="A professional headshot portrait photograph of Ava Johnson.">
                        <div class="notification-content" w-tid="97">
                            <div class="notification-header" w-tid="98">
                                <div class="notification-name" w-tid="99">Ava Johnson</div>
                                <div class="notification-time" w-tid="100">9 hours ago</div>
                            </div>
                            <div class="notification-info" w-tid="101">Level 45</div>
                            <div class="notification-actions" w-tid="102">
                                <button class="btn btn-accept" w-tid="103">Accept</button>
                                <button class="btn btn-decline" w-tid="104">Decline</button>
                            </div>
                        </div>
                    </div>
                    <div class="notification-item" w-tid="105">
                        <img src="https://replicate.delivery/yhqm/HyRiZOHN3g7EIhLKuCJTgyohftg7Zr0jNzNNuGVzKoqVluvJA/out-0.webp" alt="Mason Lee" class="notification-avatar" w-tid="106" data-image_id="9" alt-rewritten="A close-up portrait photograph of Mason Lee, a young man with dark hair and a neutral facial expression.">
                        <div class="notification-content" w-tid="107">
                            <div class="notification-header" w-tid="108">
                                <div class="notification-name" w-tid="109">Mason Lee</div>
                                <div class="notification-time" w-tid="110">10 hours ago</div>
                            </div>
                            <div class="notification-info" w-tid="111">Level 50</div>
                            <div class="notification-actions" w-tid="112">
                                <button class="btn btn-accept" w-tid="113">Accept</button>
                                <button class="btn btn-decline" w-tid="114">Decline</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `)
}
  
  export function gameSidebar() {
      return (`
          <div class="sidebar">
              <h2>Play With Friends</h2>
              <div class="friends">
                  <div class="friend">
                      <img src="images/profile.png" alt="">
                      <h4>Rida labbiz</h4>
                      <a href="#">Play</a>
                  </div>
  
                  <div class="friend">
                      <img src="images/profile.png" alt="">
                      <h4>Rida labbiz</h4>
                      <a href="#">Play</a>
                  </div>
  
                  <div class="friend">
                      <img src="images/profile.png" alt="">
                      <h4>Rida labbiz</h4>
                      <a href="#">Play</a>
                  </div>
  
                  <div class="friend">
                      <img src="images/profile.png" alt="">
                      <h4>Rida labbiz</h4>
                      <a href="#">Play</a>
                  </div>
  
                  <div class="friend">
                      <img src="images/profile.png" alt="">
                      <h4>Rida labbiz</h4>
                      <a href="#">Play</a>
                  </div>
  
                  <div class="friend">
                      <img src="images/profile.png" alt="">
                      <h4>Rida labbiz</h4>
                      <a href="#">Play</a>
                  </div>
              </div>
          </div>
      `)
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
  
  export function gameContent() {
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
                      
                  </div>
              </div>
  
              <div class="best-players">
                  <h2 class="heading">Best Players</h2>
                  <div class="player">
                      <img src="images/profile.png" alt="" >
                      <h6>KAMAZLI</h6>
                      <p>2540PTS</p>
                      <span>9.2</span>
                  </div>
  
                  <div class="player">
                      <img src="images/profile.png" alt="" >
                      <h6>KAMAZLI</h6>
                      <p>2540PTS</p>
                      <span>9.2</span>
                  </div>
  
                  <div class="player">
                      <img src="images/profile.png" alt="" >
                      <h6>KAMAZLI</h6>
                      <p>2540PTS</p>
                      <span>9.2</span>
                  </div>
  
                  <div class="player">
                      <img src="images/profile.png" alt="" >
                      <h6>KAMAZLI</h6>
                      <p>2540PTS</p>
                      <span>9.2</span>
                  </div>
  
                  <div class="player">
                      <img src="images/profile.png" alt="" >
                      <h6>KAMAZLI</h6>
                      <p>2540PTS</p>
                      <span>9.2</span>
                  </div>
  
                  <div class="player">
                      <img src="images/profile.png" alt="" >
                      <h6>KAMAZLI</h6>
                      <p>2540PTS</p>
                      <span>9.2</span>
                  </div>
              </div>
  
              <div class="last-matches">
                  <h2>Last Matches</h2>
                  <div class="matches">
                      <div class="match win">
                          <img src="images/image 1.png" alt="">
                          <h4>telha</h4>
                          <span>5 : 0</span>
                          <i><img src="images/image 4.png" alt=""></i>
                      </div>
  
                      <div class="match lose">
                          <img src="images/image 1.png" alt="">
                          <h4>telha</h4>
                          <span>5 : 0</span>
                          <i><img src="images/image 6.png" alt=""></i>
                      </div>
  
                      <div class="match win">
                          <img src="images/image 1.png" alt="">
                          <h4>telha</h4>
                          <span>5 : 0</span>
                          <i><img src="images/image 4.png" alt=""></i>
                      </div>
  
                      <div class="match win">
                          <img src="images/image 1.png" alt="">
                          <h4>telha</h4>
                          <span>5 : 0</span>
                          <i><img src="images/image 4.png" alt=""></i>
                      </div>
  
                      <div class="match win">
                          <img src="images/image 1.png" alt="">
                          <h4>telha</h4>
                          <span>5 : 0</span>
                          <i><img src="images/image 4.png" alt=""></i>
                      </div>
  
                      <div class="match lose">
                          <img src="images/image 1.png" alt="">
                          <h4>telha</h4>
                          <span>5 : 0</span>
                          <i><img src="images/image 6.png" alt=""></i>
                      </div>
                  </div>
              </div>
          </div>    
      `)
  }
  
  export function gameStartingComponent() {
      return (`
          <div class="classic-game">
              <h2>Wait for other player</h2>
              <div class="waiting">
                  <div class="waiting__player">
                      <div class="image-cover">
                          <img src="images/profile.png" alt="">
                      </div>
                      <h4>Rlabbiz</h4>
                  </div>
                  <div class="waiting__player">
                      <div class="image-cover">
                          <!-- <img src="images/profile.png" alt=""> -->
                      </div>
                      <h4>waiting...</h4>
                  </div>
              </div>
              <a href="#">Cancel</a>
          </div>    
      `)
  }
  
  export function gameAiComponent() {
      return (`
          <div class="game-container">
              <i class="fas fa-times"></i>
              <div class="player-field">
                  <img src="images/profile.png" alt="">
                  <h4>Player</h4>
              </div>
              <canvas id="pong" width="950px" height="500"></canvas>
              <div class="player-field">
                  <img src="images/profile.png" alt="">
                  <h4>Player</h4>
              </div>
          </div>
      `)
  }
  
  export function gameSettingContent() {
      return (`
          <div class="game-settings">
              <h2>Game Settings</h2>
              <div class="settings">
                  <div class="player">
                      <h4>Player</h4>
                      <div class="direction">
                          <span>Left</span>
                          <span class="active">Default</span>
                          <span>Right</span>
                      </div>
                      <div class="color">
                          <span class="red" color="red"></span>
                          <span class="green" color="green"></span>
                          <span class="blue" color="blue"></span>
                      </div>
                  </div>
  
                  <div class="ball">
                      <h4>Ball</h4>
                      <div class="color">
                          <span class="red" color="red"></span>
                          <span class="green" color="green"></span>
                          <span class="blue" color="blue"></span>
                      </div>
                  </div>
  
                  <div class="net">
                      <h4>Net</h4>
                      <div class="direction">
                          <span class="active" direction="0">-------</span>
                          <span direction="1">~~~~~~~</span>
                      </div>
                      <div class="color">
                          <span class="red" color="red"></span>
                          <span class="green" color="green"></span>
                          <span class="blue" color="blue"></span>
                      </div>
                  </div>
  
                  <div class="table">
                      <h4>Table</h4>
                      <div class="color">
                          <span class="red" color="red"></span>
                          <span class="green" color="green"></span>
                          <span class="blue" color="blue"></span>
                      </div>
                  </div>
              </div>
              <div class="live-settings">
                  <h4>Live Settings</h4>
                  <canvas id="game-setting-canvas"></canvas>
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
                          <img src="images/profile.png" alt="profile">
                          <div class="status">
                              <h4 class="username">SOLIX</h4>
                              <p>Level 6.18</p>
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
                      
                  </div>
              </div>
          </div>
      `)
  }
  
  
//   export function SingInComponent() {
//     return (`
//       <div class="sing-forms">
//           <div class="logo">
//               <img src="../images/logo.png" alt="logo" />
//           </div>
//           <div class="form">
//               <div class="form-titles">
//                   <h4 class="active singin">Sign In</h4>
//                   <h4 class="singup">Sign Up</h4>
//               </div>
//               <div class="form-inputs">
//                   <form action="/singup" method="post">
//                       <div class="filed">
//                           <label for="userName"><i class="far fa-user-circle"></i></label>
//                           <input type="text" id="userName" name="userName" placeholder="Username" required />
//                       </div>
//                       <div class="filed">
//                           <label for="password"><i class="fas fa-lock"></i></label>
//                           <input type="password" id="password" name="password" placeholder="Password" required />
//                       </div>
//                       <button type="submit-singup">Sign In <i class="fas fa-sign-in-alt"></i></button>
//                   </form>
//                   <div class="form-social">
//                       <div class="line">
//                           <span> OR </span>
//                       </div>
//                       <div class="social-icons">
//                           <a class="intra" href="#"><img src="../images/42intra.png" alt="42 intra" /> Sing up with 42 Intra</a>
//                           <a class="github" href="#"><img src="../images/github.png" alt="42 intra" /> Sing up with Github</a>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </div>
//     `);
// }


// export function SingUpComponent() {
//     return (`
//       <div class="sing-forms">
//           <div class="logo">
//               <img src="../images/logo.png" alt="logo" />
//           </div>
//           <div class="form">
//               <div class="form-titles">
//                   <h4 class="singin">Sign In</h4>
//                   <h4 class="active singup">Sign Up</h4>
//               </div>
//               <div class="form-inputs">
//                   <form action="/singup" method="post">
//                       <div class="filed">
//                           <label for="firstName"><i class="far fa-user-circle"></i></label>
//                           <input type="text" id="firstName" name="firstName" placeholder="First Name" required/>
//                       </div>
//                       <div class="filed">
//                           <label for="lastName"><i class="far fa-user-circle"></i></label>
//                           <input type="text" id="lastName" name="lastName" placeholder="Last Name" required />
//                       </div>
//                       <div class="filed">
//                           <label for="userName"><i class="far fa-user-circle"></i></label>
//                           <input type="text" id="userName" name="userName" placeholder="Username" required />
//                       </div>
//                       <div class="filed">
//                           <label for="email"><i class="fas fa-at"></i></label>
//                           <input type="email" id="email" name="email" placeholder="Email" required />
//                       </div>
//                       <div class="filed">
//                           <label for="password"><i class="fas fa-lock"></i></label>
//                           <input type="password" id="password" name="password" placeholder="Password" required />
//                       </div>
//                       <div class="filed">
//                           <label for="re-password"><i class="fas fa-check"></i></label>
//                           <input type="password" id="re-password" name="re-password" placeholder="Confirm Password" required />
//                       </div>
  
//                       <div class="chose-avatar">
//                           <div class="title">
//                               <h4>Choose an Avatar: </h4>
//                           </div>
//                           <div class="avatars">
//                               <img class="active" src="../images/avatars/avatar1.webp" alt="avatar1" />
//                               <img src="../images/avatars/avatar2.webp" alt="avatar1" />
//                               <img src="../images/avatars/avatar3.webp" alt="avatar1" />
//                               <img src="../images/avatars/avatar4.webp" alt="avatar1" />
//                           </div>
//                       </div>
  
//                       <div class="upload-avatar">
//                           <div class="title">
//                               <h4><label for="avatar-input">Or upload your own: </label></h4>
//                           </div>
//                           <label class="choose-label" for="avatar-input">Choose File</i></label>
//                           <input type="file" id="avatar-input" name="avatar" accept="image/*" />
//                       </div>
//                       <button type="submit-singup">Sign Up <i class="fas fa-user-plus"></i></button>
//                   </form>
//                   <div class="form-social">
//                       <div class="line">
//                           <span> OR </span>
//                       </div>
//                       <div class="social-icons">
//                           <a class="intra" href="#"><img src="../images/42intra.png" alt="42 intra" /> Sing up with 42 Intra</a>
//                           <a class="github" href="#"><img src="../images/github.png" alt="42 intra" /> Sing up with Github</a>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </div>
//     `);
//   }
//   export function singupScript() {
//       const avatarInput = document.querySelectorAll('.avatars img');
//       if (avatarInput) {
//           avatarInput.forEach((avatar) => {
//               avatar.addEventListener('click', function (e) {
//                   avatarInput.forEach((avatar) => {
//                       avatar.classList.remove('active');
//                   });
//                   e.target.classList.add('active');
//               })
//           })
//       }
//   }


  export function gameTournamentComponent() {
    return (`
        <div class="tournament-component">
            <h2> <i class="fas fa-arrow-left" title="Back To Game"></i> PING PONG Tournament hub</h2>
            <div class="options">
                <div class="option create">
                    <h3> create tournament </h3>
                    <p> Launch a new 4 or 8 player showdown </p>
                </div>
                <div class="option join">
                    <h3> JOIN TOURNAMENT </h3>
                    <p> Enter an existing battle or use an ID </p>
                </div>
            </div>
            <div class="create-tournament" id="createTournament" w-tid="15">
                <h3 w-tid="16">Create New Tournament</h3>
                <select id="playerCount" w-tid="17">
                    <option value="4" w-tid="18">4 Players - Quick Clash</option>
                    <option value="8" w-tid="19">8 Players - Epic Showdown</option>
                </select>
                <input type="text" id="tournamentName" placeholder="Give your tournament an epic name" w-tid="20">
                <button onclick="createNewTournament()" w-tid="21">Launch Tournament</button>
            </div>

            <div class="join-tournament" id="joinTournament" w-tid="22">
                <h3 w-tid="23">Join Tournament</h3>
                <input type="text" id="tournamentId" placeholder="Enter Tournament ID to join the fray" w-tid="24">
                <button onclick="joinTournamentById()" w-tid="25">Join by ID</button>
                
                <div class="tournament-list" id="tournamentList" w-tid="26" style="display: block;">
                    <div class="tournament-item" id="first-mode">
                        <span>Paddle Fury </span>
                        <p>4/8</p>
                        <button class="join-button" onclick="joinTournament('T001')">Enter Arena</button>
                    </div>
                    <div class="tournament-item" id="first-mode">
                        <span>Table Titans</span>
                        <p>5/8</p>
                        <button class="join-button" onclick="joinTournament('T002')">Enter Arena</button>
                    </div>
                    <div class="tournament-item" id="second-mode">
                        <span>Spin Masters</span>
                        <p>3/4</p>
                        <button class="join-button" onclick="joinTournament('T003')">Enter Arena</button>
                    </div>
                    <div class="tournament-item" id="first-mode">
                        <span>Ping Pong Legends</span>
                        <p>6/8</p>
                        <button class="join-button" onclick="joinTournament('T004')">Enter Arena</button>
                    </div>
                </div>
            </div>
        </div>
    `)
}

export function tournamentScript() {
    const joinTournamentButtom = document.querySelector('.tournament-component .options .join');
    const createTournamentButtom = document.querySelector('.tournament-component .options .create');
    const createTournament = document.getElementById('createTournament');
    const joinTournament = document.getElementById('joinTournament');

    if (joinTournamentButtom) {
        joinTournamentButtom.addEventListener('click', () => {
            createTournament.style.display = 'none';
            joinTournament.style.display = 'block';
        });
    }

    if (createTournamentButtom) {
        createTournamentButtom.addEventListener('click', () => {
            createTournament.style.display = 'block';
            joinTournament.style.display = 'none';
        });
    }

    const backToGame = document.querySelectorAll('.tournament-component h2 i');
    if (backToGame) {
        backToGame.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                history.pushState(null, null, '/game');
                urlHandler();
            })
        })
    }

    const firstMode = document.querySelectorAll('.tournament-list #first-mode');
    if (firstMode) {
        firstMode.forEach(mode => {
            mode.addEventListener('click', function () {
                history.pushState(null, null, '/first-mode');
                urlHandler();
            })
        })
    }

    const secondMode = document.querySelectorAll('.tournament-list #second-mode');
    if (secondMode) {
        secondMode.forEach(mode => {
            mode.addEventListener('click', function () {
                history.pushState(null, null, '/second-mode');
                urlHandler();
            })
        })
    }
}







export function firstModeComponent() {
    return (`
        <div class="first-mode">
            <h2>ping Pong masters</h2>
            <div class="tournament-info" w-tid="8">
                Tournament ID: <span id="tournamentId" w-tid="9">PPM2023</span>
                <button class="copy-button" onclick="copyTournamentId()" w-tid="10">Copy ID</button>
            </div>
            <div class="bracket" w-tid="11">
                <div class="round" id="round1" w-tid="12">
                    <div class="match in-progress" w-tid="13">
                        <div class="player winner" w-tid="14">
                            <span class="player-name" w-tid="15">Alice</span>
                            <span class="player-score" w-tid="16">11</span>
                        </div>
                        <div class="player" w-tid="17">
                            <span class="player-name" w-tid="18">Bob</span>
                            <span class="player-score" w-tid="19">4</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="20"></div>
                        <div class="paddle paddle-right" w-tid="21"></div>
                        <div class="ball" w-tid="22"></div>
                    </div>
                    <div class="match in-progress" w-tid="23">
                        <div class="player winner" w-tid="24">
                            <span class="player-name" w-tid="25">Charlie</span>
                            <span class="player-score" w-tid="26">11</span>
                        </div>
                        <div class="player" w-tid="27">
                            <span class="player-name" w-tid="28">David</span>
                            <span class="player-score" w-tid="29">5</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="30"></div>
                        <div class="paddle paddle-right" w-tid="31"></div>
                        <div class="ball" w-tid="32"></div>
                    </div>
                    <div class="match in-progress" w-tid="33">
                        <div class="player" w-tid="34">
                            <span class="player-name" w-tid="35">Eve</span>
                            <span class="player-score" w-tid="36">6</span>
                        </div>
                        <div class="player winner" w-tid="37">
                            <span class="player-name" w-tid="38">Frank</span>
                            <span class="player-score" w-tid="39">11</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="40"></div>
                        <div class="paddle paddle-right" w-tid="41"></div>
                        <div class="ball" w-tid="42"></div>
                    </div>
                    <div class="match in-progress" w-tid="43">
                        <div class="player winner" w-tid="44">
                            <span class="player-name" w-tid="45">Grace</span>
                            <span class="player-score" w-tid="46">11</span>
                        </div>
                        <div class="player" w-tid="47">
                            <span class="player-name" w-tid="48">Henry</span>
                            <span class="player-score" w-tid="49">5</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="50"></div>
                        <div class="paddle paddle-right" w-tid="51"></div>
                        <div class="ball" w-tid="52"></div>
                    </div>
                </div>
                <div class="round" id="round2" w-tid="53">
                    <div class="match in-progress" w-tid="54">
                        <div class="player" w-tid="55">
                            <span class="player-name advanced" w-tid="56">Alice</span>
                            <span class="player-score" w-tid="57">10</span>
                        </div>
                        <div class="player" w-tid="58">
                            <span class="player-name advanced" w-tid="59">Charlie</span>
                            <span class="player-score" w-tid="60">9</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="61"></div>
                        <div class="paddle paddle-right" w-tid="62"></div>
                        <div class="ball" w-tid="63"></div>
                    </div>
                    <div class="match in-progress" w-tid="64">
                        <div class="player" w-tid="65">
                            <span class="player-name advanced" w-tid="66">Grace</span>
                            <span class="player-score" w-tid="67">10</span>
                        </div>
                        <div class="player" w-tid="68">
                            <span class="player-name advanced" w-tid="69">Frank</span>
                            <span class="player-score" w-tid="70">8</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="71"></div>
                        <div class="paddle paddle-right" w-tid="72"></div>
                        <div class="ball" w-tid="73"></div>
                    </div>
                </div>
                <div class="round" id="round3" w-tid="74">
                    <div class="match" w-tid="75">
                        <div class="player" w-tid="76">
                            <span class="player-name" w-tid="77">TBD</span>
                            <span class="player-score" w-tid="78">0</span>
                        </div>
                        <div class="player" w-tid="79">
                            <span class="player-name" w-tid="80">TBD</span>
                            <span class="player-score" w-tid="81">0</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="82"></div>
                        <div class="paddle paddle-right" w-tid="83"></div>
                        <div class="ball" w-tid="84"></div>
                    </div>
                </div>
            </div>
            <button class="bottom-leave-button" w-tid="86">Leave Tournament</button>
        </div>
    `)
}

export function secondModeComponent() {
    return (`
        <div class="first-mode">
            <h2>ping Pong masters</h2>
            <div class="tournament-info" w-tid="8">
                Tournament ID: <span id="tournamentId" w-tid="9">PPM2023</span>
                <button class="copy-button" w-tid="10">Copy ID</button>
            </div>
            <div class="bracket" w-tid="11">
                <div class="round" id="round2" w-tid="53">
                    <div class="match in-progress" w-tid="54">
                        <div class="player" w-tid="55">
                            <span class="player-name advanced" w-tid="56">Alice</span>
                            <span class="player-score" w-tid="57">10</span>
                        </div>
                        <div class="player" w-tid="58">
                            <span class="player-name advanced" w-tid="59">Charlie</span>
                            <span class="player-score" w-tid="60">9</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="61"></div>
                        <div class="paddle paddle-right" w-tid="62"></div>
                        <div class="ball" w-tid="63"></div>
                    </div>
                    <div class="match in-progress" w-tid="64">
                        <div class="player" w-tid="65">
                            <span class="player-name advanced" w-tid="66">Grace</span>
                            <span class="player-score" w-tid="67">10</span>
                        </div>
                        <div class="player" w-tid="68">
                            <span class="player-name advanced" w-tid="69">Frank</span>
                            <span class="player-score" w-tid="70">8</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="71"></div>
                        <div class="paddle paddle-right" w-tid="72"></div>
                        <div class="ball" w-tid="73"></div>
                    </div>
                </div>
                <div class="round" id="round3" w-tid="74">
                    <div class="match" w-tid="75">
                        <div class="player" w-tid="76">
                            <span class="player-name" w-tid="77">TBD</span>
                            <span class="player-score" w-tid="78">0</span>
                        </div>
                        <div class="player" w-tid="79">
                            <span class="player-name" w-tid="80">TBD</span>
                            <span class="player-score" w-tid="81">0</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="82"></div>
                        <div class="paddle paddle-right" w-tid="83"></div>
                        <div class="ball" w-tid="84"></div>
                    </div>
                </div>
            </div>
            <button class="bottom-leave-button" w-tid="86">Leave Tournament</button>
        </div>
    `)
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {}
}

export function tournamentModesScript() {
    const leaveTournamentButton = document.querySelector('.first-mode .bottom-leave-button');
    if (leaveTournamentButton) {
        leaveTournamentButton.addEventListener('click', function () {
            history.pushState(null, null, '/tournament');
            urlHandler();
        })
    }

    const copyButton = document.querySelector('.first-mode .copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', function () {
            const tournamentId = document.querySelector('.first-mode .tournament-info span').innerText;
            copyToClipboard(tournamentId);
        })
    }
}




export function ChatComponent() {
    return (
        header() +
        menu() +
        chatContent() +
        Showfriend() 
    )
}

export function chatContent() {
    return (`
        <div class="chat">
            <div class="chat-header">
                <div class="chat-profile">
                    <img src="../images/profile.png" alt="friend">
                    <p>rlabbiz</p>
                </div>
            </div>

            <div class="chat-friends">
                <div class="chat-friend">
                    <img src="../images/profile.png" alt="friend">
                    <p>rlabbiz</p>
                    <span class="online"></span>
                </div>
                <div class="chat-friend">
                    <img src="../images/profile.png" alt="friend">
                    <p>rlabbiz</p>
                    <span class="online"></span>
                </div>  
                <div class="chat-friend">
                    <img src="../images/profile.png" alt="friend">
                    <p>rlabbiz</p>
                    <span class="offline"></span>
                </div>
                <div class="chat-friend">
                    <img src="../images/profile.png" alt="friend">
                    <p>rlabbiz</p>
                    <span class="offline"></span>
                </div>  
            </div>

            <div id="chat-content" class="chat-content">
                <div class="right">
                    <p>hey, how are you? hey, how are you? hey, how are you? </p>
                </div>
                <div class="left">
                    <p>hey, how are you? hey, </p>
                </div>
            </div>

            <div class="chat-input">
                <input id="input-box" type="text" placeholder="Type a message...">
                <button id="message" type="submit"> Send </button>
            </div>
        </div>
    `)
}



// import { header, menu } from '../scripts/components.js'

export function accountSettingComponent() {
    return (
        header() +
        menu() +
        accountSettingContent() +
        ShowMysettings()
    )
}


export function accountSettingContent() {
    return (`
        <div class="account-setting">
            <div class="setting-group">
                <img src="https://page-images.websim.ai/Current profile picture_1024x1024xemJ2jr7UINRqya9Hdx9654623cf1966.jpg" alt="Current profile picture" class="profile-pic" id="profilePic" data-image_id="0" alt-rewritten="Current profile picture">
                <input id="setting-upload" type="file" id="avatarUpload" style="display: none;" accept="image/*">
                <label for="setting-upload" class="upload-btn">Upload Avatar</label>
                
                <div class="avatar-selection">
                    <img src="https://page-images.websim.ai/Avatar option 1_1024x1024xemJ2jr7UINRqya9Hdxa0371ad0442e3.jpg" alt="Avatar option 1" class="avatar-option" data-image_id="1" alt-rewritten="An illustrated avatar icon in a simple, cartoon-like style.">
                    <img src="https://page-images.websim.ai/Avatar option 2_1024x1024xemJ2jr7UINRqya9Hdx50b29b899b783.jpg" alt="Avatar option 2" class="avatar-option" data-image_id="2" alt-rewritten="A simple, stylized digital avatar illustration of a head with basic facial features.">
                    <img src="https://page-images.websim.ai/Avatar option 3_1024x1024xemJ2jr7UINRqya9Hdx6b1540d5d67c9.jpg" alt="Avatar option 3" class="avatar-option" data-image_id="3" alt-rewritten="Illustrated avatar profile picture, simple stylized portrait.">
                    <img src="https://page-images.websim.ai/Avatar option 4_1024x1024xemJ2jr7UINRqya9Hdx0f7f690b93205.jpg" alt="Avatar option 4" class="avatar-option" data-image_id="4" alt-rewritten="Avatar option 4">
                </div>
            </div>

            <div class="setting-group">
                <div class="setting-item">
                    <label for="firstName">First Name</label>
                    <input type="text" id="S-firstName" name="firstName" value="John">
                </div>
                <div class="setting-item">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="S-lastName" name="lastName" value="Doe">
                </div>
            </div>

            <div class="setting-group">
                <div class="setting-item">
                    <label for="email">Email</label>
                    <input type="email" id="S-email" name="email" value="john.doe@example.com">
                </div>
                <div class="setting-item">
                    <label for="newPassword">New Password (leave blank if unchanged)</label>
                    <input type="password" id="newPassword" name="newPassword" placeholder="Enter new password">
                </div>
            </div>
            <button type="button" class="save-btn" onclick="showPasswordModal()">Save Changes</button>
        </div>

        <div id="passwordModal" class="modal">
            <div class="modal-content">
                <span class="close">×</span>
                <h2>Confirm Changes</h2>
                <p>Please enter your current password to save changes:</p>
                <input type="password" id="currentPassword" placeholder="Current Password" style="display: block; margin: 20px auto;">
                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                    <button class="save-btn" onclick="saveChanges()" style="margin-top: 0;">Confirm</button>
                    <button class="save-btn" style="margin-top: 0; background-color: #FF6B6B;">Cancel</button>
                </div>
            </div>
        </div>
        
    `)
}


export function friendsComponent() {
    return (
        header() +
        menu() +
        friendsContent()
    )
}

export function friendsContent() {
    return (`
    <div class="friends-list" w-tid="6">
        <div class="friend-header" w-tid="7">
            <h2 w-tid="8">Friends Hub</h2>
            <div class="friend-stats" w-tid="9">
                <div class="stat-card" w-tid="10">
                    <div class="stat-number" w-tid="11">247</div>
                    <div class="stat-label" w-tid="12">Total Friends</div>
                </div>
                <div class="stat-card" w-tid="13">
                    <div class="stat-number" w-tid="14">42</div>
                    <div class="stat-label" w-tid="15">Online Now</div>
                </div>
                <div class="stat-card" w-tid="16">
                    <div class="stat-number" w-tid="17">15</div>
                    <div class="stat-label" w-tid="18">New Requests</div>
                </div>
            </div>
            <div class="search-bar" w-tid="19">
                <input type="text" class="search-input" placeholder="Search friends..." w-tid="20">
            </div>
        </div>
        
        <h3 w-tid="21">Friend Requests</h3>
        <div class="friend-requests" w-tid="22">
            <div class="friend-card" w-tid="23" style="display: flex;">
                <div class="friend-info" w-tid="24">
                    <div class="friend-avatar-container" w-tid="25">
                        <img src="https://page-images.websim.ai/Emma Thompson_1024x545xrRI3XTSKVNalK1uIDx9a8ecd4bb73c4.jpg" alt="Emma Thompson" class="friend-avatar" w-tid="26" data-image_id="0" alt-rewritten="A charming headshot portrait of the acclaimed actress Emma Thompson.">
                    </div>
                    <div class="friend-details" w-tid="27">
                        <div class="friend-name" w-tid="28">Emma Thompson</div>
                        <div class="friend-level" w-tid="29">Level: 23</div>
                        <div class="friend-registered" w-tid="30">Registered: June 7, 2023</div>
                        <div class="friend-message" w-tid="32">"Hey there! I saw you in the Mystic Forest. Want to team up?"</div>
                    </div>
                </div>
                <div class="friend-actions" w-tid="33">
                    <button class="btn btn-accept" w-tid="34">Accept</button>
                    <button class="btn btn-decline" w-tid="35">Decline</button>
                </div>
            </div>
            <div class="friend-card" w-tid="36" style="display: flex;">
                <div class="friend-info" w-tid="37">
                    <div class="friend-avatar-container" w-tid="38">
                        <img src="https://page-images.websim.ai/Ryan Garcia_1024x563xrRI3XTSKVNalK1uIDxf0d7043044806.jpg" alt="Ryan Garcia" class="friend-avatar" w-tid="39" data-image_id="1" alt-rewritten="Ryan Garcia, a young boxer with a determined expression, stands in boxing stance within a visually striking black and white portrait photograph.">
                    </div>
                    <div class="friend-details" w-tid="40">
                        <div class="friend-name" w-tid="41">Ryan Garcia</div>
                        <div class="friend-level" w-tid="42">Level: 37</div>
                        <div class="friend-registered" w-tid="43">Registered: April 15, 2023</div>
                        <div class="friend-message" w-tid="45">"I'm looking for a guild mate. Interested in joining forces?"</div>
                    </div>
                </div>
                <div class="friend-actions" w-tid="46">
                    <button class="btn btn-accept" w-tid="47">Accept</button>
                    <button class="btn btn-decline" w-tid="48">Decline</button>
                </div>
            </div>
        </div>

        <h3 w-tid="49">Friends List</h3>
        <div class="friends-list" w-tid="50">
            <div class="friend-card" w-tid="51" style="display: flex;">
                <div class="friend-info" w-tid="52">
                    <div class="friend-avatar-container" w-tid="53">
                        <img src="https://page-images.websim.ai/Alex Johnson_1024x563xrRI3XTSKVNalK1uIDx6bb1960e75e23.jpg" alt="Alex Johnson" class="friend-avatar" w-tid="54" data-image_id="2" alt-rewritten="A friendly, warm-toned portrait of Alex Johnson, a close friend.">
                        <div class="status-indicator status-online" w-tid="55"></div>
                    </div>
                    <div class="friend-details" w-tid="56">
                        <div class="friend-name" w-tid="57">Alex Johnson</div>
                        <div class="friend-level" w-tid="58">Level: 42</div>
                        <div class="friend-registered" w-tid="59">Registered: May 15, 2022</div>
                    </div>
                </div>
                <div class="friend-actions" w-tid="60">
                    <button class="btn btn-message" w-tid="61">Send Message</button>
                    <button class="btn btn-remove" w-tid="62">Remove Friend</button>
                </div>
            </div>
            <div class="friend-card" w-tid="63" style="display: flex;">
                <div class="friend-info" w-tid="64">
                    <div class="friend-avatar-container" w-tid="65">
                        <img src="https://page-images.websim.ai/Sarah Lee_1024x563xrRI3XTSKVNalK1uIDxaafb1fa6d9b7.jpg" alt="Sarah Lee" class="friend-avatar" w-tid="66" data-image_id="3" alt-rewritten="A casual portrait photograph of Sarah Lee, a smiling woman with shoulder-length brown hair against a plain background.">
                        <div class="status-indicator status-offline" w-tid="67"></div>
                    </div>
                    <div class="friend-details" w-tid="68">
                        <div class="friend-name" w-tid="69">Sarah Lee</div>
                        <div class="friend-level" w-tid="70">Level: 78</div>
                        <div class="friend-registered" w-tid="71">Registered: January 3, 2021</div>
                    </div>
                </div>
                <div class="friend-actions" w-tid="73">
                    <button class="btn btn-message" w-tid="74">Send Message</button>
                    <button class="btn btn-remove" w-tid="75">Remove Friend</button>
                </div>
            </div>
            <div class="friend-card" w-tid="76" style="display: flex;">
                <div class="friend-info" w-tid="77">
                    <div class="friend-avatar-container" w-tid="78">
                        <img src="https://page-images.websim.ai/Mike Brown_1024x563xrRI3XTSKVNalK1uIDx0d5812386f5ff.jpg" alt="Mike Brown" class="friend-avatar" w-tid="79" data-image_id="4" alt-rewritten="&quot;A friendly portrait photograph of Mike Brown, a smiling middle-aged man with short brown hair and a casual t-shirt.&quot;">
                        <div class="status-indicator status-online" w-tid="80"></div>
                    </div>
                    <div class="friend-details" w-tid="81">
                        <div class="friend-name" w-tid="82">Mike Brown</div>
                        <div class="friend-level" w-tid="83">Level: 31</div>
                        <div class="friend-registered" w-tid="84">Registered: August 20, 2022</div>
                    </div>
                </div>
                <div class="friend-actions" w-tid="85">
                    <button class="btn btn-message" w-tid="86">Send Message</button>
                    <button class="btn btn-remove" w-tid="87">Remove Friend</button>
                </div>
            </div>
        </div>
    </div>
    `)
}

