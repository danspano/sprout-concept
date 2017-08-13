<template>
    <div class="menu-item" :class="{ 'selected': selected }" @click="itemSelected">
        <div class="label">
            {{ item.label }}
        </div>
        <div v-if="item.meta" class="meta" :class="item.meta.style">
            {{ item.meta.label }}
        </div>
        <div class="clear"></div>
    </div>
</template> 

<script>
export default {
  name: 'main-menu-item',
  props: {
      item: {
          type: Object,
          default: null
      },
      selected: {
          type: Boolean,
          default: false
      }
  },
  methods: {
      itemSelected() {
          this.$emit('itemSelected', this.item);
      }
  }
}
</script>

<style lang="scss" scoped>
    .menu-item {
        font-weight: normal;
        font-size: 20px;
        padding-top: 16px;
        padding-bottom: 16px;
        padding-left: 16px;
        user-select: none;
        cursor: pointer;
        box-sizing: border-box;
        height: 60px;
        transition: background-color 100ms ease-out;
    }

    .label, .meta {
        float: left;
        line-height: 28px;
    }

    .label {
        width: 100px;
        transition: color 100ms ease-out;
    }

    .meta {
        width: 100px;
    }

    .meta {
        font-size: 16px;
        line-height: 30px;
        padding-left: 50px;

        &.positive {
            color: #23D160;
        }

        &.neutral {
            color: #95989A;
        }

        &.negative {
            color: #FF3860;
        }
    }

    .menu-item:hover {
        background-color: #f7f6f6;
    }

    .menu-item.selected {
        .label {
            color: #23D160;
        }
    }

    .menu-item.selected {
        .label {
            font-weight: bold;
        }
    }

    .clear {
        clear: both;
    }
    
</style>