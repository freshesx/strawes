<template>
  <div class="mw-table-tool">
    <slot></slot>
    <div class="mw-table-tool-box">
      <div class="mw-table-tool-action">
        <slot name="action"></slot>
      </div>
      <div class="mw-table-tool-operate">
        <!-- 预留插槽，未启用 -->
        <!-- <slot name="operate"></slot> -->
      </div>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  /**
   * 表格工具栏
   * @module /suites/table/tableTool
   *
   * @slot default               - 工具栏主体插槽
   * @slot action                - 工具栏操作区插槽
   */
  export default new Element({
    name: 'mw-table-tool'
  })
</script>

<style lang="scss">
  .mw-table-tool {
    background: #fff;
    padding: 1rem;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    margin-bottom: 1rem;
  }

  .mw-table-tool-box {
    display: flex;
  }

  .mw-table-tool-action {
    flex: 1;
  }

  .mw-table-tool-operate {

  }
</style>
