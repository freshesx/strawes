<template>
  <div class="mw-frame">
    <div class="mw-frame-side" :class="{'is-active': showSidebar}">
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

    <div class="mw-frame-shade" @click="clickShade" v-if="showSidebar">
      <div class="mw-frame-shade-holder"></div>
      <div class="mw-frame-shade-icon">
        <mn-icon :name="icons.close"></mn-icon>
      </div>
    </div>

    <div class="mw-frame-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-frame',
    props: {
      showSidebar: Boolean
    },
    watch: {
      $route () {
        if (this.showSidebar) this.$emit('update:showSidebar', false)
      }
    },
    data () {
      return {
        icons: {
          close: require('vue-human-icons/js/ios/arrow-back')
        }
      }
    },
    methods: {
      clickShade () {
        this.$emit('update:showSidebar', false)
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
  }

  .mw-frame-side {
    position: absolute;
    width: 65%;
    max-width: 220px;
    height: 100%;
    flex-shrink: 0;
    transform: translateX(-110%);
    transition-duration: 300ms;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 999;

    @include min-screen(desktop) {
      position: static;
      width: 220px;
      transition-duration: 0;
      transform: none;
      box-shadow: none;
    }

    &.is-active {
      transform: translateX(0);
    }
  }

  .mw-frame-shade {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 998;
    display: flex;
    align-items: center;
    color: #fff;
    z-index: 998;

    &-holder {
      width: 65%;
      max-width: 220px;
      margin-right: 3rem;
    }

    &-icon {
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
