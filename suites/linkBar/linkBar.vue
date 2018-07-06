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
             :to="action.to"
             @click="onAction(arguments[0], arguments[1], action)"></mn-link>
    <mn-btn class="has-none-padding-x"
            theme="secondary-link"
            :icon="more"
            size="sm"
            @click.stop.prevent="onMore"
            v-if="actions.length > max"></mn-btn>
    <!-- Action Sheet -->
    <mn-action-sheet :visible.sync="showActionSheet"
                     v-if="actions.length > 3">
      <mn-card rounded>
        <mn-card-btns>
          <button v-for="action in actions"
                  @click="onAction(arguments[0], arguments[1], action)">
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
      actions: Array,
      max: {
        type: Number,
        default: 3
      }
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
        if (this.actions.length > this.max) return this.actions.slice(0, this.max - 1)
        return this.actions
      },
    },
    methods: {
      onMore () {
        this.showActionSheet = true
      },
      onAction (event, button, action) {
        this.$emit('actions', event, button, action)
        this.$emit(`action:${action.name}`, event, button, action)
      }
    }
  })
</script>
