import { handleViewMessage } from '../scripts/generalMessage.js';
import { urlHandler } from '../scripts/routes.js';
const data = {
    token: null,
}
export async function resetPasswordComponent(type) {
    if (type === 'reset-password') {
        return (`
            <div class="sing-forms">
                <div class="logo">
                    <img src="../images/logo.png" alt="logo" />
                </div>
                <div class="form">
                    <h2>Reset Password</h2>
                    <div class="form-group">
                        <div class="filed">
                            <label for="reset-email"><i class="far fa-user-circle" aria-hidden="true"></i></label>
                            <input type="text" id="reset-email" name="reset-email" placeholder="Email" required="">
                        </div>
                        <button type="submit" class="btn">Reset</button>
                    </div>
                </div>
            </div>
        `);
    } else {
        // get token argument from url
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');
        const response = await fetch('http://127.0.0.1:8000/api/password_verification/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                refresh_token: token
            })
        }).then(response => response.json());
        if (response?.error){
            handleViewMessage({
                type: 'error',
                message: response?.error,
                title: 'Reset Password Error',
                icon: 'fas fa-exclamation-circle'
            })
            setTimeout(() => {
                history.pushState(null, null, '/reset-password');
                urlHandler();
            }, 5000);
        }
        data.token = token;
        return (`
            <div class="sing-forms">
                <div class="logo">
                    <img src="../images/logo.png" alt="logo" />
                </div>
                <div class="form">
                    <h2>Create new Password</h2>
                    <div class="form-group">
                    <div class="filed">
                        <label for="password"><i class="far fa-user-circle" aria-hidden="true"></i></label>
                        <input type="password" id="password" name="password" placeholder="New Password" required>
                    </div>
                    <div class="filed">
                        <label for="re-password"><i class="far fa-user-circle" aria-hidden="true"></i></label>
                        <input type="password" id="re-password" name="re-password" placeholder="Repeat New Password" required>
                    </div>
                        <button type="submit" class="btn resetPasswordSubmit">Submit</button>
                    </div>
                </div>
            </div>
        `);
    }
}

export async function resetPasswordScript() {
    const resetPasswordBtn = document.querySelector('.form-group button.btn');
    const resetEmail = document.getElementById('reset-email');
    if (resetPasswordBtn) {
        resetPasswordBtn?.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = resetEmail?.value;
            const data = { email };
            const response = await fetch('http://127.0.0.1:8000/api/password_resetting/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json());
            if (response?.error) {
                handleViewMessage({
                    type: 'error',
                    message: response?.error,
                    title: 'Reset Password Error',
                    icon: 'fas fa-exclamation-circle'
                })
            } else {
                handleViewMessage({
                    type: 'success',
                    message: response?.success,
                    title: 'Reset Password Success',
                    icon: 'fas fa-check-circle'
                })
                resetEmail.value = '';
            }
        })
    }
}

export async function newPasswordReset() {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    const password = document.getElementById('password');
    const rePassword = document.getElementById('re-password');
    const resetPasswordSubmit = document.querySelector('.resetPasswordSubmit');
    resetPasswordSubmit?.addEventListener('click', async (e) => {
        e.preventDefault();
        const passwordValue = password?.value;
        const rePasswordValue = rePassword?.value;
        if (!passwordValue || !rePasswordValue) {
            handleViewMessage({
                type: 'error',
                message: 'Password fields are required',
                title: 'Reset Password Error',
                icon: 'fas fa-exclamation-circle'
            })
        } else {
            if (passwordValue !== rePasswordValue) {
                handleViewMessage({
                    type: 'error',
                    message: 'Passwords do not match',
                    title: 'Reset Password Error',
                    icon: 'fas fa-exclamation-circle'
                })
            } else {
                const data = {
                    new_password: passwordValue,
                    re_new_password: rePasswordValue,
                    token: token
                }
                const response = await fetch('http://127.0.0.1:8000/api/password_confirmation/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json());
                if (response.error) {
                    handleViewMessage({
                        type: 'error',
                        message: response?.error,
                        title: 'Reset Password Error',
                        icon: 'fas fa-exclamation-circle'
                    })
                } else {
                    handleViewMessage({
                        type: 'success',
                        message: response?.success,
                        title: 'Reset Password Success',
                        icon: 'fas fa-check-circle'
                    })
                    password.value = '';
                    rePassword.value = '';
                    setTimeout(() => {
                        history.pushState(null, null, '/singin');
                        urlHandler();
                    }, 5000);
                }
            }
        }
    });
}