import { header } from "../scripts/components.js";
import { menu } from "../scripts/components.js";
import { Showfriend } from "../scripts/components.js";

export function chat()
{
    return (
        header() +
        menu() +
        renderChat() +
        Showfriend() 
    )
}





export function renderChat() {

    const body = document.getElementById('site chat-layout');
    body.innerHTML = `
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

            <div class="chat-content">
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
    `

const login = (e) => 
{
    new_message()
}
document.getElementById("message").onclick = login;
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