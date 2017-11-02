<template>
  <div class="mw-container">
    <slot></slot>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-container'
  })
</script>

<style lang="scss">
  @import "~vue-human/scss/mixins/media";

  .mw-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    @include min-screen(mobile) {
      padding: 1rem;
    }
  }
</style>
