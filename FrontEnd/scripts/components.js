import { globalState, fetchProfile } from './fetchData.js';

export async function gameComponent() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch data`);
    }

  return (
    header() +
    menu() + 
    gameContent() +
    gameSidebar()
  )
}

export async function gameSettingComponent() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch data`);
    }

    return (
        header() +
        menu() +
        gameSettingContent()
    )
}


export async function homeComponent() {
    if (!globalState.user) {
        await fetchProfile();
    }
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


export async function gameAiComponent() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch data`);
    }

    return (`
        <div class="game-container">
            <div id="countdown">5</div>
            <div id="game-cover"></div>
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
                        <img src="" alt="profile">
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