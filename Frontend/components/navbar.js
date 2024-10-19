import { navigate } from '../main.js';

export function renderNavbar() {

    const logout = (e) => {
        // initializeWebSocket();
        fetch("http://127.0.0.1:8000/api/logout/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        })
        console.log("Logging out...");
        
        alert("Logout successful!");
        window.history.pushState({ page: "signin" }, "signin", "/signin");
        navigate("/signin");
    };



  const header = document.getElementById('header');
  header.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-light p-3 d-flex" >
              <a class="navbar-brand" href="#">Ping Pong</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <form class="form-inline d-flex">
                <input class="form-control-search" type="search" placeholder="Search" aria-label="Search">
                <button class="btn-search btn-outline-success ml-4" type="submit">Search</button>
             </form>
              <ul class="navbar-nav">
                  <li class="nav-item" style="font-size: 10px;">
                      <a role="button" id="logoutButton" class="nav-link">
                          <i class="fas fa-sign-out-alt" style="color: #dc3545;"></i> Logout
                      </a>
                  </li>
              </ul>
          </div>
      </nav>
  `;
  document.getElementById("logoutButton").onclick = logout;
}


function initializeWebSocket() 
{
  var user_id = getUserIdFromToken(); 
  console.log(user_id);
  socket = new WebSocket(`ws://127.0.0.1:8000/ws/is_online/${user_id}/`);
  console.log("WebSocket connection being established...+++");

  socket.onopen = function() {
    console.log('WebSocket connection established.++');
    sendLoginStatus(); 
  };

  socket.onmessage = function(event) {
    console.log('Received message:');
    console.log('Event Data:', event.data);
    
    const data = JSON.parse(event.data);

    if (data.type === 'user_status') {
      console.log('User status received');
      
      // Get the user_id and online status from the WebSocket message
      const userId = data.user_id; 
      const isOnline = data.is_online;

      // Update user status in the UI
      // updateUserStatus(userId, isOnline);
      console.log("---> User ID: " + userId);
    }
  };

  socket.onerror = function(error) {
    console.error('WebSocket Error:', error);
  };

  socket.onclose = function() {
    console.log('WebSocket connection closed.');
  };
}

// function updateUserStatus(userId, isOnline) {
//   const userElement = document.getElementById(`user-${userId}`);
//   if (userElement) {
//     const statusElement = userElement.querySelector('.status');
//     statusElement.textContent = isOnline ? 'Online' : 'Offline';
//     statusElement.className = isOnline ? 'user-online' : 'user-offline';
//   }
// }


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function getUserIdFromToken() {
  const token = getCookie('access_token');  // Retrieve token from cookies
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user_id; 
  } catch (error) {
    console.error('Failed to decode token or parse payload:', error);
    return null;
  }
}

function sendLoginStatus() {
  const userId = getUserIdFromToken();
  console.log("ghiiiiiid");
  console.log(userId);
  if (socket && socket.readyState === WebSocket.OPEN) 
  {
    socket.send(JSON.stringify({
      'type': 'login_status',
      'user_id': userId, 
      'is_online': false
    }));
  } 
  else 
  {
    console.error('WebSocket is not open. Cannot send login status.');
  }
}