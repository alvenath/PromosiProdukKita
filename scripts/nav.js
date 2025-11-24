document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.getElementById('profile-btn');
    const profileMenu = document.getElementById('profile-menu');
    const dropdownEmail = document.getElementById('dropdown-email');
    const logoutBtn = document.getElementById('dropdown-logout');

    if (profileBtn && profileMenu) {
        
        auth.onAuthStateChanged((user) => {
            if (user) {
                // --- USER LOGIN ---
                profileBtn.style.color = '#007bff'; 
                
                if(dropdownEmail) dropdownEmail.textContent = user.email;

                // Klik Ikon -> Buka/Tutup Menu Dropdown (TIDAK PINDAH HALAMAN)
                profileBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    profileMenu.classList.toggle('show');
                };

                // Klik Logout
                if(logoutBtn) {
                    logoutBtn.onclick = (e) => {
                        e.preventDefault();
                        auth.signOut().then(() => {
                            window.location.href = '../LoginPage/login.html';
                        });
                    };
                }

            } else {
                // --- USER BELUM LOGIN ---
                profileBtn.style.color = ''; 
                
                // Klik Ikon -> Langsung ke Login Page
                profileBtn.onclick = () => {
                    window.location.href = '../LoginPage/login.html';
                };
            }
        });

        // Tutup menu jika klik di luar
        window.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
            }
        });
    }
    
    // ... (Kode Search Bar tetap di bawah sini) ...
});