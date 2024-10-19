import { urlHandler } from "../scripts/routes.js";
// import { navigate } from '../main.js';


// export function renderSignUp()
// {
//   const signup = document.getElementById('header');

//   const signin = (e) => {
//     console.log('redaaaas');
//     window.history.pushState({ page: "signin" }, "signin", "/signin");
//     navigate("/signin");

//   };

//   const signup_bt = (e) => {
//     const formData = 
//     {
//         username: document.getElementById('username').value,
//         first_name: document.getElementById('first_name').value,
//         last_name: document.getElementById('last_name').value,
//         date_joined: document.getElementById('date_joined').value,
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
//         if (data.jwt) 
//         {
//           localStorage.setItem("access_token", data.jwt.access_token);
//           localStorage.setItem("refresh_token", data.jwt.refresh_token);
//           alert('Registration successful!');
//           window.history.pushState({ page: "signin" }, "signin", "/signin");
//           navigate("/signin");
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

//   };

//   signup.innerHTML=`
//     <div  class="d-flex align-items-center justify-content-center vh-100">
//       <div id="borderSignup" class="container mt-5">
//           <div class="row justify-content-center">
//           <div class="col-md-2 w-50">
//                   <h2 class="text-center" style="color:#fff;">Sign Up</h2>
//                   <div id="signUpForm" style="font-family: 'Fantasy', cursive;">
//                       <div class="mb-3">
//                           <label for="username" class="form-label" style="color:#fff;">Username</label>
//                           <input type="text" class="form-control" id="username" required>
//                       </div>
//                       <div class="mb-3">
//                           <label for="first_name" class="form-label" style="color:#fff;">first_name</label>
//                           <input type="text" class="form-control" id="first_name" required>
//                       </div>
//                       <div class="mb-3">
//                           <label for="last_name" class="form-label" style="color:#fff;">last_name</label>
//                           <input type="text" class="form-control" id="last_name" required>
//                       </div>
//                       <div class="mb-3">
//                           <label for="date_joined" class="form-label" style="color:#fff;">date_joined</label>
//                           <input type="date" class="form-control" id="date_joined" required>
//                       </div>
//                       <div class="mb-3">
//                           <label for="email" class="form-label" style="color:#fff;">Email address</label>
//                           <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
//                       </div>
//                       <div class="mb-3">
//                           <label for="password" class="form-label" style="color:#fff;">Password</label>
//                           <input type="password" class="form-control" id="password" required>
//                       </div>
//                       <div class="mb-3">
//                           <label for="re_password" class="form-label" style="color:#fff;">re_password</label>
//                           <input type="password" class="form-control" id="re_password" required>
//                       </div>
//                       <div class="mb-3">
//                           <label for="avatar" class="form-label" style="color:#fff;">Avatar</label>
//                           <input type="file" class="form-control" id="avatar" style="font-size:10px"required>
//                       </div>
//                       <div class="mb-3">
//                         <div class="d-flex justify-content-center">
//                         <div class="btn-group" role="group">
//                             <input type="radio" id="male" name="gender" value="Male" class="btn-check" autocomplete="off">
//                             <label class="btn btn-outline-primary" for="male">Male</label>
//                             <input type="radio" id="female" name="gender" value="Female" class="btn-check" autocomplete="off">
//                             <label class="btn btn-outline-primary" for="female">Female</label>
//                         </div>
//                         </div>
//                       </div>

//                       <button id="signup_bt" type="submit" class="btn btn-primary w-100">Sign Up</button>
//                   </div>
//                   <div class="mt-3 text-center" style="font-family: 'Fantasy', cursive;">
//                     <p style="color:#fff;">
//                       already have an account? 
//                       <a role="button" id="showSignIn">Sign In</a>
//                     </p>
//                   </div>
//           </div>
//           </div>
//           </div>
//       </div>
//     </div>
//   `

//   document.getElementById("showSignIn").onclick = signin;
//   document.getElementById("signup_bt").onclick = signup_bt;
// }











export function SingUpComponent() {

  return (`
    <div class="sing-forms">
        <div class="logo">
            <img src="../images/logo.png" alt="logo" />
        </div>
        <div class="form">
            <div class="form-titles">
                <h4 class="singin">Sign In</h4>
                <h4 class="active singup">Sign Up</h4>
            </div>
            <div class="form-inputs">
                <div class="form_sig">
                    <div class="filed">
                        <label for="first_name"><i class="far fa-user-circle"></i></label>
                        <input type="text" id="first_name" name="first_name" placeholder="First Name" required/>
                    </div>
                    <div class="filed">
                        <label for="last_name"><i class="far fa-user-circle"></i></label>
                        <input type="text" id="last_name" name="last_name" placeholder="Last Name" required />
                    </div>
                    <div class="filed">
                        <label for="username"><i class="far fa-user-circle"></i></label>
                        <input type="text" id="username" name="username" placeholder="Username" required />
                    </div>
                    <div class="filed">
                        <label for="email"><i class="fas fa-at"></i></label>
                        <input type="email" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div class="filed">
                        <label for="password"><i class="fas fa-lock"></i></label>
                        <input type="password" id="password" name="password" placeholder="Password" required />
                    </div>
                    <div class="filed">
                        <label for="re_password"><i class="fas fa-check"></i></label>
                        <input type="password" id="re_password" name="re_password" placeholder="Confirm Password" required />
                    </div>

                    <div class="chose-avatar">
                        <div class="title">
                            <h4>Choose an Avatar: </h4>
                        </div>
                        <div class="avatars">
                            <img class="active" src="../images/avatars/avatar1.webp" alt="avatar1" />
                            <img src="../images/avatars/avatar2.webp" alt="avatar1" />
                            <img src="../images/avatars/avatar3.webp" alt="avatar1" />
                            <img src="../images/avatars/avatar4.webp" alt="avatar1" />
                        </div>
                    </div>

                    <div class="upload-avatar">
                        <div class="title">
                            <h4><label for="avatar-input">Or upload your own: </label></h4>
                        </div>
                        <label class="choose-label" for="avatar-input">Choose File</i></label>
                        <input type="file" id="avatar-input" name="avatar" accept="image/*" />
                    </div>
                    <button id="signup_bt" type="submit-singup">Sign Up <i class="fas fa-user-plus"></i></button>
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

export function singupScript() {
    const avatarInput = document.querySelectorAll('.avatars img');
    if (avatarInput) {
        avatarInput.forEach((avatar) => {
            avatar.addEventListener('click', function (e) {
                avatarInput.forEach((avatar) => {
                    avatar.classList.remove('active');
                });
                e.target.classList.add('active');
            })
        })
    }

    const signup_bt = (e) => 
        {
            const formData = 
            {
                username: document.getElementById('username').value,
                first_name: document.getElementById('first_name').value,
                last_name: document.getElementById('last_name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                re_password: document.getElementById('re_password').value,
                // avatar: document.getElementById('avatar').value,
                gender: "M",
            };
        
            console.log(formData);
            fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) 
                {
                //   localStorage.setItem("access_token", data.jwt.access_token);
                //   localStorage.setItem("refresh_token", data.jwt.refresh_token);
                  alert('Registration successful!');
                //   window.history.pushState({ page: "signin" }, "signin", "/signin");
                //   navigate("/signin");
                } 
                else 
                {
                    alert('Registration failed: ' + data.message);
                    
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while registering.');
                window.history.pushState({ page: "signin" }, "signin", "/signin");
                urlHandler();
            });
        
        };
        
        document.getElementById("signup_bt").onclick = signup_bt;

}
