<template>
  <div class="mw-table-paginate">
    <select class="mw-table-paginate-select" :value="currentPage" @change="onPage">
      <option :value="item" v-for="item in totalPages">第 {{ item }} 页</option>
    </select>
    <div class="mw-table-paginate-btn" @click="onPrev">
      <mn-icon :name="icons.prev" :scale="0.8"></mn-icon>
      上一页
    </div>
    <div class="mw-table-paginate-btn" @click="onNext">
      下一页
      <mn-icon :name="icons.next" :scale="0.8"></mn-icon>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  /**
   * 表格分页功能
   * @module suites/table/tablePaginate
   * @example
   * <mw-table-paginate :total="50" :limit="20" :offset="0" @change="onPage"></mw-table-paginate>
   *
   * @param {Number}    total      - 总条数
   * @param {Number}    limit       - 每页显示多少行
   * @param {Number}    [offset]   - 起始数
   */
  export default new Element({
    name: 'mw-table-paginate',
    props: {
      total: {
        type: Number,
        require: true
      },
      limit: {
        type: Number,
        require: true
      },
      offset: Number
    },
    computed: {
      totalPages () {
        return Math.ceil(this.total / this.limit)
      },
      currentPage () {
        return Math.ceil(this.offset / this.limit) + 1
      }
    },
    data () {
      return {
        icons: {
          prev: require('vue-human-icons/js/android/arrow-dropleft'),
          next: require('vue-human-icons/js/android/arrow-dropright')
        }
      }
    },
    methods: {
      // 上一页
      onPrev (event) {
        if (this.currentPage > 1) {
          this.emitChange(this.offset - this.limit, event)
        }
      },
      // 下一页
      onNext (event) {
        if (this.currentPage < this.totalPages) {
          this.emitChange(this.offset + this.limit, event)
        }
      },
      // 指定页码
      onPage (event) {
        const newPage = parseInt(event.target.value)
        const newOffset = (newPage - 1) * this.count
        this.emitChange(newOffset, event)
      },
      /**
       * 触发起始点和条数修改的事件
       * @event changePage
       * @prop  {Number}   currentPage   - 当前页码
       * @prop  {Event}    event         - DOM Event 对象
       */
      emitChange (offset, event) {
        this.$emit('change', offset, event)
      }
    }
  })
</script>

<style lang="scss">
  .mw-table-paginate {
    display: flex;
    align-items: center;
    height: 2.25rem;
  }

  .mw-table-paginate-select {
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

  .mw-table-paginate-btn {
    height: 2.25rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    transition-duration: 500ms;
    border-radius: 0.25rem;
    margin-left: 0.5rem;
    background: rgba(0, 0, 0, 0.075);

    &.is-active {
      background: #ccc;
    }
  }
</style>
