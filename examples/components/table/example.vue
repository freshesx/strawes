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
                <mn-input v-model="searches.title" placeholder="搜索名称"></mn-input>
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
            <mn-btn theme="secondary" size="sm" @click="onQuery">查询</mn-btn>
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
            <mw-table-limit :limit="queries.limit" :limitOptions="[10, 20, 50]" @update:limit="onLimit"></mw-table-limit>
          </template>

          <template slot="paginate">
            <mw-table-paginate
              :total="total"
              :limit="queries.limit"
              :offset="queries.offset"
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
  import Q from 'vue-human/utils/Query'
  import { listMovies } from '../../axios/movies'

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
        // 总条数
        total: 0,
        // search 筛选
        searches: {
          title: undefined
        },
        // Query 请求字段
        queries: {
          offset: 0,
          limit: 10
        }
      }
    },
    methods: {
      async listMovies () {
        this.tableItems = undefined
        const response = await listMovies(this.queries)
        this.tableItems = response.data.subjects
        this.total = response.data.total
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
      onLimit (limit) {
        this.queries.offset = 0
        this.queries.limit = limit
        this.searches = Q.reset(this.searches, Q.parse(this.$route.query))
        this.$router.push({ query: this.queries })
        this.listMovies()
      },
      // 修改页码
      onPage (offset) {
        this.queries.offset = offset
        this.searches = Q.reset(this.searches, Q.parse(this.$route.query))
        this.$router.push({ query: this.queries })
        this.listMovies()
      },
      onQuery () {
        this.queries.offset = 0
        this.queries = Q.merge(this.queries, this.searches)
        this.$router.push({ query: this.queries })
        this.listMovies()
      }
    },
    created () {
      this.queries = Q.merge(this.queries, Q.parse(this.$route.query))
      this.searches = Q.reset(this.searches, Q.parse(this.$route.query))
      this.listMovies()
    }
  }
</script>
