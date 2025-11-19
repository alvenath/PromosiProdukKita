document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.querySelector('.icon-button[title="Profile"]');
    
    if (profileIcon) {
        // Dengarkan status login dari Firebase
        auth.onAuthStateChanged((user) => {
            if (user) {
                // JIKA LOGIN: Ubah ikon jadi biru & arahkan ke Profile
                profileIcon.style.color = '#007bff'; 
                
                // Cek kita ada di folder mana untuk mengatur path yang benar
                if (window.location.pathname.includes('/Homepage/') || 
                    window.location.pathname.includes('/Product Page/') || 
                    window.location.pathname.includes('/About Page/') || 
                    window.location.pathname.includes('/Contact Page/')) {
                    profileIcon.href = '../ProfilePage/profile.html';
                } else {
                    // Fallback (jaga-jaga)
                    profileIcon.href = '../ProfilePage/profile.html';
                }
                
            } else {
                // JIKA BELUM LOGIN: Reset warna & arahkan ke Login
                profileIcon.style.color = ''; 
                profileIcon.href = '../LoginPage/login.html';
            }
        });
    }
});