import { setUpEvent } from './script.js';
import { gameComponent, gameAiComponent } from '../components/game.js';
import { gameStartingComponent, gameStartingComponentScript } from '../components/gameWaiting.js';
import { gameTournamentComponent, tournamentScript } from '../components/tournament.js';
import { gameScriptAi } from './game.js';
import { homeComponent, chartScript, drawCharts } from '../components/home.js';
import { SingUpComponent, singupScript } from '../components/singup.js';
import { SingInComponent, SingUpComponentScript } from '../components/singin.js';
import { ChatComponent, chatScript } from '../components/chat.js';
import { firstModeComponent, secondModeComponent, tournamentModesScript } from '../components/tournamentModes.js';
import { accountSettingComponent, accountSettingScript } from '../components/accountSetting.js';
import { friendsComponent, friendsScript } from '../components/friends.js';
import { profileComponent } from '../components/profile.js';
import { classicGame, classicGameComponent } from '../components/play.js';
import { searchComponent, searchComponentEvents } from '../components/search.js';
import { resetPasswordComponent, resetPasswordScript } from '../components/resetPassword.js';
import { ticTacToeComponent, ticTacToeBoard , ticTacToeDashboard } from '../components/tictactoe/tictactoe.js';
import { socket_management_ } from '../components/tictactoe/board.js'
import { tictactoe_getUser } from '../components/tictactoe/fetch.js'
import { manageEvents } from '../components/tictactoe/events.js'

export async function urlHandler() {
    const routeName = window.location.pathname;
    const site = document.querySelector('.site');
    
    // check if user if logged in or not, if not redirect to login page
    if (routeName !== '/singin' && routeName !== '/singup' && routeName !== '/reset-password' && routeName !== '/new-password') {
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
            // CHECK
            drawCharts()
            break ;
        case '/index.html':
            site.innerHTML = await homeComponent();
            site.classList = 'site gameComponent';
            chartScript();
            // CHECK
            drawCharts()
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
            await tournamentModesScript();
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
            site.innerHTML = await classicGameComponent();
            site.classList = 'site';
            await classicGame();
            break;

        case '/search':
            site.innerHTML = await searchComponent();
            site.classList = 'site friends-layout';
            await searchComponentEvents();
            break;

        case '/tic-tac':
            site.innerHTML = await ticTacToeComponent();
            site.classList = 'site';
            manageEvents();
            break;
        case '/tictactoe_board':
            site.innerHTML = await ticTacToeBoard();
            // site.innerHTML = await tictactoeWaitingPly();
            site.classList = 'site';
            const user = await tictactoe_getUser()
            console.log("user in routes.js : ", user)
            socket_management_(user)
            console.log("tictactoe_board")
            break;
        case '/dashboard':
            site.innerHTML = await ticTacToeDashboard();
            site.classList = 'site';
            drawCharts()
            console.log("dashboard")
            break;

        case '/reset-password':
            site.innerHTML = await resetPasswordComponent('reset-password');
            site.classList = 'site ';
            resetPasswordScript()
            break;
        
        case '/new-password':
            site.innerHTML = await resetPasswordComponent('new-password');
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