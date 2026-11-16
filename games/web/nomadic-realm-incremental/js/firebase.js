
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


 const firebaseConfig = {
    apiKey: "AIzaSyAJa7UJJMXBBDJ7Lv4AWRMjniLfUHIcgX4",
    authDomain: "incremental-monsters-rpg.firebaseapp.com",
    projectId: "incremental-monsters-rpg",
    storageBucket: "incremental-monsters-rpg.appspot.com",
    messagingSenderId: "816666695297",
    appId: "1:816666695297:web:a7dd3a37b6d09e30641f80",
    measurementId: "G-S89WGRY8MF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const auth = firebase.auth();
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login bem-sucedido
      const user = userCredential.user;
      // Faça o que for necessário após o login
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Trate o erro de login
    });
});

