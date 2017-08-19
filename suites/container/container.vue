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
  .mw-container {
    width: 100%;
    max-width: 1200px;
    padding: 2rem;
    margin: 0 auto;
  }
</style>
