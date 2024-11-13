import { urlHandler } from '../scripts/routes.js';

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
                <form action="/singup" method="post">
                    <div class="filed">
                        <label for="firstName"><i class="far fa-user-circle"></i></label>
                        <input type="text" id="firstName" name="firstName" placeholder="First Name" required/>
                    </div>
                    <div class="filed">
                        <label for="lastName"><i class="far fa-user-circle"></i></label>
                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" required />
                    </div>
                    <div class="filed">
                        <label for="userName"><i class="far fa-user-circle"></i></label>
                        <input type="text" id="userName" name="userName" placeholder="Username" required />
                    </div>
                    <div class="filed">
                        <label for="email"><i class="fas fa-at"></i></label>
                        <input type="email" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div class="filed password">
                        <label for="password"><i class="fas fa-lock"></i></label>
                        <input type="password" id="password" name="password" placeholder="Password" required />
                        <span class="password-eye"><i class="fas fa-eye-slash"></i></span>
                    </div>
                    <div class="filed">
                        <label for="re-password"><i class="fas fa-check"></i></label>
                        <input type="password" id="re-password" name="re-password" placeholder="Confirm Password" required />
                    </div>
                    <div class="gender-items">
                        <span>Gender</span>
                        <div class="radio">
                            <input type="radio" name="gender" id="gender-male" value="M" />
                            <label for="gender-male">Male</label>
                            <input type="radio" name="gender" id="gender-female" value="F" />
                            <label for="gender-female">Female</label>
                        </div>
                    </div>

                    <button type="submit-singup">Sign Up <i class="fas fa-user-plus"></i></button>
                </form>
                <div class="form-social">
                    <div class="line">
                        <span> OR </span>
                    </div>
                    <div class="social-icons">
                        <a class="intra" href="#"><img src="../images/42intra.png" alt="42 intra" /> Sing up with 42 Intra</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `);
}
export function singupScript() {
    const passwordEye = document.querySelector('.password-eye');
    const password = document.querySelector('#password');
    if (password) {
        password.addEventListener('paste', function (e) {
            e.preventDefault();
        })
        password.addEventListener('copy', function (e) {
            e.preventDefault();
        })
    }
    if (passwordEye && password) {
        passwordEye.addEventListener('click', function () {
            if (password.type === 'password') {
                password.type = 'text';
                passwordEye.innerHTML = '<i class="fas fa-eye"></i>';

            } else {
                password.type = 'password';
                passwordEye.innerHTML = '<i class="fas fa-eye-slash"></i>';
            }
        })
    }

    const rePassword = document.querySelector('#re-password');
    if (rePassword) {
        rePassword.addEventListener('paste', function (e) {
            e.preventDefault();
        })
        rePassword.addEventListener('copy', function (e) {
            e.preventDefault();
        })
    }

    // handle the singup and send data to the server using fetch 
    const form = document.querySelector('.form form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const firstName = document.querySelector('#firstName').value;
            const lastName = document.querySelector('#lastName').value;
            const userName = document.querySelector('#userName').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const rePassword = document.querySelector('#re-password').value;

            // check if the password is less than 6 characters and contain at least one number and one letter and one special character and one uppercase letter
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            if (!passwordRegex.test(password)) {
                alert('Password must contain at least one number, one letter, one special character, one uppercase letter and at least 6 characters');
                return;
            }

            // check if the password and re-password are the same
            if (password !== rePassword) {
                alert('Password and Confirm Password are not the same');
                return;
            }

            // select gender and check if the user select one of them
            const gender = document.querySelectorAll('input[name="gender"]')
            let genderValue = '';
            if (gender) {
                // check if the user select one of the gender
                for (const tmp of gender) {
                    if (tmp.checked) {
                        genderValue = tmp.value;
                        break;
                    }
                }
                if (genderValue === '') {
                    alert('Please select your gender ');
                }
            }

            // send data to the server
            fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "first_name": firstName,
                    "last_name": lastName,
                    "username": userName,
                    "gender": "M",
                    "email": email,
                    "password": password,
                    "re_password": rePassword
                })
            }).then(response => response.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        alert('User created successfully');
                        history.pushState(null, null, '/singin');
                        urlHandler();
                    }
                })
                .catch((error) => {
                    alert('Error: ' + error);
                });
        })
    }
}