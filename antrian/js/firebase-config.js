import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrpHyNFcbeTebhsW0qTVFEltMuH7G3pS4",
  authDomain: "antrian-ptsp.firebaseapp.com",
  databaseURL: "https://antrian-ptsp-default-rtdb.firebaseio.com/",
  projectId: "antrian-ptsp",
  storageBucket: "antrian-ptsp.firebasestorage.app",
  messagingSenderId: "425544756383",
  appId: "1:425544756383:web:a2efb16935d5ab186046aa",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.ambilAntrian = async function (loket) {
  const output = document.getElementById("output");
  try {
    const antrianRef = ref(db, "antrian/loket" + loket);
    const snapshot = await get(antrianRef);
    let lastNumber = 0;
    if (snapshot.exists()) {
      const data = snapshot.val();
      const keys = Object.keys(data);
      if (keys.length > 0) {
        // Ambil nomor terakhir
        const lastKey = keys[keys.length - 1];
        lastNumber = parseInt(lastKey.split("-")[1]);
      }
    }
    const nextNumber = lastNumber + 1;
    const nomor = loket + "-" + nextNumber;
    // Simpan ke database
    await set(child(antrianRef, nomor), {
      nomor: nomor,
      waktu: new Date().toISOString(),
    });
    output.innerHTML = "Nomor antrian Anda: " + nomor;
  } catch (error) {
    console.error("Error:", error);
    output.innerHTML = "Terjadi kesalahan. Silakan coba lagi.";
  }
};

export { db };
