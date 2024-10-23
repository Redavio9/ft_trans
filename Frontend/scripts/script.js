
import { urlHandler } from "./routes.js";

// Game script



function event(e){
    const profileLink = document.querySelector('.header .header-profile-link');
    const profileMenu = document.querySelector('.header .header-menu');
    if (e.target !== profileLink) {
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
            history.pushState(null, null, '/index.html');
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
            history.pushState(null, null, '/signin');
            urlHandler();
        })
    }

    const singup = document.querySelector('.sing-forms .form-titles .singup');
    if (singup) {
        singup.addEventListener('click', function (e) {
            e.preventDefault();
            history.pushState(null, null, '/signup');
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
    const logoutLink = document.querySelector('.header .header-menu .logout-link');

    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            fetch("http://127.0.0.1:8000/api/logout/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                })
                console.log("Logging out...");
                
                alert("Logout successful!");
                history.pushState(null, null, '/signin');
                urlHandler();
        })
    }


    

    





    const saveChangeButton = document.querySelector('.account-setting .save-btn');
    const passwordModal = document.querySelector('#passwordModal');

    if (saveChangeButton) {
        saveChangeButton.addEventListener('click', function () {
            passwordModal.style.display = 'block';
        })
    }

    const passwordModalClose = document.querySelector('#passwordModal span');
    const passwordModalCancel = document.querySelector('#passwordModal .save-btn:last-child');

    if (passwordModalClose) {
        passwordModalClose.addEventListener('click', function () {
            passwordModal.style.display = 'none';
        })
    }

    if (passwordModalCancel) {
        passwordModalCancel.addEventListener('click', function () {
            passwordModal.style.display = 'none';
        })
    }

    const avatarSelector = document.querySelectorAll('.account-setting .avatar-selection img');

    if (avatarSelector) {
        avatarSelector.forEach(selector => {
            selector.addEventListener('click', function (e) {
                avatarSelector.forEach(selector => {
                    selector.classList.remove('active');
                })
                selector.classList.add('active');
                const target = e.target;
                if (target.tagName === 'IMG') {
                    const profilePic = document.querySelector('.account-setting .profile-pic');
                    profilePic.src = target.src;
                }
            })
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


    document.getElementById('message').addEventListener('click', function (e) {
        e.preventDefault();
        const messageInput = document.getElementById('input-box');
        let sender = "user";
        const message = messageInput.value;
        
        if (message.trim() !== '') 
            {
                const chatBox = document.getElementById('chat-content');
                
                const divElement = document.createElement('div');
                const messageElement = document.createElement('p');
                
                messageElement.textContent = message;
                
                divElement.appendChild(messageElement);
                
                if (sender === 'user') 
                {
                    divElement.classList.add('right');
                } 
                else 
                {
                    divElement.classList.add('left');
                }
                chatBox.appendChild(divElement);
                messageInput.value = '';
            }
        });


    // if (closeByBody){
    //     closeByBody.addEventListener('click', function(e) {
    //         if (e.target !== notificationLink) {
    //             notificationMenu.classList.remove('show');
    //         }
    //     })
    // }
    
   

    // document.getElementById("signup_bt").onclick = signup_bt;
    // const signup_bt = (e) => 
    // {
    //     const formData = 
    //     {
    //         username: document.getElementById('username').value,
    //         first_name: document.getElementById('first_name').value,
    //         last_name: document.getElementById('last_name').value,
    //         email: document.getElementById('email').value,
    //         password: document.getElementById('password').value,
    //         re_password: document.getElementById('re_password').value,
    //         avatar: document.getElementById('avatar').value,
    //         gender: "M",
    //     };
    
    //     console.log(formData);
    //     fetch('http://127.0.0.1:8000/api/register/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.success) 
    //         {
    //         //   localStorage.setItem("access_token", data.jwt.access_token);
    //         //   localStorage.setItem("refresh_token", data.jwt.refresh_token);
    //           alert('Registration successful!');
    //         //   window.history.pushState({ page: "signin" }, "signin", "/signin");
    //         //   navigate("/signin");
    //         } 
    //         else 
    //         {
    //             alert('Registration failed: ' + data.message);
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         alert('An error occurred while registering.');
    //     });
     
    // };   
  



}

window.onload = setUpEvent;






