<template>
  <div class="mw-paginate">
    <div class="mw-paginate-btns">
      <span class="mw-paginate-link" v-if="!hideTotalPages">
        共 {{ totalPages }} 页
      </span>
      <a class="mw-paginate-link"
        :href="buildUrl(currentPage - 1)"
        @click="onClick($event, currentPage - 1)" v-if="currentPage > 1">上一页</a>
      <span class="mw-paginate-link" v-if="showPageSets[0] > 1">
        ...
      </span>
      <a class="mw-paginate-link"
        :class="{ 'is-active': currentPage === pageNumber }"
        :href="buildUrl(pageNumber)"
        :key="pageNumber"
        @click="onClick($event, pageNumber)"
        v-for="pageNumber in showPageSets">{{ pageNumber }}</a>
      <span class="mw-paginate-link" v-if="showPageSets[showPageSets.length - 1] < totalPages">
        ...
      </span>
      <a class="mw-paginate-link"
        :href="buildUrl(currentPage + 1)"
        @click="onClick($event, currentPage + 1)" v-if="currentPage < totalPages">下一页</a>
      <form :action="buildUrl(jumpPageNumber)" @submit="onSubmit($event, jumpPageNumber)" v-if="totalPages !== 0">
        <input type="text" class="mw-paginate-control" placeholder="跳转" v-model="jumpPageNumber">
      </form>
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
   * <mw-paginate
   *   :totalPages="2"
   *   :currentPage="1"
   *   :gutters="2"></mw-paginate>
   *
   * @param {Number}    totalPages     - 总页数
   * @param {Number}    currentPage    - 当前页码
   * @param {Number}    [gutters=2]    - 前后展示多少位的页码
   * @param {Boolean}   hideTotalPages - 隐藏总页数
   */
  export default new Element({
    name: 'mw-paginate',
    props: {
      totalPages: {
        type: Number,
        require: true
      },
      currentPage: {
        type: Number,
        require: true
      },
      gutters: {
        type: Number,
        default: 2
      },
      hideTotalPages: Boolean
    },
    data () {
      return {
        jumpPageNumber: undefined
      }
    },
    computed: {
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
        return range(
          this.currentPage - beforeCounts,
          this.currentPage + afterCounts + 1
        )
      }
    },
    methods: {
      resolve (pageNumber) {
        return Q.merge(Q.parse(this.$route.query), { page: pageNumber })
      },
      buildUrl (pageNumber) {
        return this.$router.resolve({ query: this.resolve(pageNumber) }).href
      },
      onClick (event, pageNumber) {
        const queries = this.resolve(pageNumber)
        this.$emit('click', event, queries)
      },
      onSubmit (event, jumpPageNumber) {
        if (!Number.isInteger(parseInt(jumpPageNumber)) ||
            jumpPageNumber > this.totalPages ||
            jumpPageNumber < 1) {
          event.preventDefault()
        }
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

  .mw-paginate-control {
    $gutter: 0.25rem;

    display: block;
    border: none;
    background: #eee;
    margin-left: 0.5rem;
    border-radius: 0.25rem;
    width: 3rem;
    height: 1.5rem + $gutter * 2;
    padding: $gutter $gutter * 2;
    line-height: 1.5;
    outline: none;
    text-align: right;
  }
</style>
