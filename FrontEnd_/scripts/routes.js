import { setUpEvent } from './script.js';
import { gameComponent } from './components.js';
import { gameStartingComponent, gameStartingComponentScript } from '../components/gameWaiting.js';
import { gameTournamentComponent, tournamentScript } from '../components/tournament.js';
import { gameAiComponent } from './components.js';
import { gameScriptAi } from './game.js';
import { gameSettingScript } from './game.js';
import { gameSettingComponent } from './components.js';
import { homeComponent, chartScript } from './components.js';
import { SingUpComponent } from '../components/singup.js';
import { singupScript } from '../components/singup.js';
import { SingInComponent, SingUpComponentScript } from '../components/singin.js';
import { ChatComponent, chatScript } from '../components/chat.js';
import { firstModeComponent, secondModeComponent, tournamentModesScript } from '../components/tournamentModes.js';
import { accountSettingComponent, accountSettingScript } from '../components/accountSetting.js';
import { friendsComponent, friendsScript } from '../components/friends.js';
import { profileComponent } from '../components/profile.js';
import { gameOnlineComponent, gameOnlineScript } from '../components/play.js';
import { searchComponent, searchComponentEvents } from '../components/search.js';
import { ticTacComponent } from '../components/ticTac.js';
import { globalState } from './fetchData.js';

function loadingSpinner() {
    // check if page is singin page, if so, return
    const snniper = document.querySelector('.loading-container');
    const site = document.querySelector('.site');
    if (globalState.onlineUsers || window.location.pathname === '/singin' || window.location.pathname === '/singup') {
        if (snniper) {
            snniper.style.display = 'none';
            site.style.display = 'grid';
        }
    } else {
        // // calback after 1s
        snniper.style.display = 'block';
        site.style.display = 'none';        
        setTimeout(loadingSpinner, 100);
    }
}

export async function urlHandler() {
    loadingSpinner();
    const routeName = window.location.pathname;
    const site = document.querySelector('.site');
    
    // check if user if logged in or not, if not redirect to login page
    if (routeName !== '/singin' && routeName !== '/singup') {
        // check refresh_token if exitst in cookies
        if (document.cookie.indexOf('access_token' + '=') === -1) {
            history.pushState(null, null, '/singin');
            await urlHandler();
            return;
        }
    }

    switch (routeName) {
        case '/':
            site.innerHTML = await homeComponent();
            site.classList = 'site gameComponent';
            chartScript();
            break;
        case '/index.html':
            site.innerHTML = await homeComponent();
            site.classList = 'site gameComponent';
            chartScript();
            break;
        case '/game':
            site.innerHTML = await gameComponent();
            site.classList = 'site gameComponent';
            break;
        case '/game_starting':
            site.innerHTML = await gameStartingComponent();
            site.classList = 'site';
            gameStartingComponentScript();
            break;
        case '/tournament':
            site.innerHTML = await gameTournamentComponent();
            site.classList = 'site';
            tournamentScript();
            break;
        case '/ai':
            site.innerHTML = await gameAiComponent();
            site.classList = 'site';
            gameScriptAi();
            break;
        case '/game_setting':
            site.innerHTML = await gameSettingComponent();
            site.classList = 'site game-setting-layout';
            gameSettingScript();
            break;
        case '/singup':
            site.innerHTML = SingUpComponent();
            site.classList = 'site';
            singupScript();
            break;
        case '/singin':
            site.innerHTML = SingInComponent();
            site.classList = 'site';
            SingUpComponentScript();
            break;
        case '/chat':
            site.innerHTML = await ChatComponent();
            site.classList = 'site chat-layout';
            await chatScript();
            break;
        case '/first-mode':
            site.innerHTML = await firstModeComponent();
            site.classList = 'site';
            tournamentModesScript();
            break;
        case '/second-mode':
            site.innerHTML = await secondModeComponent();
            site.classList = 'site';
            tournamentModesScript();
            break;
        case '/account_settings':
            site.innerHTML = await accountSettingComponent();
            site.classList = 'site account-setting-layout';
            await accountSettingScript()
            break;
        case '/friends':
            site.innerHTML = await friendsComponent();
            site.classList = 'site friends-layout';
            await searchComponentEvents();
            await friendsScript();
            break;
        case '/profile':
            site.innerHTML = await profileComponent();
            site.classList = 'site profile-layout';
            await searchComponentEvents();
            break;

        case '/play':
            site.innerHTML = await gameOnlineComponent();
            site.classList = 'site';
            gameOnlineScript();
            break;

        case '/search':
            site.innerHTML = await searchComponent();
            site.classList = 'site friends-layout';
            await searchComponentEvents();
            break;

        case '/tic-tac':
            site.innerHTML = await ticTacComponent();
            site.classList = 'site ';
            break;
        
        default:
            site.innerHTML = `
                <h2>404 Page Not Found</h2>
            `;
            site.classList = 'site';
    }
    setUpEvent();
}

window.addEventListener('load', urlHandler);
window.onpopstate = urlHandler;
// window.addEventListener('popstate', urlHandler);