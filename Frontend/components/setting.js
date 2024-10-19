 export function renderSettings() {
  const settingsContainer = document.getElementById('body');
  settingsContainer.innerHTML = `
      <div class="container">
      <div class="d-flex align-items-center justify-content-center vh-100">
          <div class="row justify-content-center">
              <div class="col">
                  <div class="settings-container">
                      <h2 class="text-center mb-4">Settings</h2>
                      <form id="settings-form" style="font-family: 'Fantasy', cursive;">
                          <div class="form-group text-center">
                              <label for="avatar">Avatar</label>
                              <div>
                                  <img id="avatar-preview" class="avatar-preview mb-3 rounded-circle h-25 w-25" src="./avatars/avatar2.png" alt="Avatar">
                              </div>
                              <input type="file" class="form-control-fil p-4" id="avatar" accept="image/*"">
                          </div>
                          <div class="form-group">
                              <label class="m-2" for="username">Username</label>
                              <input type="text" class="form-control m-2" id="username" placeholder="Enter new username" required>
                          </div>
                          <div class="form-group">
                              <label class="m-2" for="password">Old Password</label>
                              <input type="password" class="form-control m-2" id="password" placeholder="Enter old password" required>
                          </div>
                          <div class="form-group">
                              <label class="m-2" for="password">New Password</label>
                              <input type="password" class="form-control m-2" id="password" placeholder="Enter new password" required>
                          </div>
                          <button type="submit" class="btn btn-primary btn-block m-2 w-100">Save Changes</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
      </div>
  `;
}