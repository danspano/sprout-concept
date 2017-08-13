<template>
    <div @click="$emit('clicked')" class="ui-button">
        {{ label }}
    </div>
</template>

<script>
export default {
  name: 'press',
  props: {
      label: {
          type: String,
          required: true
      }
  }
}
</script>

<style scoped>
    .ui-button {
        border: 1px solid #FFF;
        border-radius: 10px;
        padding: 0.5em;
        color: #FFFFFF;
        display: inline-block;
        font-size: 20px;
        user-select: none;
        cursor: default;
        transition: all 200ms ease-out;
    }
    
    .ui-button:hover {
        transform: scale(1.05);
        background-color: #FFF;
        color: #23d160;
    }
    
    .ui-button:active {
        transform: scale(1.02);
    }
</style>