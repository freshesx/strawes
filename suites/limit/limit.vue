<template>
  <div class="mw-limit">
    <select class="mw-limit-select" :value="limit" @change="onLimit">
      <option :value="item" v-for="item in limitOptions">{{ item }} 条</option>
    </select>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'
  import Q from 'vue-human/utils/Query'

  /**
   * 调整表格每页显示多少条的组件
   * @module /suites/table/tableCount
   * @param {Number}  [limit=20]                   - 选择的每页显示多少条
   * @param {Array}   [limitOptions=[20, 50, 100]] - 默认供选择每页显示多少条
   */
  export default new Element({
    name: 'mw-limit',
    props: {
      limit: {
        type: Number,
        default: 20
      },
      limitOptions: {
        type: Array,
        default () {
          return [ 20, 50, 100 ]
        }
      }
    },
    methods: {
      // 修改每页显示多少条
      onLimit (event) {
        const limit = parseInt(event.target.value)
        const queries = Q.merge(Q.parse(this.$route.query), { limit })
        this.$emit('change', event, queries, limit)
        return this.$router.push({ query: queries })
      }
    }
  })
</script>

<style lang="scss">
  .mw-limit {
    display: flex;
    align-items: center;
    height: 2.25rem;
  }

  .mw-limit-select {
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
