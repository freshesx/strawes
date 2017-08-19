<template>
  <div class="mw-table-group">
    <div class="mw-table-group-prefix" v-if="$slots.action || $slots.view">
      <div class="mw-table-group-action">
        <slot name="action"></slot>
      </div>
      <div class="mw-table-group-view">
        <slot name="view"></slot>
      </div>
    </div>
    <div class="mw-table-group-body">
      <slot></slot>
    </div>
    <div class="mw-table-group-suffix" v-if="$slots.info || $slots.paginate">
      <div class="mw-table-group-info">
        <slot name="info"></slot>
      </div>
      <div class="mw-table-group-paginate">
        <slot name="paginate"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  /**
   * 表格组
   * @module /suites/table/tableGroup
   *
   * @slot default                       - 表格插槽，居中显示
   * @slot action                        - 操作功能区插槽，目前位于左上角
   * @slot view                          - 调整表格视图相关的功能插槽，目前位于右上角
   * @slot info                          - 信息插槽，目前位于左下角，暂时不使用
   * @slot paginate                      - 页码插槽，目前位于右下角
   */
  export default new Element({
    name: 'mw-table-group'
  })
</script>

<style lang="scss">
  @import "~vue-human/scss/mixins/media";

  .mw-table-group {
    border-radius: 0.25rem;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .mw-table-group-prefix,
  .mw-table-group-suffix {
    background: #fff;
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);

    @include min-screen(tablet) {
      display: flex;
      align-items: center;
    }
  }

  .mw-table-group-suffix {
    border: none;
    border-top: solid 1px rgba(0, 0, 0, 0.05);
  }

  .mw-table-group-action {
    flex: 1;
    display: flex;
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);
    padding: 0.5rem 1rem;
    align-items: center;

    @include min-screen(tablet) {
      border: none;
    }
  }

  .mw-table-group-view {
    display: flex;
    padding: 0.5rem 1rem;
    align-items: center;

    > div {
      margin-right: 0.5rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .mw-table-group-body {

  }

  .mw-table-group-info {
    flex: 1;
  }

  .mw-table-group-paginate {
    padding: 0.5rem 1rem;
    align-items: center;
  }
</style>
