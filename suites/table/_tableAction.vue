<template>
  <div class="mw-table-action">
    <mn-link class="has-none-padding-x"
      v-for="action in expandedActions"
      :key="action.name"
      :title="action.label"
      theme="secondary-link"
      size="sm"
      :icon="action.icon"></mn-link>
    <mn-btn class="has-none-padding-x"
      theme="secondary-link"
      :icon="more"
      size="sm"></mn-btn>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-table-action',
    props: {
      actions: Array
    },
    data () {
      return {
        more: require('vue-human-icons/js/ios/more')
      }
    },
    computed: {
      expandedActions () {
        if (!Array.isArray(this.actions)) return []
        if (this.actions.length > 3) return this.actions.slice(0, 2)
        return this.actions
      }
    }
  })
</script>
