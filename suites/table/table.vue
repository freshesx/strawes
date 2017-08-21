<template>
  <div class="mw-table" :class="{ [`is-${size}`]: !!size }">
    <!-- 表格头 -->
    <div class="mw-table-hd" :class="{ 'is-shadow': scrollTop > 1 }">
      <div class="mw-table-hd-contents" :style="{ transform: `translateX(${scrollLeft * -1}px)` }">
        <div class="mw-table-hd-col" v-if="isEnableSelections">
          <mw-table-check :checked="allSelected" @click="onAllSelected"></mw-table-check>
        </div>
        <mw-table-header-column
          :label="column.label"
          :sort="column.sort"
          :highlight="column.highlight"
          :width="column.width"
          :minWidth="column.minWidth"
          @changeSort="onSort(arguments[0], column, arguments[1])"
          @changeHighlight="onHighlight(column, arguments[0])"
          v-for="(column, key) in columns"
          :key="key"
          v-if="!column.hide"></mw-table-header-column>
      </div>
    </div>

    <!-- 表格主体 -->
    <div class="mw-table-bd" style="height: 400px;" @scroll="onScroll">
      <!-- 加载层 -->
      <div class="mw-table-bd-loading" v-if="items === undefined">
        <mn-loading-icon class="has-two-margin-right"></mn-loading-icon>努力加载中
      </div>
      <!-- 表格主要内容 -->
      <div class="mw-table-bd-contents" ref="contents">
        <div class="mw-table-bd-row" v-for="item in items" @click="onClickRow(item, $event)">
          <!-- 多选 -->
          <div class="mw-table-bd-col" v-if="isEnableSelections">
            <mw-table-check :checked="isOneSelected(item)" @click="onOneSelected(item)"></mw-table-check>
          </div>
          <div class="mw-table-bd-col" :class="{ 'is-highlight': column.highlight }" v-for="column in columns" :style="[ calcWidth(column) ]" v-if="!column.hide">
            <div v-if="column.name === '$action'">
              <mw-table-action :actions="column.actions"></mw-table-action>
            </div>
            <!-- 用户定义的列展示方式 -->
            <div v-else-if="$scopedSlots.hasOwnProperty(column.name)">
              <slot :name="column.name" :item="item"></slot>
            </div>
            <!-- 默认展示方式 -->
            <div v-else>{{ item[column.name] }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'
  import isUndefined from 'lodash/isUndefined'
  import tableHeaderColumn from './_tableHeaderColumn'
  import tableCheck from './_tableCheck'
  import tableAction from './_tableAction'

  export default new Element({
    name: 'mw-table',
    components: {
      ...tableHeaderColumn.inject(),
      ...tableCheck.inject(),
      ...tableAction.inject()
    },
    props: {
      /**
       * 内容列表
       * @prop {Array}           items                        - 内容列表，空数组时显示 “无数据”
       * @prop {String|Number}   items[].$key                 - 表示行的唯一标志
       * @prop {Undefined}       items                        - 表示加载状态
       */
      items: Array,

      /**
       * 列配置
       * @prop {Array}           columns                      -
       * @prop {String}          columns[].label              - 显示名称
       * @prop {String}          columns[].name               - 列唯一名称，$action 和 $key 为系统保留
       * @prop {String|Number}   columns[].width              - 列宽度，支持 width 和 flex
       * @prop {String|Number}   columns[].minWidth           - 列最小宽度，支持 width 和 flex
       * @prop {String}          columns[].sort               - 筛选图标 none, sortable, desc, asc, 默认为 undefined
       * @prop {Boolean}         columns[].highlight          - 是否高亮
       * @prop {Array}           columns[].actions            - 事件按钮
       * @prop {*}               columns[].actions[].icon     - 事件按钮的图标
       * @prop {String}          columns[].actions[].name     - 事件按钮的唯一名称
       * @prop {String}          columns[].actions[].title    - 事件按钮的显示名称
       */
      columns: {
        type: Array,
        default () {
          return []
        }
      },

      /**
       * 表格尺寸
       * @prop {Undefined}       size                         - 正常尺寸
       * @prop {String}          size="md"                    - 正常尺寸
       * @prop {String}          size="sm"                    - 较小尺寸
       */
      size: String,

      /**
       * 多选结果
       * 多选结果依赖 items[].$key
       * @prop {Undefined}       selections                   - 关闭多选功能
       * @prop {Array}           selections                   - 多选结果
       */
      selections: Array
    },
    data () {
      return {
        scrollLeft: 0,
        scrollTop: 0
      }
    },
    computed: {
      allSelected () {
        if (!Array.isArray(this.selections) || !Array.isArray(this.items)) {
          return false
        }

        return this.items.every(item => {
          return this.selections.includes(item.$key)
        })
      },
      isEnableSelections () {
        return !isUndefined(this.selections)
      }
    },
    methods: {
      onScroll (event) {
        this.scrollLeft = event.srcElement.scrollLeft
        this.scrollTop = event.srcElement.scrollTop
      },
      calcWidth (column) {
        if (!isUndefined(column.minWidth)) {
          return { flex: `1 0 ${column.minWidth}` }
        }

        if (isUndefined(column.width)) {
          return { width: '120px' }
        }

        if (/^\d+&/.test(column.width)) {
          return { flex: column.width }
        }

        return {
          width: column.width
        }
      },
      onSort (sortName, column, event) {
        this.$emit('changeSort', sortName, column, event)
      },
      onHighlight (column, event) {
        this.$emit('changeHighlight', !column.highlight, column, event)
      },
      onClickRow (item, event) {
        this.$emit('clickRow', item, event)
      },
      /**
       * 触发 全选 / 全不选 事件
       * @method onAllSelected
       */
      onAllSelected () {
        let newSelection = []

        if (!this.allSelected) {
          newSelection = this.items.map(item => item.$key)
        }

        this.$emit('update:selections', newSelection)
      },
      /**
       * 触发 选中 / 取消 事件
       * @method onOneSelected
       * @param  {Object}          item        内容项目
       * @param  {String|Number}   item.$key   内容项目的唯一编号
       */
      onOneSelected (item) {
        // 必须存在 $key
        if (isUndefined(item.$key)) {
          throw new Error('没有在 item内定义 $key')
        }

        const key = item.$key
        const newSelection = [ ...this.selections ]
        const index = newSelection.indexOf(key)

        // 加入或者移除
        if (index > -1) {
          newSelection.splice(index, 1)
        } else {
          newSelection.push(key)
        }

        this.$emit('update:selections', newSelection, key)
      },
      isOneSelected (item) {
        // 如果没有开启多选
        if (isUndefined(this.selections)) {
          return false
        }
        // 如果开启多选，但缺少 $key 字段
        if (isUndefined(item.$key)) {
          throw new Error('如果启动多选功能的话，必须在对象中新增 $key 字段。')
        }
        // 检查是否包含
        return this.selections.includes(item.$key)
      }
    }
  })
</script>

<style lang="scss">
  $highlight-bg: rgba(#007aff, 0.15);

  .mw-table {
  }

  .mw-table-hd {
    position: relative;
    width: 100%;
    height: 3.5rem;
    background: #fff;
    z-index: 100;
    overflow: hidden;
    transition-duration: 500ms;

    &.is-shadow {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .mw-table-bd-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    z-index: 100;
    font-size: 1.25rem;
  }

  .mw-table-hd-contents {
    position: absolute;
    display: flex;
    flex-wrap: nowrap;
    min-width: 100%;
  }

  .mw-table-hd-col {
    padding: 1rem 1rem;
    font-weight: 500;
    transition-duration: 500ms;
    flex-shrink: 0;

    &.is-highlight {
      background: $highlight-bg !important;
    }
  }

  .mw-table-loading {
    background: #fff;
    text-align: center;
    margin: 0 auto;
    padding: 6rem 0;
    border-radius: 0.25rem;
    color: #999;
  }

  .mw-table-bd {
    background: #fff;
    overflow: hidden;
    position: relative;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
  }

  .mw-table-bd-contents {
    position: absolute;
    min-width: 100%;
  }

  .mw-table-bd-row {
    display: flex;
    transition-duration: 500ms;

    &:nth-child(odd) {
      .mw-table-bd-col {
        background: rgba(0, 0, 0, 0.03);
      }
    }
  }

  .mw-table-bd-col {
    display: flex;
    padding: 0.75rem 1rem;
    align-items: center;
    transition-duration: 500ms;
    flex-shrink: 0;

    &.is-highlight {
      background: $highlight-bg !important;
    }
  }

  .mw-table-bd-actions {
    transition-duration: 500ms;
  }

  .mw-table-bd-btn {
    padding-left: 0 !important;
    padding-right: 0 !important;

    & + & {
      margin-left: 0.5rem;
    }
  }

  .mw-table-tools {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .mw-table.is-sm {
    .mw-table-bd-col {
      padding: 0.25rem 1rem;
    }
  }
</style>
