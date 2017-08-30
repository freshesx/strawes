<template>
  <form :action="queryUrl">
    <mw-table-tool>
      <mn-columns>
        <mn-column desktop="4">
          <mw-table-filter label="影片名称">
            <mn-input v-model="models.title" placeholder="搜索名称"></mn-input>
          </mw-table-filter>
        </mn-column>
        <mn-column desktop="8">
          <mw-table-filter label="评论数">
            <mn-select v-model="models.collect" :options="collectOptions"></mn-select>
          </mw-table-filter>
        </mn-column>
      </mn-columns>
      <template slot="action">
        <mn-link :href="queryUrl" theme="secondary" size="sm">查询</mn-link>
        <mn-link :href="resetUrl" theme="secondary-link" size="sm">重置</mn-link>
      </template>
    </mw-table-tool>
  </form>
</template>

<script>
  import input from 'vue-human/suites/input'
  import select from 'vue-human/suites/select'
  import Q from 'vue-human/utils/Query'

  const defaultModels = {
    title: undefined,
    collect: undefined
  }

  export default {
    components: {
      ...input.map(),
      ...select.map()
    },
    data () {
      return {
        // search 筛选
        models: Q.merge({}, defaultModels),
        // 评论数的筛选条件
        collectOptions: [
          { label: '未排序', value: undefined },
          { label: '从多至少', value: 'desc' },
          { label: '从少至多', value: 'asc' }
        ]
      }
    },
    computed: {
      queryUrl () {
        const queries = Q.merge(Q.parse(this.$route.query), this.models)
        queries.page = 1
        return this.$router.resolve({ query: queries }).href
      },
      resetUrl () {
        const queries = Q.merge(Q.parse(this.$route.query), defaultModels)
        queries.page = 1
        return this.$router.resolve({ query: queries }).href
      }
    },
    methods: {
      updateModels () {
        this.models = Q.merge(defaultModels, Q.parse(this.$route.query))
      }
    },
    watch: {
      '$route.query' () {
        this.updateModels()
      }
    },
    created () {
      this.updateModels()
    }
  }
</script>
