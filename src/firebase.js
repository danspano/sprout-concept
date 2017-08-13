import Firebase from 'firebase';

// Configre Firebase
const config = {
    apiKey: "AIzaSyC4iE1i-xWmGpqfMZR6W1SliOeXaMNi050",
    authDomain: "sprout-8ab44.firebaseapp.com",
    databaseURL: "https://sprout-8ab44.firebaseio.com",
    storageBucket: "sprout-8ab44.appspot.com",
    messagingSenderId: "899653142938"
};

const FirebaseApp = Firebase.initializeApp(config);

export default FirebaseApp;