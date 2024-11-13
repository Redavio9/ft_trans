import { urlHandler } from "./routes.js";

// Game script

function event(e){
    const profileLink = document.querySelector('.header .header-profile-link');
    const profileMenu = document.querySelector('.header .header-menu');
    if (profileLink && e.target !== profileLink) {
        profileMenu.classList.remove('active-menu');
    }
}

export function setUpEvent() {

    const classicLink = document.querySelector('.classic a');
    if (classicLink) {
        classicLink.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, 'game_starting');
            urlHandler();
        })
    }

    const gameCancel = document.querySelector('.classic-game a');
    if (gameCancel) {
        gameCancel.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/game');
            urlHandler();
        })
    }

    const firendsLink = document.querySelectorAll('.friends a');
    if (firendsLink) {
        firendsLink.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                history.pushState(null, null, '/game_starting');
                urlHandler();
            })
        })
    }

    const tournamentLink = document.querySelector('.tournament a');
    if (tournamentLink) {
        tournamentLink.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/tournament');
            urlHandler();
        })
    }

    const aiLink = document.querySelector('.ai a');
    if (aiLink) {
        aiLink.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/ai');
            urlHandler();
        })
    }

    const aiCancel = document.querySelector('.game-container i');
    if (aiCancel) {
        aiCancel.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/game');
            urlHandler();
        })
    }

    const gameSettingLink = document.querySelector('.game-setting-link');
    if (gameSettingLink) {
        gameSettingLink.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/game_setting');
            urlHandler();
        })
    }

    const homeLink = document.querySelector('.menu .home');
    if (homeLink) {
        homeLink.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/');
            urlHandler();
        })
    }

    const gameLink = document.querySelector('.menu .game');
    if (gameLink) {
        gameLink.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/game');
            urlHandler();
        })
    }

    const singin = document.querySelector('.sing-forms .form-titles .singin');
    if (singin) {
        singin.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/singin');
            urlHandler();
        })
    }

    const singup = document.querySelector('.sing-forms .form-titles .singup');
    if (singup) {
        singup.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/singup');
            urlHandler();
        })
    }

    const chat = document.querySelector('.header .profile .send');
    if (chat) {
        chat.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/chat');
            urlHandler();
        })
    }

    const profileLink = document.querySelector('.header .header-profile-link');
    const profileMenu = document.querySelector('.header .header-menu');
    const closeByBody = document.querySelector('html');
    if (profileLink) {
        profileLink.addEventListener('click', function() {
            if (profileMenu) {
                profileMenu.classList.toggle('active-menu');
            }
        })
    }
    
    if (closeByBody) {
        closeByBody.removeEventListener('click', event)
        closeByBody.addEventListener('click', event)
    }

    const accountSettingLink = document.querySelector('.header .header-menu .setting-link');
    const accountSettingMenu = document.querySelector('.menu .menu-items .account-setting-link');

    if (accountSettingLink) {
        accountSettingLink.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/account_settings');
            urlHandler();
        })
    }

    if (accountSettingMenu) {
        accountSettingMenu.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/account_settings');
            urlHandler();
        })
    }

    const friendListLink = document.querySelector('.menu .menu-items .friend-list-link');
    if (friendListLink) {
        friendListLink.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/friends');
            urlHandler();
        })
    }

    const notificationLink = document.querySelector('.header .profile .notification');
    const notificationMenu = document.querySelector('.header #notificationsPanel');

    if (notificationLink) {
        notificationLink.addEventListener('click', function () {
            notificationMenu.classList.toggle('show');
        })
    }

    if (closeByBody){
        closeByBody.addEventListener('click', function(e) {
            if (notificationLink && e.target !== notificationLink) {
                notificationMenu.classList.remove('show');
            }
        })
    }

    const profileButton = document.querySelector('.header .header-menu .profile-link');
    if (profileButton) {
        profileButton.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/profile');
            urlHandler();
        })
    }

    const logoutButton = document.querySelector('.header .header-menu .logout-link');
    if (logoutButton) {
        logoutButton.addEventListener('click', function (e) {
            e.preventDefault();
            // clear all cookies, and redirect to login page, and send logout request to server
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
            history.pushState(null, null, '/singin');
            urlHandler();
        })
    }

    // get search input and when user press enter, redirect to search page, with search query
    const searchInput = document.querySelector('.header .search input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                history.pushState(null, null, `/search?query=${searchInput.value}`);
                urlHandler();
            }
        })
    }
}

window.onload = setUpEvent;
