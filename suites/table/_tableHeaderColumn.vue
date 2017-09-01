<template>
  <div class="mw-table-hd-col" :class="{ 'is-highlight': highlight }" :style="[ computedWidth ]">
    <div class="mw-table-sort-bar">
      <div class="mw-table-sort-bar-label"
        :class="{
          'has-left-text': align === 'left',
          'has-center-text': align === 'center',
          'has-right-text': align === 'right'
        }"
        @click.prevent.stop="onHighlight">
        {{ label }}
      </div>
      <div class="mw-table-sort-bar-action" v-if="sort !== 'none'">
        <div class="mw-table-sort-bar-dropup"
          :class="{ 'is-active': sort === 'asc' }"
          @click.prevent.stop="onSort($event, 'asc')"></div>
        <div class="mw-table-sort-bar-dropdown"
          :class="{ 'is-active': sort === 'desc' }"
          @click.prevent.stop="onSort($event, 'desc')"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'
  import iconElement from 'vue-human/suites/icon/icon'
  import isUndefined from 'lodash/isUndefined'

  export default new Element({
    name: 'mw-table-header-column',
    components: {
      ...iconElement.inject()
    },
    props: {
      label: String,
      sort: {
        type: String,
        default: 'none',
        validator (val) {
          return ['none', 'sortable', 'asc', 'desc'].includes(val)
        }
      },
      highlight: Boolean,
      width: [ String, Number ],
      minWidth: [ String ],
      align: String
    },
    data () {
      return {
        dropup: require('vue-human-icons/js/android/arrow-dropup'),
        dropdown: require('vue-human-icons/js/android/arrow-dropdown')
      }
    },
    computed: {
      computedWidth () {
        if (!isUndefined(this.minWidth)) {
          return { flex: `1 0 ${this.minWidth}` }
        }

        if (isUndefined(this.width)) {
          return { width: '120px' }
        }

        if (/^\d+&/.test(this.width)) {
          return { flex: this.width }
        }

        return {
          width: this.width
        }
      }
    },
    methods: {
      onSort (event, value) {
        value = this.sort === value ? 'sortable' : value
        this.$emit('changeSort', value, event)
      },
      onHighlight (event) {
        this.$emit('changeHighlight', event)
      }
    }
  })
</script>

<style lang="scss">
  @import "~vue-human/scss/mixins/arrow";

  .mw-table-sort-bar {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }

  .mw-table-sort-bar-action {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }

  .mw-table-sort-bar-label {
    flex: 1;
    cursor: pointer;
  }

  .mw-table-sort-bar-dropup,
  .mw-table-sort-bar-dropdown {
    @include make-arrow();
    width: 6px;
    height: 6px;
    transform: rotate(-45deg);
    cursor: pointer;

    &.is-active {
      border-color: #666;
    }
  }

  .mw-table-sort-bar-dropdown {
    transform: rotate(135deg);
  }
</style>
