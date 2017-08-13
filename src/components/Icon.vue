<template>
    <span class="icon">
        <i class="fa" :class="className" aria-hidden="true"></i>
    </span>
</template> 

<script>
export default {
  name: 'icon',
  props: {
      iconName: {
          type: String,
          default: null
      }
  },
  computed: {
      className() {
          return 'fa-' + this.iconName;
      }
  }
}
</script>

<style lang="scss" scoped>
.icon {
    vertical-align: middle;
}
</style>