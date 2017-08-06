<template>
  <div class="mw-brand">
    <slot></slot>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-brand'
  })
</script>

<style lang="scss" scoped>
  .mw-brand {
    padding: 1rem;
    font-size: 1.25rem;
  }
</style>
