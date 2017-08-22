<template>
  <div class="mw-link-bar">
    <mn-link class="has-none-padding-x"
      v-for="action in expandedActions"
      :key="action.name"
      :title="action.label"
      theme="secondary-link"
      size="sm"
      :icon="action.icon"
      :href="action.href"
      :to="action.to"></mn-link>
    <mn-btn class="has-none-padding-x"
      theme="secondary-link"
      :icon="more"
      size="sm"
      @click.stop.prevent="onMore"
      v-if="actions.length > 3"></mn-btn>
    <!-- Action Sheet -->
    <mn-action-sheet :visible.sync="showActionSheet" v-if="actions.length > 3">
      <mn-card rounded>
        <mn-card-btns>
          <button v-for="action in actions">
            <mn-icon :name="action.icon"></mn-icon>
            {{ action.label }}
          </button>
        </mn-card-btns>
      </mn-card>
    </mn-action-sheet>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'
  import actionSheet from 'vue-human/suites/actionSheet'

  export default new Element({
    name: 'mw-link-bar',
    components: {
      ...actionSheet.map()
    },
    props: {
      actions: Array
    },
    data () {
      return {
        more: require('vue-human-icons/js/android/more-horizontal'),
        showActionSheet: false
      }
    },
    computed: {
      expandedActions () {
        if (!Array.isArray(this.actions)) return []
        if (this.actions.length > 3) return this.actions.slice(0, 2)
        return this.actions
      },
      collapsedActions () {
        if (Array.isArray(this.actions) && this.actions.length > 3) {
          return this.actions.slice(2, this.actions.length)
        }
        return []
      }
    },
    methods: {
      onMore () {
        console.log('nihao')
        this.showActionSheet = true
      }
    }
  })
</script>
