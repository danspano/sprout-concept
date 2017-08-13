<template>
    <div @click="rowSelected" class="data-table-row">
        <div v-for="column in columns" :style="columnStyle" class="data-table-cell">
             {{ column.value(row) }}
        </div>
    </div>
</template> 

<script>
import Velocity from 'velocity-animate';

export default {
  name: 'data-table-row',
  props: {
      row: {
          type: Object,
          default: null
      },
      columns: {
          type: Array,
          default: []
      }
  },
  computed: {
      columnStyle() {
          return {
              width: ((1 / this.columns.length) * 100) + '%'
          }
      }
  },
  methods: {
      rowSelected() {
          this.$emit('rowSelected', this.row);
      },
  }
}
</script>

<style lang="scss" scoped>
    .data-table-row {
        width: 100%;
        height: 52px;
        line-height: 52px;
        font-size: 18px;
        user-select: none;
        cursor: pointer;
        border-radius: 10px;
    }

    .data-table-cell {
        float: left;
        box-sizing: border-box;
        padding-left: 16px;
        padding-right: 16px;
    }
</style>