<template>
    <transition v-on:enter="enter" v-on:leave="leave" v-on:appear="enter" appear>
        <div v-if="showing" class="modal-view">
            <div class="modal-shade">
            </div>
            <div class="modal-container">
                <div class="close-button" @click="modalClosed">
                    <icon :iconName="'times'" @click="modalClosed" />
                </div>
                <div class="modal-title">
                    <slot name="title"></slot>
                </div>

                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>

</template> 

<script>
import Velocity from 'velocity-animate';
import Icon from './../Icon';

export default {
  name: 'modal-view',
  props: {
      showing: {
          type: Boolean,
          default: true
      }
  },
  data() {
      return {
          toggle: false
      }
  },
  methods: {
      modalClosed() {
          this.toggle = !this.toggle;
        this.$emit('modalClosed');
      },
      enter(el, done) {

        var shadeElement = el.querySelectorAll('.modal-shade');
        var containerElement = el.querySelectorAll('.modal-container')[0];
        var translateTo = (window.innerHeight/2) - (containerElement.clientHeight * .5);
        
        Velocity(
        shadeElement,
        { opacity: [1, 0] },
        { duration: 200 }
        )

        Velocity(
        containerElement,
        { translateY: [translateTo, [400, 30], window.innerHeight] },
        { duration: 400, complete: done },
        )

      },
      leave(el, done) {

        var shadeElement = el.querySelectorAll('.modal-shade');
        var containerElement = el.querySelectorAll('.modal-container')[0];
        var translateTo = (window.innerHeight/2) - (containerElement.clientHeight * .5);
        
        Velocity(
        shadeElement,
        { opacity: [0, 1] },
        { duration: 200 }
        )

        Velocity(
        containerElement,
        { translateY: [window.innerHeight, [400, 30], translateTo] },
        { duration: 400, complete: done },
        )

      }
  },
  components: {
      Icon
  }
}
</script>

<style lang="scss" scoped>
    .modal-view {
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: scroll;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }

    .modal-shade {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-container {
        height: 60vh;
        width: 60%;
        margin-left: 20%;
        background-color: #FFF;
        border-radius: 14px;
        position: fixed;
        box-sizing: border-box;
        padding: 18px;

        .close-button {
            padding-right: 4px;
            margin-top: -6px;
            margin-right: -6px;
            font-size: 20px;
            color: #777;
            float: right;
            cursor: pointer;
            user-select: none;

            &:hover {
                color: #555;
            }
        }


        .modal-title {
            font-size: 20px;
            font-weight: bold;
            color: #555;
            padding-bottom: 20px;
        }
    }
</style>