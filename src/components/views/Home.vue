<template>
    <div class="home-view">
        <menu-bar @menuButtonClicked="showMenu" title="Home" />
        <div class="main-column">
            <div class="spacer"></div>
            <div class="hint">Use the menu icon in the top left to explore!</div>
            <div class="spacer"></div>
            <div class="section-title">
                Sprout concept includes:
            </div>
            <ul class="feature-list">
                <li>Component architecture in VueJS 2</li>
                <li>Custom transitions and animations</li>
                <li>Google Authentication using Firebase</li>
                <li>Data storage using Firebase</li>
                <li>Application state with Vuex</li>
                <li>Routing with Vue Router</li>
            </ul>
        </div>
    </div>
</template> 

<script>
import Icon from './../Icon';
import MenuBar from './../MenuBar';

export default {
  name: 'home-view',
  props: {
  },
  methods: {
      showMenu() {
          this.$emit('showMenu');
      }
  },
  components: {
      Icon, MenuBar
  }
}
</script>

<style lang="scss" scoped>
    .home-view {
        width: 100%;
        color: #444;
        background-color: #FFF;
    }
    
    .title {
        padding-bottom: 12px;
    }

    .feature-list {
        font-size: 20px;
        margin-top: 12px;

        li {
            margin-top: 4px;
        }
    }
    
</style>