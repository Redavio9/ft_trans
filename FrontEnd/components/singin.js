import { urlHandler } from '../scripts/routes.js';
import { handleViewMessage, showLoginNotification } from '../scripts/generalMessage.js';
import { fetchProfile } from '../scripts/fetchData.js';

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
                  <form action="/singup" method="post">
                        <div class="filed">
                            <label for="userName"><i class="far fa-user-circle"></i></label>
                            <input type="text" id="userName" name="userName" placeholder="Username" required />
                        </div>
                        <div class="filed password">
                            <label for="password"><i class="fas fa-lock"></i></label>
                            <input type="password" id="password" name="password" placeholder="Password" required />
                            <span class="password-eye"><i class="fas fa-eye-slash"></i></span>
                        </div>
                        <p class="forgetPassword">Forgot Password?</p>
                      <button type="submit-singup">Sign In <i class="fas fa-sign-in-alt"></i></button>
                  </form>
                  <div class="form-social">
                      <div class="line">
                          <span> OR </span>
                      </div>
                      <div class="social-icons">
                          <a class="intra" href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8a31ea6d5a286e79435ada2ca386c3ef0f6cc880d01c40ebd7670eb998768d49&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fapi%2Fcallback&response_type=code"><img src="../images/42intra.png" alt="42 intra" /> Sing up with 42 Intra</a>
                      </div>
                  </div>
              </div>
          </div>
            <div class="modal" style="display: none;">
                <div class="two-fa-modal">
                    <div class="two-fa-modal-content">
                        <span class="close">×</span>
                        <h2>Enter 2FA Code</h2>
                        <input type="text" id="_2faCode" placeholder="2FA Code">
                        <button class="btn confirm-2fa">Confirm</button>
                    </div>
                </div>
            </div>
      </div>
    `);
}

export async function SingUpComponentScript() {
    const passwordEye = document.querySelector('.password-eye');
    const password = document.querySelector('#password');
    const close = document.querySelector('.two-fa-modal .close');
    const forgetPassword = document.querySelector('.forgetPassword');

    forgetPassword?.addEventListener('click', function () {
        history.pushState(null, null, '/reset-password');
    return urlHandler();
    });

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

    if (close) {
        close.addEventListener('click', function () {
            document.querySelector('.modal').style.display = 'none';
        })
    }

    // handle form submit event for sign up 
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const userName = document.querySelector('#userName').value;
            const password = document.querySelector('#password').value;

            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': userName,
                    'password': password
                })
            });

            response.json().then(data => {
                if (data.error) {
                    handleViewMessage({
                        status: 'error',
                        message: data.error,
                        type: 'error',
                        icon: 'fas fa-exclamation-triangle'
                    })

                } else if (data.two_fa) {
                    handleViewMessage({
                        status: 'success',
                        message: '2FA Code has been sent to your email',
                        type: 'success',
                        icon: 'fas fa-check-circle'
                    })
                    document.querySelector('.sing-forms .modal').style.display = 'block';
                    document.querySelector('.confirm-2fa')?.addEventListener('click', async function () {
                        const twoFaCode = document.querySelector('#_2faCode').value;
                        const data = await fetch('http://127.0.0.1:8000/api/2fa/', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'otp_code': twoFaCode
                            })
                        }).then(data => data.json())
                        if (data?.error) {
                            handleViewMessage({
                                status: 'error',
                                message: data.error,
                                type: 'error',
                                icon: 'fas fa-exclamation-triangle'
                            })
                        } else {
                            showLoginNotification();
                            (async () => {
                                await fetchProfile();
                                history.pushState(null, null, '/');
                                urlHandler();
                            })();
                        }
                    })
                } else {
                    showLoginNotification();
                    (async () => {
                        await fetchProfile();
                        history.pushState(null, null, '/');
                        urlHandler();
                    })();
                }
            })
        })
    }

}
