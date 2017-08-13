<template>
    <div class="bar-chart" @click="barSelected">
    <transition-group v-on:leave="leave" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:appear="enter" appear>
        <div class="bar-section" :style="barStyle" :key="index" :data-index="index" :data-percentage="item.percentage" v-for="(item, index) in bars">
                <bar :bar="item" />
        </div>
    </transition-group>
    <div style="clear: both; width: 100%; display: block;"></div>
</template> 

<script>
import Bar from './Bar';
import Velocity from 'velocity-animate';

export default {
  name: 'bar-chart',
  props: {
      bars: {
          type: Array,
          default: []
      }
  },
  data() {
      return {
          amountOfBars: 0
      }
  },
  mounted() {
      this.amountOfBars = this.bars.length;
  },
  computed: {
      barStyle() {
          return { width: ((1 / this.bars.length) * 100) + '%' }
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

        var translateTo = -(el.dataset.percentage * (el.querySelectorAll('.bar-container')[0].clientHeight - 34));
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


      }
  },
  watch: {
      bars(newBars) {
          if (newBars.length)
            this.amountOfBars = newBars.length;
      }
  },
  components: {
      Bar
  }
}
</script>

<style lang="scss" scoped>
    .bar-chart {
        width: 80%;
        position: relative;
        margin: auto;
        height: 400px;
        z-index: 2;
    }

    .bar-section {
        float: left;
        width: 10%;
        height: 100%;
    }

</style>