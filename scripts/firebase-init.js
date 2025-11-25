// 1. Konfigurasi Firebase Anda (Salin ulang bagian ini dari Firebase Console jika perlu)
const firebaseConfig = {
  apiKey: "AIzaSyAkYvJAReSZQNaWBtYb6ipE9Wy2hNemXME",
  authDomain: "promosiprodukkita.firebaseapp.com",
  projectId: "promosiprodukkita",
  storageBucket: "promosiprodukkita.firebasestorage.app",
  messagingSenderId: "908336793468",
  appId: "1:908336793468:web:e0725a2fcef3096c1086f9",
  measurementId: "G-G0MW94N1EM"
};

// 2. Inisialisasi Firebase (INI YANG SALAH SEBELUMNYA)
// Kita harus menggunakan 'firebase.' di depannya karena kita pakai CDN versi 8
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // jika sudah diinisialisasi, gunakan yang sudah ada
}

// 3. Simpan modul Auth ke dalam variabel agar bisa dipakai di login.js/register.js
const auth = firebase.auth();

const db = firebase.firestore(); // <--- TAMBAHAN BARU INI