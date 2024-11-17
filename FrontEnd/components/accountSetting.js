import { header, menu } from './home.js'
import { fetchProfile, globalState } from '../scripts/fetchData.js';
import { handleViewMessage } from '../scripts/generalMessage.js';


export async function accountSettingComponent() {
    if (globalState.user === null) {
        await fetchProfile();
    }
    if (globalState.user === null) {
        return (`cant fetch user data`)
    }
    return (
        header() +
        menu() +
        accountSettingContent()
    )
}


export function accountSettingContent() {
    return (`
        <div class="account-setting">
            <h2>Account Settings</h2>
            <div class="setting-group">
                <img src="${globalState.user.avatar}" alt="Current profile picture" class="profile-pic" id="profilePic" data-image_id="0" alt-rewritten="Current profile picture">
                <input id="setting-upload" type="file" id="avatarUpload" style="display: none;" accept="image/*">
                <label for="setting-upload" class="upload-btn">Upload Avatar</label>
                
                <div class="avatar-selection">
                    <img src="https://page-images.websim.ai/Avatar option 1_1024x1024xemJ2jr7UINRqya9Hdxa0371ad0442e3.jpg" alt="Avatar option 1" class="avatar-option" data-image_id="1" alt-rewritten="An illustrated avatar icon in a simple, cartoon-like style.">
                    <img src="https://page-images.websim.ai/Avatar option 2_1024x1024xemJ2jr7UINRqya9Hdx50b29b899b783.jpg" alt="Avatar option 2" class="avatar-option" data-image_id="2" alt-rewritten="A simple, stylized digital avatar illustration of a head with basic facial features.">
                    <img src="https://page-images.websim.ai/Avatar option 3_1024x1024xemJ2jr7UINRqya9Hdx6b1540d5d67c9.jpg" alt="Avatar option 3" class="avatar-option" data-image_id="3" alt-rewritten="Illustrated avatar profile picture, simple stylized portrait.">
                    <img src="https://page-images.websim.ai/Avatar option 4_1024x1024xemJ2jr7UINRqya9Hdx0f7f690b93205.jpg" alt="Avatar option 4" class="avatar-option" data-image_id="4" alt-rewritten="Avatar option 4">
                </div>
            </div>

            <div class="setting-group">
                <div class="setting-item">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value="${globalState.user.first_name}">
                </div>
                <div class="setting-item">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value="${globalState.user.last_name}">
                </div>
                <div class="setting-item">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" value="${globalState.user.username}">
                </div>
            </div>

            <div class="setting-group">
                <div class="setting-item">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value="${globalState.user.email}">
                </div>

                <div class="setting-item">
                    <label for="2fa">Two Factor Authentication</label>
                    <input type="checkbox" id="two_fa" name="2fa" value="2fa" ${globalState.user.two_fa ? 'checked' : ''}>
                </div>
            </div>
            <button type="button" class="btn save-btn">Save Changes</button>
            <button type="button" class="btn change-password-btn">Change Password</button>
        </div>

        <div id="passwordModal" class="modal">
            <div class="modal-content">
                <span class="close">×</span>
                <h2>Change Password</h2>
                <input type="password" id="currentPassword" placeholder="Current Password" style="display: block; margin: 20px auto;">
                <input type="password" id="newPassword" placeholder="New Password" style="display: block; margin: 20px auto;">
                <input type="password" id="reNewPassword" placeholder="Repeat New Password" style="display: block; margin: 20px auto;">
                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                    <button class="btn save-password-btn" style="margin-top: 0;">Confirm</button>
                    <button class="btn cencel-password-btn" style="margin-top: 0; background-color: #FF6B6B;">Cancel</button>
                </div>
            </div>
        </div>
    `)
}


export async function accountSettingScript() {
    const changePassword = document.querySelector('.account-setting .change-password-btn');
    const saveBtn = document.querySelector('.account-setting .save-btn');
    const passwordModal = document.querySelector('#passwordModal');
    const passwordModalClose = document.querySelector('#passwordModal span');
    const passwordModalCancel = document.querySelector('#passwordModal .cencel-password-btn');
    const savePasswordBtn = document.querySelector('#passwordModal .save-password-btn');

    // Save changes to user profile data
    if (saveBtn) {
        saveBtn.addEventListener('click', async function () {
            await updateProfile();
        })
    }

    // Save changes to user password
    if (savePasswordBtn) {
        savePasswordBtn.addEventListener('click', async () => {
            await changePasswordModal();
        })
    }

    if (changePassword) {
        changePassword.addEventListener('click', function () {
            passwordModal.style.display = 'block';
        })
    }

    if (passwordModalClose) {
        passwordModalClose.addEventListener('click', function () {
            passwordModal.style.display = 'none';
        })
    }

    if (passwordModalCancel) {
        passwordModalCancel.addEventListener('click', function () {
            passwordModal.style.display = 'none';
        })
    }

    const avatarSelector = document.querySelectorAll('.account-setting .avatar-selection img');

    if (avatarSelector) {
        avatarSelector.forEach(selector => {
            selector.addEventListener('click', function (e) {
                avatarSelector.forEach(selector => {
                    selector.classList.remove('active');
                })
                selector.classList.add('active');
                const target = e.target;
                if (target.tagName === 'IMG') {
                    const profilePic = document.querySelector('.account-setting .profile-pic');
                    profilePic.src = target.src;
                }
            })
        })
    }
}

async function updateProfile() {
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const avatar = document.querySelector('.account-setting .profile-pic');
    const twoFa = document.querySelector('#two_fa');

    const response = await fetch('http://127.0.0.1:8000/api/profile_updating/', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            first_name: firstName?.value,
            last_name: lastName?.value,
            username: username?.value,
            email: email?.value,
            two_fa: twoFa?.checked,
        })
    }).then(response => response.json());
    if (!response.error) {
        handleViewMessage({
            title: 'Success',
            message: response?.success,
            type: 'success',
            icon: 'fas fa-check-circle'
        });
    } else {
        handleViewMessage({
            title: 'Error',
            message: response?.error,
            type: 'error',
            icon: 'fas fa-exclamation-circle'
        });
    }
}

async function changePasswordModal() {
    const currentPassword = document.querySelector('#currentPassword');
    const newPassword = document.querySelector('#newPassword');
    const reNewPassword = document.querySelector('#reNewPassword');

    if (newPassword?.value !== reNewPassword?.value) {
        handleViewMessage({
            title: 'Error',
            message: 'New passwords do not match with repeat password',
            type: 'error',
            icon: 'fas fa-exclamation-circle'
        });
        return;
    }

    const response = await fetch('http://127.0.0.1:8000/api/password_updating/', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            old_password: currentPassword?.value,
            new_password: newPassword?.value,
            re_new_password: reNewPassword?.value
        })
    }).then(response => response.json());
    if (!response.error) {
        handleViewMessage({
            title: 'Success',
            message: response?.success,
            type: 'success',
            icon: 'fas fa-check-circle'
        });
        currentPassword.value = '';
        newPassword.value = '';
        reNewPassword.value = '';
        const passwordModal = document.querySelector('#passwordModal');
        if (passwordModal)
            passwordModal.style.display = 'none';
    } else {
        handleViewMessage({
            title: 'Error',
            message: response?.error,
            type: 'error',
            icon: 'fas fa-exclamation-circle'
        });
    }

}