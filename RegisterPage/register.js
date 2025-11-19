document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const messageElement = document.getElementById('register-message');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            messageElement.textContent = '';
            messageElement.style.color = '#D8000C'; // Warna error

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (!email || !password || !confirmPassword) {
                messageElement.textContent = 'Semua field tidak boleh kosong.';
                return;
            }

            if (password !== confirmPassword) {
                messageElement.textContent = 'Password dan konfirmasi password tidak cocok.';
                return;
            }

            // Gunakan fungsi 'auth' dari firebase-init.js
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Registrasi berhasil!
                    const user = userCredential.user;
                    console.log('Registrasi berhasil:', user.uid);
                    
                    messageElement.textContent = 'Registrasi berhasil! Mengarahkan ke login...';
                    messageElement.style.color = 'green';
                    
                    setTimeout(() => {
                        window.location.href = '../LoginPage/login.html';
                    }, 2000);
                })
                .catch((error) => {
                    // Terjadi error
                    console.error('Error registrasi:', error.message);
                    if (error.code === 'auth/email-already-in-use') {
                        messageElement.textContent = 'Email sudah terdaftar.';
                    } else if (error.code === 'auth/weak-password') {
                        messageElement.textContent = 'Password terlalu lemah (minimal 6 karakter).';
                    } else {
                        messageElement.textContent = 'Terjadi kesalahan. Coba lagi.';
                    }
                });
        });
    }
});