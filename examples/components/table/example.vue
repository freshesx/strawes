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
              <mw-table-filter label="评论数">
                <mn-select v-model="searches.collect" :options="collectOptions"></mn-select>
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
            <mw-paginate
              :total="total"
              :limit="queries.limit"
              :offset="queries.offset"></mw-paginate>
          </template>
        </mw-table-group>
      </mn-section>
    </mw-container>
  </mn-scroller>
</template>

<script>
  import input from 'vue-human/suites/input'
  import select from 'vue-human/suites/select'
  import tag from 'vue-human/suites/tag'
  import tableColumns from './tableColumns'
  import calcTableItem from './calcTableItem'
  import Q from 'vue-human/utils/Query'
  import { listMovies } from '../../axios/movies'

  export default {
    components: {
      ...input.map(),
      ...select.map(),
      ...tag.map()
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
          title: undefined,
          collect: undefined
        },
        // Query 请求字段
        // queries 是传递给 $router.push 的数据
        // searches 是维护输入表单的数据，两者非同步关系，需手动查询
        queries: {
          offset: 0,
          limit: 10
        },
        // 评论数的筛选条件
        collectOptions: [
          { label: '未排序', value: undefined },
          { label: '从多至少', value: 'desc' },
          { label: '从少至多', value: 'asc' }
        ]
      }
    },
    methods: {
      // 设置 undefined，显示为加载状态
      // 请求服务器数据
      // 合并表格数据
      // 合并总条数
      async listMovies () {
        // 设置为加载状态
        this.tableItems = undefined

        // 合并 url query 至 data
        this.queries = Q.merge(this.queries, Q.parse(this.$route.query))

        // 请求数据
        const response = await listMovies(this.queries)
        this.tableItems = response.data.subjects
        this.total = response.data.total
      },
      // 计算 tableItems，使其符合 tableColumn 列的要求
      calcTableItems (items) {
        if (Array.isArray(items)) return items.map(calcTableItem)
      },
      onLimit (limit) {
        const queries = Q.merge(Q.parse(this.$route.query), { limit })
        this.$router.push({ query: queries })
      }
    },
    watch: {
      '$route.query' () {
        this.listMovies()
      }
    },
    // 初始化数据
    created () {
      this.listMovies()
    }
  }
</script>
