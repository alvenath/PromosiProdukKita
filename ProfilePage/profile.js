document.addEventListener('DOMContentLoaded', () => {
    const userEmailElement = document.getElementById('user-email');
    const userUidElement = document.getElementById('user-uid');
    const logoutBtn = document.getElementById('logout-btn');

    auth.onAuthStateChanged((user) => {
        if (user) {
            userEmailElement.textContent = user.email;
            userUidElement.textContent = `UID: ${user.uid}`;
        } else {
            window.location.href = '../LoginPage/login.html';
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.signOut().then(() => {
                window.location.href = '../LoginPage/login.html';
            }).catch((error) => {
                console.error('Error saat logout:', error);
                alert('Gagal logout. Coba lagi.');
            });
        });
    }
});