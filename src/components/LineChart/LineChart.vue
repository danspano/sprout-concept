<template>
    <div class="line-chart" @click="clicked">
        <div class="line-container" :key="index" :data-index="index" v-for="(item, index) in scaledLines">
                <line-chart-line :line="item" />
        </div>
    <div style="clear: both; width: 100%; display: block;"></div>
</template> 

<script>
import LineChartLine from './LineChartLine';
import Velocity from 'velocity-animate';

export default {
  name: 'line-chart',
  props: {
      lines: {
          type: Array,
          default: []
      }
  },
  data() {
      return {
          chartWidth: 0,
          chartHeight: 0,
          scaledLines: []
      }
  },
  mounted() {
      this.chartWidth = this.$el.clientWidth;
      this.chartHeight = this.$el.clientHeight;
      this.scaleLines();
  },
  methods: {
      scaleLine(line) {

          // Make sure the graph ends at the very last right pixel
          // of the plot space, rather than 1 
          var spreadAdjustment = (((1/line.points.length) * this.chartWidth)*(1/line.points.length));

          // Translate the x values evenly across the width of the plot space
          _.forEach(line.points, (point, index) => {
              line.points[index].x = ((this.chartWidth / line.points.length) * index);
              if (index>0) line.points[index].x += (spreadAdjustment*index);
          });

          return line;
      },
      scaleLines() {
          this.scaledLines = _.map(this.lines, (line) => {
              return this.scaleLine(line);
          })
      },
      clicked() {
          this.$emit('clicked');
      }
  },
  watch: {
      lines(newLines, oldLines) {
          this.scaleLines();
      }
  },
  components: {
      LineChartLine
  }
}
</script>

<style lang="scss" scoped>
    .line-chart {
        width: 80%;
        position: relative;
        margin: auto;
        height: 400px;
        z-index: 2;
    }

</style>