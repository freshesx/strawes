<template>
  <div class="mw-frame">
    <div class="mw-frame-side">
      <div class="mw-frame-side-inner">
        <div class="mw-frame-brand">
          <slot name="brand"></slot>
        </div>
        <div class="mw-frame-navigation">
          <slot name="navigation"></slot>
        </div>
        <div class="mw-frame-information">
          <slot name="information"></slot>
        </div>
      </div>
    </div>
    <div class="mw-frame-contents">
      <slot>
        <router-view></router-view>
      </slot>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-frame'
  })
</script>

<style lang="scss">
  .mw-frame {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
  }

  .mw-frame-side {
    width: 220px;
    flex-shrink: 0;
  }

  .mw-frame-side-inner {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    box-shadow: 4px 0 32px rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .mw-frame-brand {
    // @todo add to brand
    // padding: 1rem;
    // font-size: 1.25rem;
    flex-shrink: 0;
  }

  .mw-frame-navigation {
    flex: 1;
    position: relative;
  }

  .mw-frame-information {
    flex-shrink: 0;
  }

  .mw-frame-contents {
    position: relative;
    flex: 1;
  }
</style>
