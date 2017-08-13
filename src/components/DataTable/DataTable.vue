<template>
    <div class="data-table">
    <div class="table-header">
        <div v-for="column in columns" class="column" :style="columnStyle"> 
            {{ column.label }}
        </div>
    </div>
    <div style="clear: both; width: 100%; display: block;"></div>
    <div class="table-body">
        <transition-group>
            <data-table-row @rowSelected="rowSelected" class="table-row" :key="index" :data-index="index" v-for="(item, index) in rows" :row="item" :columns="columns" />
        </transition-group>
    </div>
    <div style="clear: both; width: 100%; display: block;"></div>
</template> 

<script>
import DataTableRow from './DataTableRow';
import Velocity from 'velocity-animate';

export default {
  name: 'data-table',
  props: {
      rows: {
          type: Array,
          default() {
              return [];
          }
      },
      columns: {
          type: Array,
          default() {
              return [];
          }
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
      barSelected(bar) {
        this.$emit('empty');
      },
      beforeEnter(el) {
        var labelElement = el.querySelectorAll('.label');
        labelElement[0].style.opacity = 0;
      },
      enter(el, done) {

        var translateTo = -(el.dataset.percentage * el.querySelectorAll('.bar-container')[0].clientHeight);
        var delay = el.dataset.index * 60;

        var barElement = el.querySelectorAll('.bar-fill');
        var labelElement = el.querySelectorAll('.label');

        setTimeout(() => {
            Velocity(
            barElement,
            { translateY: [translateTo, [250, 20]], duration: 300 },
            { complete: done }
            )

            Velocity(
            labelElement,
            { opacity: [1, [250, 20]], duration: 300 }
            )
        }, delay)

      },
      leave(el, done) {

        var translateTo = 0;
        var delay = (this.amountOfBars - el.dataset.index) * 60;
        var barElement = el.querySelectorAll('.bar-fill');
        var labelElement = el.querySelectorAll('.label');

        setTimeout(() => {
            Velocity(
            barElement,
            { translateY: [40, [250, 20]], duration: 300 },
            { complete: done }
            )

            Velocity(
            labelElement,
            { opacity: [0, [250, 20]], duration: 300 }
            )
        }, delay)


      },
      rowSelected(row) {
          this.$emit('rowSelected', row);
      },
  },
  watch: {
      bars(newBars) {
          if (newBars.length)
            this.amountOfBars = newBars.length;
      }
  },
  components: {
      DataTableRow
  }
}
</script>

<style lang="scss" scoped>
    .data-table {
        width: 100%;
        position: relative;
        margin: auto;
        height: 400px;
        z-index: 2;


        .data-table-row {

            background-color: #FFF;
            transition: background-color 100ms ease-out;

            // &:nth-child(2n) {
            //     background-color: #FFF;
            // }

            &:hover {
                background-color: #f7f6f6;
            }
        }
    }

    .column {
        float: left;
        height: 52px;
        line-height: 52px;
        font-size: 18px;
        box-sizing: border-box;
        padding-left: 16px;
        padding-right: 16px;
        color: #95989A;
    }

</style>