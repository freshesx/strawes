<template>
  <div class="mw-table-filter">
    <div class="mw-table-filter-prefix" v-if="label || icon">
      <mn-icon :name="icon" v-if="icon" :scale="0.8"></mn-icon>
      {{ label }}
    </div>
    <div class="mw-table-filter-body">
      <slot></slot>
    </div>
    <div class="mw-table-filter-suffix" v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-table-filter',
    props: {
      label: String,
      icon: null
    }
  })
</script>

<style lang="scss">
  @import "~vue-human/scss/vars";

  .mw-table-filter {
    display: flex;
    align-items: center;
    background: #eee;
    border-radius: 0.25rem;
    height: 2.25rem;
    padding: 0 1rem;
    margin-bottom: 1rem;
  }

  .mw-table-filter-body {
    flex: 1;
  }

  .mw-table-filter-prefix {
    margin-right: 0.5rem;
    color: #999;
    font-weight: bold;
  }

  .mw-table-filter-suffix {
    margin-left: 0.5rem;
    color: #999;
  }
</style>
