<template>
  <div class="mw-table-check" :class="{ 'is-active': checked }" @click="onClick"></div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-table-check',
    props: {
      checked: Boolean
    },
    methods: {
      onClick (event) {
        this.$emit('click', event)
      }
    }
  })
</script>

<style lang="scss">
  @import "./vars";

  @keyframes mw-table-check-bounce {
    0% {
      transform: translate(0);
    }
    25% {
      transform: translate(0, -2px);
    }
    50% {
      transform: translate(0, 1px);
    }
    75% {
      transform: translate(0, -3px);
    }
    100% {
      transform: translate(0);
    }
  }

  .mw-table-check {
    border: solid 2px $mw-table-check-bg;
    border-radius: 0.25rem;
    width: 16px;
    height: 16px;
    cursor: pointer;
    transition-duration: 200ms;

    &.is-active {
      background: $mw-table-check-active-bg;
      border-color: darken($mw-table-check-active-bg, 5%);
      animation: 800ms mw-table-check-bounce;
    }
  }
</style>
