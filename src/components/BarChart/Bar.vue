<template>
    <div class="bar">
        <div class="bar-container">
            <div class="bar-fill" @click="barSelected">
            
                <div class="bar-label">
                    ${{ barAmount }}
                </div>

            </div>
        </div>
        <div class="label">
            {{ this.bar.label }}
        </div>
    </div>
</template> 

<script>
import Velocity from 'velocity-animate';

export default {
  name: 'bar',
  props: {
      bar: {
          type: Object,
          default: null
      },
      barIndex: {
          type: Number
      }
  },
  data() {
      return {
          maxBarHeight: 0
      }
  },
  computed: {
      barStyle() {
          return {
              'transform': 'translateY(' + -(this.bar.percentage * this.maxBarHeight) + 'px)'
          }
      },
      barAmount() {
          return Math.round((this.bar.percentage * 100) * 100) / 100;
      }
  },
  mounted() {
    this.maxBarHeight = this.$el.querySelectorAll('.bar-container')[0].clientHeight - 34;
  },
  methods: {
      barSelected() {
          this.$emit('barSelected', this.bar);
      },
      barValueChanged() {
        var barElement = this.$el.querySelectorAll('.bar-fill')[0];
        var translateTo = -(this.bar.percentage * this.maxBarHeight);

            Velocity(
            barElement,
            { translateY: [translateTo, [250, 20]], duration: 300 }  
            )


      }
  },
  watch: {
      bar() {
          this.barValueChanged();
      }
  }
}
</script>

<style lang="scss" scoped>

    .bar {
        height: 100%;
        position: relative;
        box-sizing: border-box;
        padding-bottom: 34px;
    }

    .label {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 34px;
        width: 100%;
        line-height: 34px;
        text-align: center;
        color: #95989A;
        transition: color 100ms ease-out;
    }

    .bar-label {
        height: 32px;
        line-height: 32px;
        box-sizing: border-box;
        margin-left: auto;
        width: 100%;
        // padding: 6px;
        // border-radius: 14px;
        // background-color: #f7f6f6;
        position: absolute;
        top: -34px;
        transform: translateY(0);
        transition: transform 100ms ease-out, opacity 100ms ease-out;
        text-align: center;
        font-size: 16px;
        color: #555;
        pointer-events: none;
        opacity: 0;
    }

    .bar-container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        overflow: hidden;
        position: relative;
    }

    .bar-fill {
        width: 80%;
        height: 120%;
        margin: auto;
        position: absolute;
        top: 100%;
        left: 10%;
        border-top-right-radius: 14px;
        border-top-left-radius: 14px;
        background-color: #23D160;
        transition: background-color 100ms ease-out;
    }

    .bar {

        &:hover {
            .bar-fill {
                background-color: #46e27d;
            }

            .bar-label {
                opacity: 1;
                //transform: translateY(-6px);
            }

            .label {
                color: #333;
            }
        }
    }

</style>