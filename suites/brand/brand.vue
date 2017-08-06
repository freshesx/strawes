<template>
  <div class="sw-brand">
    <slot></slot>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'sw-brand'
  })
</script>

<style lang="scss" scoped>
  .sw-brand {
    padding: 1rem;
    font-size: 1.25rem;
  }
</style>
