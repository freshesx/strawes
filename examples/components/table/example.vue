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
          <mw-table
            :items="calcTableItems(tableItems)"
            :columns="tableColumns"
            :selections.sync="selections"
            @changeSort="onSort">
            <template scope="scope" slot="cover">
              <img :src="scope.item.cover" alt="scope.cover.title" height="80" style="display: block;">
            </template>
            <template scope="scope" slot="tags">
              <mn-tag bg="#ddd" v-for="(tag, key) in scope.item.tags" :key="key">{{ tag }}</mn-tag>
            </template>
            <template scope="scope" slot="actions">
              <mw-link-bar :actions="scope.item.actions"></mw-link-bar>
            </template>
          </mw-table>

          <template slot="action">
            <mn-btn theme="primary" size="sm">新建影片</mn-btn>
            <mn-btn theme="secondary-link" size="sm">导出 EXCEL</mn-btn>
            <mn-btn theme="secondary-link" size="sm">批量导入</mn-btn>
          </template>

          <template slot="view">
            <mw-table-count :count="count" @changeCount="onCount"></mw-table-count>
          </template>

          <template slot="paginate">
            <mw-table-paginate
              :total="total"
              :rows="count"
              :offset="start"
              @change="onPage"></mw-table-paginate>
          </template>
        </mw-table-group>
      </mn-section>
    </mw-container>
  </mn-scroller>
</template>

<script>
  import tag from 'vue-human/suites/tag'
  import input from 'vue-human/suites/input'
  import tableColumns from './tableColumns'
  import calcTableItem from './calcTableItem'
  import axios from 'axios'

  export default {
    components: {
      ...tag.map(),
      ...input.map()
    },
    data () {
      return {
        // 列
        tableColumns,
        // 数据
        tableItems: undefined,
        // 多选存储
        selections: [],
        // 页码
        start: 0,
        total: 0,
        count: 20,
        // 筛选字段
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
        if (Array.isArray(items)) return items.map(calcTableItem)
      },
      // 监听筛选条件的修改
      onSort (sortName, column) {
        this.$set(column, 'sort', sortName)
      },
      // 修改每页显示多少条
      onCount (count) {
        this.fetchMovie(0, count)
      },
      // 修改页码
      onPage (offset) {
        this.fetchMovie(offset, this.count)
      }
    },
    created () {
      this.fetchMovie(this.start, this.count)
    }
  }
</script>
