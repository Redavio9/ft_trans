export async function resetPasswordComponent(type) {
    if (type === 'reset-password') {
        return (`
            <div class="sing-forms">
                <div class="logo">
                    <img src="../images/logo.png" alt="logo" />
                </div>
                <div class="form">
                    <h2>Reset Password</h2>
                    <form id="resetPasswordForm">
                        <div class="form-group">
                        <div class="filed">
                            <label for="reset-email"><i class="far fa-user-circle" aria-hidden="true"></i></label>
                            <input type="text" id="reset-email" name="reset-email" placeholder="Email" required="">
                        </div>
                            <button type="submit" class="btn">Reset</button>
                        </div>
                    </form>
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

}
