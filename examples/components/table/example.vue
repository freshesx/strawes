<template>
  <mn-scroller>
    <mw-container>
      <mn-section>
        <mw-crumb></mw-crumb>
      </mn-section>

      <mn-section>
        <mw-table-tool>
          <mn-columns>
            <mn-column desktop="4">
              <mw-table-filter label="影片名称">
                <mn-input v-model="models.title" placeholder="搜索名称"></mn-input>
              </mw-table-filter>
            </mn-column>
            <mn-column desktop="8">
              <mw-table-filter label="标签">
                <div>
                  <mn-tag :key="i" v-for="i in 2" :name="i === 2 ? 'black-lightest' : 'gray-darkest'">标签 {{ i }}</mn-tag>
                </div>
              </mw-table-filter>
            </mn-column>
          </mn-columns>
          <template slot="action">
            <mn-btn theme="secondary" size="sm">查询</mn-btn>
          </template>
        </mw-table-tool>

        <mw-table-group>
          <mw-table :items="calcTableItems(tableItems)"
            :columns="tableColumns"
            :selections.sync="selections"
            :size="tableSize"
            @changeSort="onSort">
            <template scope="scope" slot="cover">
              <img :src="scope.item.cover" alt="scope.cover.title" height="80" style="display: block;">
            </template>
            <template scope="scope" slot="tags">
              <mn-tag bg="#ddd" v-for="(tag, key) in scope.item.tags" :key="key">{{ tag }}</mn-tag>
            </template>
            <template scope="scope" slot="action">
              <mn-link class="has-none-padding-x" title="编辑" theme="secondary-link" size="sm" :icon="icons.edit"></mn-link>
              <mn-link class="has-none-padding-x" title="删除" theme="secondary-link" size="sm" :icon="icons.remove"></mn-link>
            </template>
          </mw-table>

          <template slot="action">
            <mn-btn theme="primary" size="sm">新建影片</mn-btn>
            <mn-btn theme="secondary-link" size="sm">导出 EXCEL</mn-btn>
            <mn-btn theme="secondary-link" size="sm">批量导入</mn-btn>
          </template>

          <template slot="view">
            <mw-table-count :count="count" @changeCount="onCount"></mw-table-count>
            <mw-table-column :columns="tableColumns" @changeHide="onHide"></mw-table-column>
            <mw-table-view :size.sync="tableSize"></mw-table-view>
          </template>

          <template slot="paginate">
            <mw-table-paginate :currentPage="currentPage" :totalPages="totalPages" @changePage="onPage"></mw-table-paginate>
          </template>
        </mw-table-group>
      </mn-section>
    </mw-container>
  </mn-scroller>
</template>

<script>
  import table from '../../../suites/table'
  import tag from 'vue-human/suites/tag'
  import input from 'vue-human/suites/input'
  import tableColumns from './tableColumns'
  import axios from 'axios'
  import isUndefined from 'lodash/isUndefined'
  import container from '../../../suites/container'
  import crumb from '../../../suites/crumb'

  export default {
    components: {
      ...table.map(),
      ...tag.map(),
      ...input.map(),
      ...container.map(),
      ...crumb.map()
    },
    data () {
      return {
        tableColumns,
        tableItems: undefined,
        tableSize: 'sm',
        selections: [],
        start: 0,
        total: 0,
        count: 20,
        icons: {
          edit: require('vue-human-icons/js/ios/copy-outline'),
          remove: require('vue-human-icons/js/ios/trash-outline')
        },
        models: {
          title: undefined
        }
      }
    },
    computed: {
      currentPage () {
        return Math.ceil(this.start / this.count) + 1
      },
      totalPages () {
        return Math.ceil(this.total / this.count)
      }
    },
    methods: {
      async fetchMovie (start, count) {
        console.log('start', start, count)
        this.tableItems = undefined
        const response = await axios.get('/v2/movie/in_theaters', {
          params: { start, count }
        })
        this.tableItems = response.data.subjects
        this.total = response.data.total
        this.start = response.data.start
        this.count = response.data.count
      },
      // 重新计算 tableItems，使其符合 tableColumn 列的要求
      calcTableItems (items) {
        if (isUndefined(items)) return undefined
        // @reference item => ({}) 是箭头函数特有的快捷方式
        return items.map(item => ({
          $key: item.id,
          cover: item.images.small,
          title: item.title,
          director: item.directors.map(item => item.name).join(', '),
          actor: item.casts.map(item => item.name).join(', '),
          rating: item.rating.average,
          tags: item.genres,
          year: item.year
        }))
      },
      onSort (sortName, column) {
        this.$set(column, 'sort', sortName)
      },
      onHide (hide, column) {
        this.$set(column, 'hide', hide)
      },
      onCount (count) {
        this.fetchMovie(0, count)
      },
      onPage (currentPage) {
        // start 为 查询的下标数
        // count 为 查询多少条结果
        // currentPage 为当前页数，所以 currentPage 要转化成相应的 start
        this.fetchMovie((currentPage - 1) * this.count, this.count)
      }
    },
    created () {
      this.fetchMovie(this.start, this.count)
    }
  }
</script>
