class NotificationManager {
    constructor() {
        this.container = document.getElementById('generalMessage');
    }

    create(options) {
        const {
            type = 'info',
            title,
            message,
            icon,
            actions = [],
            duration = 5000
        } = options;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="${icon}"></i>
            </div>
            <div class="notification-content">
                <h4 class="notification-title">${title}</h4>
                <p class="notification-message">${message}</p>
                ${this.createActionButtons(actions)}
            </div>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
            <div class="notification-progress">
                <div class="progress-bar"></div>
            </div>
        `;

        this.container.appendChild(notification);

        // Start progress bar animation
        const progressBar = notification.querySelector('.progress-bar');
        progressBar.style.transition = `transform ${duration/1000}s linear`;
        requestAnimationFrame(() => {
            progressBar.style.transform = 'scaleX(0)';
        });

        // Setup event listeners
        notification.querySelector('.notification-close').addEventListener('click', 
            () => this.remove(notification));

        // Auto remove after duration
        setTimeout(() => this.remove(notification), duration);

        return notification;
    }

    createActionButtons(actions) {
        if (!actions.length) return '';
        
        return `
            <div class="notification-actions">
                ${actions.map(action => `
                    <button class="action-button ${action.type}" onclick="${action.onClick}">
                        ${action.text}
                    </button>
                `).join('')}
            </div>
        `;
    }

    remove(notification) {
        notification.classList.add('removing');
        notification.addEventListener('animationend', () => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        });
    }
}

const notificationManager = new NotificationManager();

// Rest of your notification functions remain the same
export function showLoginNotification() {
    notificationManager.create({
        type: 'success',
        title: 'Welcome Back! 👋',
        message: 'Successfully logged into your account',
        icon: 'fas fa-check-circle'
    });
}

export function showLogoutNotification() {
    notificationManager.create({
        type: 'info',
        title: 'See You Soon! 👋',
        message: 'You have been safely logged out',
        icon: 'fas fa-sign-out-alt'
    });
}

export function showGameRequest() {
    notificationManager.create({
        type: 'request',
        title: 'Game Challenge! 🎮',
        message: 'John wants to play Chess with you!',
        icon: 'fas fa-gamepad',
        actions: [
            {
                type: 'accept',
                text: 'Let\'s Play',
                onClick: 'handleGameAccept()'
            },
            {
                type: 'reject',
                text: 'Not Now',
                onClick: 'handleGameDecline()'
            }
        ]
    });
}

export function showFriendRequest(user) {
    notificationManager.create({
        type: 'request',
        title: 'New Friend Request 🤝',
        message: `${user} would like to connect with you`,
        icon: 'fas fa-user-plus',
        // actions: [
        //     {
        //         type: 'accept',
        //         text: 'Accept',
        //         onClick: 'sayHello()'
        //     },
        //     {
        //         type: 'reject',
        //         text: 'Decline',
        //         onClick: 'handleFriendDecline()'
        //     }
        // ]
    });
}

export function showNewMessage() {
    notificationManager.create({
        type: 'message',
        title: 'New Message 💬',
        message: 'Mike: Hey! Are you available for a quick chat?',
        icon: 'fas fa-envelope',
        actions: [
            {
                type: 'view',
                text: 'Reply Now',
                onClick: 'handleViewMessage()'
            }
        ]
    });
}

// Handle action functions with enhanced notifications
export function handleGameAccept() {
    notificationManager.create({
        type: 'success',
        title: 'Game On! 🎮',
        message: 'Preparing your game room...',
        icon: 'fas fa-check-circle'
    });
}

export function handleGameDecline() {
    notificationManager.create({
        type: 'info',
        title: 'Maybe Next Time 👋',
        message: 'Game request declined',
        icon: 'fas fa-times-circle'
    });
}

export function handleFriendAccept(user) {
    notificationManager.create({
        type: 'success',
        title: 'New Friend Added! 🎉',
        message: `You and ${user} are now connected`,
        icon: 'fas fa-user-check'
    });
}

export function handleFriendDecline(info) {
    notificationManager.create(info);
}

export function handleViewMessage(info) {
    notificationManager.create(info);
}