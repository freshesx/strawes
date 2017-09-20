<template>
  <div class="mw-frame">
    <div
      :class="['mw-frame-side', {'is-active': showSidebar}]">
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
      <slot name="contents"></slot>
    </div>

    <mn-assistive-bar slot="footer" :show.sync="showSidebar" v-show="!showSidebar"></mn-assistive-bar>

    <div
      class="mw-frame-shade"
      @click="clickShade"
      v-if="showSidebar">
        <div class="mw-frame-shade-label">
          <p>点击此处关闭</p>
          <mn-icon :name="icons.hand"></mn-icon>
        </div>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'
  import assistiveBar from 'vue-human/suites/assistiveBar'

  export default new Element({
    name: 'mw-frame',
    components: {
      ...assistiveBar.map()
    },
    data () {
      return {
        showSidebar: false,
        icons: {
          hand: require('./handIcon')
        }
      }
    },
    methods: {
      clickShade () {
        this.showSidebar = false
      }
    }
  })
</script>

<style lang="scss">
  @import "~vue-human/scss/vars";
  @import "~vue-human/scss/mixins/media";

  .mw-frame {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;

    .mn-assistive-bar {
      position: absolute;
      z-index: 998;
    }

    &-shade {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #000;
      opacity: .6;
      z-index: 998;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 0.875rem;
      color: #fff;

      &-label {
        width: 35%;
        text-align: center;
      }
    }
  }

  .mw-frame-side {
    width: 220px;
    flex-shrink: 0;

    @include max-screen(tablet) {
      position: absolute;
      z-index: 999;
      width: 65%;
      height: 100%;
      transform: translateX(-110%);
      transition-duration: 300ms;
      box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
    }

    &.is-active {
      transform: translateX(0);
    }
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
