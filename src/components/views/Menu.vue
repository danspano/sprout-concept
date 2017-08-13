<template>
    <div class="menu-view">
        <main-menu-item v-for="(item, index) in items" :item="item" :key="index" :selected="isItemSelected(item)" @itemSelected="itemSelected" />
    </div>
</template> 

<script>
import MainMenuItem from './../MainMenuItem';

export default {
  name: 'menu-view',
  props: {
      items: {
          type: Array,
          default() {
              return [
                  {label: 'Home'},
                  {label: 'Home'}
              ];
          }
      },
      currentUser: {
          type: Object,
          default: null
      },
      selectedItem: {
          type: Object,
          default: null
      }
  },
  methods: {
    isItemSelected(item) {
      return this.selectedItem === item;
    },
    itemSelected(item) {
        this.$emit('selected', item);
    }
  },
  computed: {

  },
  components: {
    MainMenuItem
  }
}
</script>

<style lang="scss" scoped>
    .menu-view {
        width: 100%;
        color: #444;
        text-align: left;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        padding-top: 32px;
        box-sizing: border-box;
    } 
</style>