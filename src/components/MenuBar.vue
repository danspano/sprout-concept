<template>
    <div class="menu-bar">
        <div @click="menuButtonClicked" class="left">
            <icon class="menu-icon" iconName="bars" />
        </div>
        <div class="center">
            {{ title }}
        </div>
        <div class="right"></div>
    </div>
</template> 

<script>
import Icon from './Icon';

export default {
  name: 'menu-bar',
  props: {
      title: {
          type: String,
          default: null
      }
  },
  methods: {
      menuButtonClicked() {
          this.$emit('menuButtonClicked');
      }
  },
  components: {
      Icon
  }
}
</script>

<style lang="scss" scoped>
.menu-bar {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 12px;
    font-size: 22px;

    .menu-icon {
        display: block;
        margin-top: -6px;
    }

    .left {
        float: left;
    }

    .center {
        margin: auto;
    }

    .right {
        float: right;
    }
}
</style>