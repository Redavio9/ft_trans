import { handleViewMessage } from '../scripts/generalMessage.js';

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
        return (`
            <div class="sing-forms">
                <div class="logo">
                    <img src="../images/logo.png" alt="logo" />
                </div>
                <div class="form">
                    <h2>Create new Password</h2>
                    <form id="resetPasswordForm">
                        <div class="form-group">
                        <div class="filed">
                            <label for="password"><i class="far fa-user-circle" aria-hidden="true"></i></label>
                            <input type="text" id="password" name="password" placeholder="New Password" required="">
                        </div>
                        <div class="filed">
                            <label for="re-password"><i class="far fa-user-circle" aria-hidden="true"></i></label>
                            <input type="text" id="re-password" name="re-password" placeholder="Repeat New Password" required="">
                        </div>
                            <button type="submit" class="btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        `);
    }
}

export async function resetPasswordScript() {
    const resetPasswordBtn = document.querySelector('.form-group button.btn');
    const resetEmail = document.getElementById('reset-email');
    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = resetEmail.value;
            const data = { email };
            const response = await fetch('http://127.0.0.1:8000/api/password_resetting/', {
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
                resetEmail.value = '';
            }
        })
    }
}
