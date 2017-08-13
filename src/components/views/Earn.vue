<template>
    <div class="earn-view">
        <menu-bar @menuButtonClicked="showMenu" title="Earn" />
        <div class="main-column">
            <div class="section-title">
                Earnings vs Spending
            </div>
            <div class="hero-value">
                <div class="value negative">
                $188.90
                </div>
            </div>
            <div class="spacer"></div>
            <div class="hint">Experimenting with the animation of line graph transitions.</div>
            <div class="hint">Try clicking the graph to randomise the data!</div>
            <div class="spacer"></div>
            <line-chart @clicked="changeLineData" :lines="lines" />
        </div>
    </div>
</template> 

<script>
import MenuBar from './../MenuBar';
import LineChart from './../LineChart/LineChart';
import Icon from './../Icon';

export default {
  name: 'earn-view',
  data() {
      return {
          bars: [],
          dataRotation: 'months',
          rows: [],
          lines: [
              {
                  color: '#23D160',
                  points: [
                    {x: 0, y: 10},
                    {x: 40, y: 20},
                    {x: 80, y: 10},
                    {x: 120, y: 40},
                    {x: 160, y: 80},
                    {x: 920, y: 10}
                  ]
              },
                {
                  color: '#01A9F1',
                  points: [
                    {x: 0, y: 200},
                    {x: 40, y: 48},
                    {x: 80, y: 102},
                    {x: 120, y: 120},
                    {x: 160, y: 80},
                    {x: 920, y: 200}
                  ]
              }
            ]
      }
  },
  props: {
  },
  methods: {
      showMenu() {
          this.$emit('showMenu');
      },
        changeLineData() {
            this.lines = [
              {
                  color: '#23D160',
                  points: [
                    {x: 0, y: Math.random() * 300},
                    {x: 40, y: Math.random() * 300},
                    {x: 80, y: Math.random() * 300},
                    {x: 120, y: Math.random() * 300},
                    {x: 160, y: Math.random() * 300},
                    {x: 920, y: Math.random() * 300}
                  ]
              },
              {
                  color: '#01A9F1',
                  points: [
                    {x: 0, y: Math.random() * 300},
                    {x: 40, y: Math.random() * 300},
                    {x: 80, y: Math.random() * 300},
                    {x: 120, y: Math.random() * 300},
                    {x: 160, y: Math.random() * 300},
                    {x: 920, y: Math.random() * 300}
                  ]
              }
            ]
      },
  },
  components: {
      MenuBar, Icon, LineChart
  }
}
</script>

<style lang="scss" scoped>
    .earn-view {
        width: 100%;
        color: #444;
        background-color: #FFF;
    }
    
    .title {
        padding-bottom: 12px;
    }
    
    .negative {
      color: #ff3860;
    }
</style>