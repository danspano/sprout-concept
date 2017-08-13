<template>
  <div id="app">

    <login-view v-if="!user" @login="attemptLogin()"></login-view>
    
    <div v-if="user">
        <menu-view @itemSelected="menuIsShowing = false" :items="menuItems" @selected="menuItemSelected" :selectedItem="selectedMenuItem" />
    
      <main-view-container :user="user" :menuIsShowing="menuIsShowing" @showMenu="menuIsShowing = !menuIsShowing" />

    </div>
  </div> 
</template>

<script>
import LoginView from './components/views/Login';
import MenuView from './components/views/Menu';
import MainViewContainer from './components/MainViewContainer';
import FirebaseApp from './firebase';
import GoogleAuthProvider from './googleAuth';
import _ from 'lodash';
import Velocity from 'velocity-animate';

export default {
  name: 'app',
  data() {
    return {
      authenticated: true,
      menuIsShowing: false,
      menuItems: [
        { label: 'Home', routeName: 'Home' },
        { label: 'Spend', routeName: 'Spend', 
          meta: {
            style: 'neutral',
            label: '-$12.20'
          } 
        },
        { label: 'Earn', routeName: 'Earn',
          meta: {
            style: 'neutral',
            label: '+$122.20'
          } 
         },
        { label: 'Invest', routeName: 'Invest',
          meta: {
            style: 'neutral',
            label: '+3.74%'
          } 
         },
        { label: 'Logout', routeName: 'Home' }
      ],
      selectedMenuItem: null
    }
  },
  mounted() {
    
    //this.$store.dispatch('loadEquities')
    // Highlight the current menu item based on route
    this.selectedMenuItem = _.find(this.menuItems, (item) => {
      return item.routeName == this.$router.currentRoute.name;
    });

    // Check if we're logged in
    this.$store.dispatch('checkAuthenticationStatus');

  },
  computed: {
    authenticated() {
      return this.$store.state.authentication.user != null;
    },
    user() {
      return this.$store.state.authentication.user;
    }
  },
  methods: {
    menuItemSelected(item) {

      // Attempt logout if the user selects 'Sign Out'
      if (item.label == 'Logout')
        return this.attemptLogout();

      this.selectedMenuItem = item;
      this.menuIsShowing = false;
      this.$router.push({ name: item.routeName })
      
    },
    setAuthenticated(bool) {
      this.authenticated = bool;
    },
    setUser(user) {
      this.user = user;
    },
    attemptLogin() {
      this.$store.dispatch('attemptLogin');
    },
    attemptLogout() {
      this.$store.dispatch('attemptLogout');
    }
  },
  components: {
    LoginView, MenuView, MainViewContainer
  },
};
</script>

<style lang="scss">
  @import '~bulma';
  html, body {
    padding: 0;
    margin: 0;
    width: 100%;
    overflow-x: hidden;
    background-color: #FFF;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #444;
    margin-top: 60px;
    overflow-x: hidden;
    width: 100%;
  }

  .spacer {
      width: 100%;
      height: 24px;
      clear: both;
  }

  .title {
      padding-bottom: 12px;
  }

  .main-column {
      width: 80%;
      margin: auto;
      text-align: left;
      box-sizing: border-box;
      padding-top: 24px;
  }

  .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #555;
  }

  .hero-value {

      height: 48px;
      line-height: 48px;

      .value {
          font-size: 32px;
          font-weight: bold;
          color: #95989A;
          float: left;
      }

      .change {
          float: left;
          padding-left: 12px;
          color: #1db151;
      }
  }
  .hint {
      font-size: 18px;
  }
</style>
