document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('login-error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            errorMessage.textContent = '';

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                errorMessage.textContent = 'Email dan password tidak boleh kosong.';
                return;
            }

            // Gunakan fungsi 'auth' dari firebase-init.js
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Login berhasil!
                    const user = userCredential.user;
                    console.log('Login berhasil:', user.uid);
                    
                    // Arahkan ke homepage
                    window.location.href = '../Homepage/index.html';
                })
                .catch((error) => {
                    // Terjadi error
                    console.error('Error login:', error.message);
                    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                        errorMessage.textContent = 'Email atau password salah.';
                    } else {
                        errorMessage.textContent = 'Terjadi kesalahan. Coba lagi.';
                    }
                });
        });
    }
});