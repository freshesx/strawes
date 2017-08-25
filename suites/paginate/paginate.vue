<template>
  <div class="mw-paginate">
    <div class="mw-paginate-btns">
      <a class="mw-paginate-link"
        :href="resolveLink(currentPage - 1)"
        @click="onClick($event, currentPage - 1)" v-if="currentPage > 1">上一页</a>
      <span class="mw-paginate-link" v-if="showPageSets[0] > 1">
        ...
      </span>
      <a class="mw-paginate-link"
        :class="{ 'is-active': currentPage === pageNumber }"
        :href="resolveLink(pageNumber)"
        :key="pageNumber"
        @click="onClick($event, pageNumber)"
        v-for="pageNumber in showPageSets">{{ pageNumber }}</a>
      <span class="mw-paginate-link" v-if="showPageSets[showPageSets.length - 1] < totalPages">
        ...
      </span>
      <a class="mw-paginate-link"
        :href="resolveLink(currentPage + 1)"
        @click="onClick($event, currentPage + 1)" v-if="currentPage < totalPages">下一页</a>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'
  import Q from 'vue-human/utils/Query'
  import range from 'lodash/range'

  /**
   * 表格分页功能
   * @module suites/table/tablePaginate
   * @example
   * <mw-paginate :total="50" :limit="20" :offset="0" :gutters="2" @click="onPaginate"></mw-paginate>
   *
   * @param {Number}    total          - 总条数
   * @param {Number}    limit          - 每页显示多少行
   * @param {Number}    offset         - 起始数
   * @param {Number}    [gutters=2]    - 前后展示多少位的页码
   */
  export default new Element({
    name: 'mw-paginate',
    props: {
      total: {
        type: Number,
        require: true
      },
      limit: {
        type: Number,
        require: true
      },
      offset: {
        type: Number,
        require: true
      },
      gutters: {
        type: Number,
        default: 2
      }
    },
    computed: {
      totalPages () {
        return Math.ceil(this.total / this.limit)
      },
      currentPage () {
        return Math.ceil(this.offset / this.limit) + 1
      },
      showPageSets () {
        // 比如说前 3，后 3，则小于等于 7 时全部显示
        if (this.totalPages <= this.gutters * 2 + 1) {
          return range(1, this.totalPages + 1)
        }

        // 默认情况下的前后数
        let beforeCounts = this.gutters
        let afterCounts = this.gutters

        // 如果前不足
        if (this.currentPage - 1 < 3) {
          beforeCounts = this.currentPage - 1
          afterCounts = this.gutters * 2 - beforeCounts
        }

        // 如果后不足
        if (this.totalPages - this.currentPage < 3) {
          afterCounts = this.totalPages - this.currentPage
          beforeCounts = this.gutters * 2 - afterCounts
        }

        // 计算结果，第二位参数最后加 1 是因为 range 的用法
        return range(this.currentPage - beforeCounts, this.currentPage + afterCounts + 1)
      }
    },
    methods: {
      resolveQueries (pageNumber) {
        const offset = (pageNumber - 1) * this.limit
        return Q.merge(Q.parse(this.$route.query), { offset })
      },
      resolveLink (pageNumber) {
        return this.$router.resolve({ query: this.resolveQueries(pageNumber) }).href
      },
      onClick (event, pageNumber) {
        const queries = this.resolveQueries(pageNumber)
        this.$emit('click', event, queries)
      }
    }
  })
</script>

<style lang="scss">
  @import "~vue-human/scss/vars.scss";

  .mw-paginate {

  }

  .mw-paginate-btns {
    display: flex;
  }

  .mw-paginate-link {
    $gutter: 0.25rem;

    display: block;
    height: 1.5rem + $gutter * 2;
    min-width: 1.5rem + $gutter * 2;
    padding: $gutter;
    background: #eee;
    color: #999;
    border-radius: 0.25rem;
    text-align: center;
    text-decoration: none;
    margin-left: 0.5rem;

    &.is-active {
      background: $green;
      color: #fff;
    }
  }
</style>
