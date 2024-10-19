// import { navigate } from '../main.js';
import { urlHandler } from "../scripts/routes.js";


// let socket;

// export function renderSignIn() {
//   const signup = document.getElementById("header");
//   const content = document.getElementById('content');
//   content.innerHTML = "";
//   const login = (e) => {
//     console.log("reda");

//     const loginData = {
//       username: document.getElementById("username").value,
//       password: document.getElementById("password").value,
//     };

//     console.log(loginData);
//     fetch("http://127.0.0.1:8000/api/login/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: 'include',
//       body: JSON.stringify(loginData),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("ikhdm ghaya");
//       console.log(data);
//       if (data) {
//         console.log(data);
//         // localStorage.setItem("access_token", data.jwt.access_token);
//         // localStorage.setItem("refresh_token", data.jwt.refresh_token);
//         alert("Login successful!");
//         initializeWebSocket();
//         window.history.pushState({ page: "profile" }, "profile", "/profile");
//         navigate("/profile");
//       } 
//       else 
//       {
//         alert("Login failed: " + data.message);
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("An error occurred while logging in.");
//     });
//   };

//   signup.innerHTML = `
//     <div class="d-flex align-items-center justify-content-center vh-100">
//       <div id="borderSignin" class="container mt-5">
//           <div class="row justify-content-center">
//               <div class="col-md-6">
//                   <h2 class="text-center" style="color:#000;">Sign In</h2>
//                   <div id="signInForm" style="font-family: 'Fantasy', cursive;">
//                       <div class="mb-3">
//                           <label for="username" class="form-label" style="color:#000;">Username</label>
//                           <input type="text" class="form-control" id="username" required>
//                       </div>
//                       <div class="mb-3">
//                         <label for="password" class="form-label" style="color:#000;">Password</label>
//                         <input type="password" class="form-control" id="password" required>
//                       </div>
//                       <button id="signInFormBtn" type="submit" class="btn btn-primary w-100 mt-2">Sign In</button>
//                   </div>
//               </div>
//           </div>
//       </div>
//     </div>
//   `;
//   document.getElementById("signInFormBtn").onclick = login;
// }



// //websocket
// function initializeWebSocket() 
// {
//   var user_id = getUserIdFromToken(); 
//   socket = new WebSocket(`ws://127.0.0.1:8000/ws/is_online/${user_id}/`);
//   console.log("WebSocket connection being established...");

//   socket.onopen = function() {
//     console.log('WebSocket connection established.');
//     sendLoginStatus(); 
//   };

//   socket.onmessage = function(event) {
//     console.log('Received message:');
//     console.log('Event Data:', event.data);
    
//     const data = JSON.parse(event.data);

//     if (data.type === 'user_status') {
//       console.log('User status received');
      
//       // Get the user_id and online status from the WebSocket message
//       const userId = data.user_id; 
//       // const isOnline = data.is_online;

//       console.log("---> User ID: " + userId);
//     }
//   };

//   socket.onerror = function(error) {
//     console.error('WebSocket Error:', error);
//   };

//   socket.onclose = function() {
//     console.log('WebSocket connection closed.');
//   };
// }


// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// function getUserIdFromToken() {
//   const token = getCookie('access_token');  // Retrieve token from cookies
//   if (!token) return null;

//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return payload.user_id; 
//   } catch (error) {
//     console.error('Failed to decode token or parse payload:', error);
//     return null;
//   }
// }

// function sendLoginStatus() {
//   const userId = getUserIdFromToken();
//   console.log("ghiiiiiid");
//   console.log(userId);
//   if (socket && socket.readyState === WebSocket.OPEN) 
//   {
//     socket.send(JSON.stringify({
//       'type': 'login_status',
//       'user_id': userId, 
//       'is_online': true
//     }));
//   } 
//   else 
//   {
//     console.error('WebSocket is not open. Cannot send login status.');
//   }
// }






export function SingInComponent() {
  return (`
    <div class="sing-forms">
        <div class="logo">
            <img src="../images/logo.png" alt="logo" />
        </div>
        <div class="form">
            <div class="form-titles">
                <h4 class="active singin">Sign In</h4>
                <h4 class="singup">Sign Up</h4>
            </div>
            <div class="form-inputs">
                <div class="form_sig">
                    <div class="filed">
                        <label for="username"><i class="far fa-user-circle"></i></label>
                        <input type="text" id="username" name="username" placeholder="Username" required />
                    </div>
                    <div class="filed">
                        <label for="password"><i class="fas fa-lock"></i></label>
                        <input type="password" id="password" name="password" placeholder="Password" required />
                    </div>
                    <button id="signInFormBtn" type="submit-singup">Sign In <i class="fas fa-sign-in-alt"></i></button>
                </div>
                <div class="form-social">
                    <div class="line">
                        <span> OR </span>
                    </div>
                    <div class="social-icons">
                        <a class="intra" href="#"><img src="../images/42intra.png" alt="42 intra" /> Sing up with 42 Intra</a>
                        <a class="github" href="#"><img src="../images/github.png" alt="42 intra" /> Sing up with Github</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `);
}


export function singinScript()
{
  const login = (e) => {
    console.log("reda");
  
    const loginData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
  
    console.log(loginData);
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(loginData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("ikhdm ghaya");
      console.log(data);
      if (data) {
        console.log(data);
        alert("Login successful!");
        // initializeWebSocket();
        window.history.pushState({ page: "index.html" }, "index.html", "/index.html");
        urlHandler();
      } 
      else 
      {
        alert("Login failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while logging in.");
    });
  };
  document.getElementById("signInFormBtn").onclick = login;
}
