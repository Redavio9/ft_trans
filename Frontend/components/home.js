
export function renderHome() 
{

  // const home = (e) => {
  //   e.preventDefault(); 
  //   console.log('redaaaas11');
  //   window.history.pushState({ page: "home" }, "home", "/home");
  //   navigate("/home");
  // };

  const chat = (e) => {
    e.preventDefault(); 
    window.history.pushState({ page: "chat" }, "chat", "/chat");
    console.log('redaaaas');
    navigate("/chat");

  };

  const setting = (e) => {
    e.preventDefault(); 
    window.history.pushState({ page: "setting" }, "setting", "/setting");
    console.log('redaaaas');
    navigate("/setting");

  };

  const profile = (e) => {
    e.preventDefault(); 
    window.history.pushState({ page: "profile" }, "profile", "/profile");
    console.log('redaaaas');
    navigate("/profile");

  };



  console.log("renderHome");
  const header = document.getElementById('content');
  header.innerHTML =    `
    <div id="navbar-container" class="d-flex align-items-center align-items-center p-2">
        <nav class="navbar1" >
            <ul class="navbar-nav">
                <li id="home_" class="nav-item">
                    <a href="home" role="button" class="nav-link active" title="Accueil">
                        <i class="fa-duotone fa-solid fa-house" style="font-size:40px;"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="profile" id="profile_" role="button" class="nav-link" title="À propos">
                        <i class="fa-solid fa-user"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="setting" id="setting_" role="button" class="nav-link" title="Services">
                        <i id="hne" class="bi bi-gear-fill gear-icon"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="chat" id="chat_" role="button" class="nav-link" title="Contact">
                        <i class="fa-solid fa-message"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
  `;

    // document.getElementById("home_").onclick = home;
    document.getElementById("profile_").onclick = profile;
    document.getElementById("setting_").onclick = setting;
    document.getElementById("chat_").onclick = chat;
}

// export function renderHome() 
// {

//   const home = (e) => {
//     console.log('redaaaas');
//     window.history.pushState({ page: "home" }, "home", "/home");
//     navigate("/home");

//   };

//   const chat = (e) => {
//     console.log('redaaaas');
//     window.history.pushState({ page: "chat" }, "chat", "/chat");
//     navigate("/chat");

//   };

//   const setting = (e) => {
//     console.log('redaaaas');
//     window.history.pushState({ page: "setting" }, "setting", "/setting");
//     navigate("/setting");

//   };

//   const profile = (e) => {
//     console.log('redaaaas');
//     window.history.pushState({ page: "profile" }, "profile", "/profile");
//     navigate("/profile");

//   };


//   console.log("renderHome");
//   const header = document.getElementById('content');

//   header.innerHTML =    `
//     <div id="navbar-container" class="d-flex align-items-center align-items-center p-2">
//     <nav class="navbar1" >
//         <ul class="navbar-nav">
//             <li class="nav-item">
//                 <a class="nav-link active" href="home" title="Accueil">
//                     <i class="fa-duotone fa-solid fa-house" style="font-size:40px;"></i>
//                 </a>
//             </li>
//             <li class="nav-item">
//                 <a class="nav-link" href="profile" title="À propos">
//                     <i class="fa-solid fa-user"></i>
//                 </a>
//             </li>
//             <li class="nav-item">
//                 <a class="nav-link" href="setting" title="Services">
//                     <i id="hne" class="bi bi-gear-fill gear-icon"></i>
//                 </a>
//             </li>
//             <li class="nav-item">
//                 <a class="nav-link" href="chat" title="Contact">
//                     <i class="fa-solid fa-message"></i>
//                 </a>
//             </li>
//         </ul>
//     </nav>
//     </div>
//     `;
//   document.getElementById("home").onclick = home;
//   document.getElementById("chat-home").onclick = chat;
//   document.getElementById("chat-setting").onclick = setting;
//   document.getElementById("chat-profile").onclick = profile;
// }


// export function renderHome() 
// {
//     const home = (e) => {
//         e.preventDefault();
//         console.log('Home clicked');
//         window.history.pushState({ page: "home" }, "home", "/home");
//         navigate("/home");
//     };

//     const chat = (e) => {
//         e.preventDefault(); 
//         console.log('Chat clicked');
//         window.history.pushState({ page: "chat" }, "chat", "/chat");
//         navigate("/chat");
//     };

//     const setting = (e) => {
//         e.preventDefault(); 
//         console.log('Setting clicked');
//         window.history.pushState({ page: "setting" }, "setting", "/setting");
//         navigate("/setting");
//     };

//     const profile = (e) => {
//         e.preventDefault(); 
//         console.log('Profile clicked');
//         window.history.pushState({ page: "profile" }, "profile", "/profile");
//         navigate("/profile");
//     };

//     console.log("renderHome");
//     const header = document.getElementById('content');
//     header.innerHTML = `
//         <div id="navbar-container" class="d-flex align-items-center align-items-center p-2">
//             <nav class="navbar1" >
//                 <ul class="navbar-nav">
//                     <li id="home_" class="nav-item">
//                         <a href="#" role="button" class="nav-link active" title="Accueil">
//                             <i class="fa-duotone fa-solid fa-house" style="font-size:40px;"></i>
//                         </a>
//                     </li>
//                     <li class="nav-item">
//                         <a id="profile_" href="#" role="button" class="nav-link" title="À propos">
//                             <i class="fa-solid fa-user"></i>
//                         </a>
//                     </li>
//                     <li class="nav-item">
//                         <a id="setting_" href="#" role="button" class="nav-link" title="Services">
//                             <i id="hne" class="bi bi-gear-fill gear-icon"></i>
//                         </a>
//                     </li>
//                     <li class="nav-item">
//                         <a id="chat_" href="#" role="button" class="nav-link" title="Contact">
//                             <i class="fa-solid fa-message"></i>
//                         </a>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     `;

//     document.getElementById("home_").onclick = home;
//     document.getElementById("profile_").onclick = profile;
//     document.getElementById("setting_").onclick = setting;
//     document.getElementById("chat_").onclick = chat;
// }