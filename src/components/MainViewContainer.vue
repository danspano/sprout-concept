<template>
    <div class="main-view-container">
    <transition name="fade">
        <div v-if="menuIsShowing" @click="showMenu" class="shade"></div>
    </transition>
        <router-view :user="user" @showMenu="showMenu" class="main-view" />
    </div>
</template> 

<script>
import Velocity from 'velocity-animate';

export default {
  name: 'main-view-container',
  props: {
      menuIsShowing: {
          type: Boolean
      },
      user: {
          type: Object,
          required: false,
      }
  },
  methods: {
      showMenu() {
          this.$emit('showMenu');
      },
  },
  watch: {
    menuIsShowing(newValue, oldValue) {

      var translateTo = newValue ? 300 : 0;

      Velocity(
        document.querySelector('.main-view-container'),
        { translateX: translateTo, duration: 300 },
        [200, 30]
      )

    }
  },
  components: {
      
  }
}
</script>

<style lang="scss" scoped>

.main-view-container {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
  z-index: 10;
  box-shadow: -6px 0px 20px 0px rgba(0,0,0,0.1)
}

.main-view {
  min-height: 100vh;
  width: 100%;
}

.shade {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    transition: opacity 200ms ease-out;
    z-index: 10;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>