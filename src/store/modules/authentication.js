import db from './../../db';
import FirebaseApp from './../../firebase';
import GoogleAuthProvider from './../../googleAuth';

const state = {
    user: null,
    loaded: false
}


const getters = {
    user: state => state.currentUser
}


const actions = {
    checkAuthenticationStatus({ commit, state }) {

        FirebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                commit('setLoggedIn', { user: user });
            } else {
                // No user is signed in.
                commit('setLoggedOut');
            }
        });
    },
    attemptLogout({ commit, state }) {

        FirebaseApp.auth().signOut().then(() => {

            commit('setLoggedOut');

        }, function (error) {
            // An error happened.
        });

    },
    attemptLogin({ commit, state }) {

        FirebaseApp.auth().signInWithRedirect(GoogleAuthProvider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            commit('setLoggedIn', { user: user });

            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    }
}

const mutations = {
    setLoggedIn(state, { user }) {
        state.user = user;
        state.loaded = true;
    },
    setLoggedOut(state) {
        state.user = null;
        state.loaded = true;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}