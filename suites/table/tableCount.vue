<template>
  <div class="mw-table-count">
    <select class="mw-table-count-select" :value="count" @change="onCount">
      <option :value="item" v-for="item in countOptions">{{ item }} 条</option>
    </select>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  /**
   * 调整表格每页显示多少条的组件
   * @module /suites/table/tableCount
   * @param {Number}  [count=20]                   - 选择的每页显示多少条
   * @param {Array}   [countOptions=[20, 50, 100]] - 默认供选择每页显示多少条
   */
  export default new Element({
    name: 'mw-table-count',
    props: {
      count: {
        type: Number,
        default: 20
      },
      countOptions: {
        type: Array,
        default () {
          return [ 20, 50, 100 ]
        }
      }
    },
    methods: {
      // 修改每页显示多少条
      onCount (event) {
        this.emitChange(parseInt(event.target.value), event)
      },
      /**
       * 触发修改每页显示多少条
       * @event changeCount
       * @prop  {Number}   count     - 新的每页显示多少条
       * @prop  {Event}    event     - DOM Event
       */
      emitChange (count, event) {
        this.$emit('changeCount', count, event)
      }
    }
  })
</script>

<style lang="scss">
  .mw-table-count {
    display: flex;
    align-items: center;
    height: 2.25rem;
  }

  .mw-table-count-select {
    font-size: 1rem;
    background: transparent;
    height: 2.25rem;
    border-radius: 0.25rem;
    background: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    vertical-align: middle;
    transition-duration: 500ms;
    background: rgba(0, 0, 0, 0.075);
  }
</style>
