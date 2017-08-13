<template>
    <div class="line">
        <svg class="line-svg">
            <path d="" stroke="blue" stroke-linecap="round" stroke-width="4" fill="none" />
        </svg>
    </div>
</template> 

<script>
import Velocity from 'velocity-animate';

export default {
  name: 'chart-line',
  props: {
      line: {
          type: Object,
          default: {
              points: []
          }
      }
  },
  data() {
      return {};
  },
  mounted() {
      this.drawLine();
  },
  methods: {
      generatePath(points, startY = 0) {

          var parts = _.map(points, function(point, index) {

              if (!index) startY = point.y;

              return "L" + point.x + ' ' + point.y;
          })

          return "M0 " + startY  + " " + parts.join(" ");

      },
      animateDrawLine(fromLine, toLine, done = ()=>{}) {
        
        Velocity(
            this.$el,
            {
                tween: [ 1, [400, 25], 0 ],
            }, 
            {
                progress: (elements, c, r, s, t) => {
                    // Draw a line that is tweened based on our progress
                    var tweenedLine = _.cloneDeep(toLine);

                    tweenedLine.points = this.tweenLinePoints(t, fromLine.points, toLine.points);

                    this.drawLine(
                        tweenedLine
                    )
                },
                duration: 500,
                complete: done
            }
        );

      },
      tweenLinePoints(progress, fromLine, toLine) {
          return _.map(fromLine, (point, index) => {
              return {
                  x: point.x + ((toLine[index].x - point.x) * progress),
                  y: point.y + ((toLine[index].y - point.y) * progress)
              }
          });
      },
      drawLine(line = this.line) {
         var pathElement = this.$el.querySelectorAll('path')[0];

         pathElement.setAttribute('stroke', this.line.color);

         pathElement.setAttribute('d', 
            this.generatePath(line.points)
         );
      }
  },
  watch: {
      line(newLine, oldLine) {
        this.animateDrawLine(oldLine, newLine);
      }
  }
}
</script>

<style lang="scss" scoped>
    .line {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        margin: auto;
        height: 400px;
        z-index: 2;
    }

    .line-svg {
        width: 100%;
        height: 100%;
    }

</style>