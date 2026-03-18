const firebaseConfig = {
    apiKey: "AIzaSyCAgloyZeTbJBJfsoBYqefBZlbyri1y01M",
    authDomain: "spme-f781f.firebaseapp.com",
    projectId: "spme-f781f",
    storageBucket: "spme-f781f.firebasestorage.app",
    messagingSenderId: "949847273520",
    appId: "1:949847273520:web:34d57ac418cf160eacbdf5"
};

firebase.initializeApp(firebaseConfig);

// VALIDA SE O USUÁRIO ESTÁ LOGADO
firebase.auth().onAuthStateChanged((aa) => {
    if (!aa?.uid) {
        window.location.href = "index.html";
    }
})