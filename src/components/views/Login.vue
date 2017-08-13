<template>
    <transition name="fade">
        <div v-if="authenticated != true" class="login-view">
            <div class="login-container">
                <transition name="fade" appear>
                    <div :key="'loading'" v-if="authenticated == null || loggingIn">
                        <div class="loading"></div>
                    </div>
                    <div :key="'login'" v-if="authenticated == false && !loggingIn">
                        <h1 class="title">
                            Sprout
                        </h1>
                        <h2 class="subtitle">
                            <a class="button is-info" v-on:click="login">Sign In with Google</a>
                        </h2>
                    </div>
                </transition>
            </div>
        </div>
    </transition>
</template> 

<script>
export default {
  name: 'login-view',
  props: {
      authenticated: {
        type: Boolean
      }
  },
  data () {
    return {
      waitingForLogin: false
    }
  },
  methods: {
    login() {
        this.waitingForLogin = true;
        this.$emit('login');
    }
  },
  computed: {
      loggingIn() {
          return !this.$store.state.authentication.loaded;
      }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
    .login-view {
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 20;
        background-color: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .title {
        padding-bottom: 12px;
    }

    @-webkit-keyframes spinAround {
        from {
            -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(359deg);
                    transform: rotate(359deg);
        }
    }

    @keyframes spinAround {
        from {
            -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(359deg);
                    transform: rotate(359deg);
        }
    }

    .loading {
        clear: both;
        -webkit-animation: spinAround 500ms infinite linear;
        animation: spinAround 500ms infinite linear;
        border: 3px solid #444;
        border-radius: 290486px;
        border-right-color: transparent;
        border-top-color: transparent;
        content: "";
        display: block;
        height: 46px;
        position: relative;
        width: 46px;
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s ease;
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
</style>