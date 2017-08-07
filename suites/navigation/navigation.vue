<template>
  <div class="mw-navigation">
    <slot></slot>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-navigation'
  })
</script>
