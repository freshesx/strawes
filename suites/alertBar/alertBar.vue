<template>
  <div class="mw-alert-bar" :class="{ [`is-${theme}`]: !!theme }" v-if="!hide">
    <!-- @todo 添加 transition 作为关闭的动画 -->
    <div class="mw-alert-bar-prefix">
      <slot name="prefix">
        <mn-icon :name="icon"></mn-icon>
      </slot>
    </div>
    <div class="mw-alert-bar-body">
      <slot>默认文字</slot>
    </div>
    <div class="mw-alert-bar-suffix" @click="onClose" v-if="hideIcon">
      <slot name="suffix">
        <mn-icon :name="hideIcon"></mn-icon>
      </slot>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'
  import icons from './_icons'

  export default new Element({
    name: 'mw-alert-bar',
    props: {
      theme: {
        type: String,
        validator (val) {
          return ['default', 'success', 'info', 'warning', 'error'].includes(val)
        },
        default: 'default'
      },
      hideIcon: {
        default () {
          return require('vue-human-icons/js/ios/close')
        }
      }
    },
    data () {
      return {
        hide: false
      }
    },
    computed: {
      icon () {
        return icons[this.theme]
      }
    },
    methods: {
      onClose (event) {
        this.hide = true
        this.$emit('hided', event, this)
      },
      open () {
        this.hide = false
      }
    }
  })
</script>

<style lang="scss">
  @import "~vue-human/scss/vars.scss";

  .mw-alert-bar {
    background: #fff;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;

    p {
      margin: 0;
    }

    &.is-default {
      color: #333;
    }

    &.is-success {
      background: $green;
      color: #fff;
    }

    &.is-info {
      background: $blue;
      color: #fff;
    }

    &.is-warning {
      background: $orange;
      color: #fff;
    }

    &.is-error {
      background: $pink;
      color: #fff;
    }
  }

  .mw-alert-bar-body {
    flex: 1;
  }

  .mw-alert-bar-prefix {
    margin-right: 0.5rem;
  }

  .mw-alert-bar-suffix {
    margin-left: 0.5rem;
    color: rgba(255, 255, 255, 0.75);
    transition-duration: 500ms;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }

  .mw-alert-bar.is-default {
    .mw-alert-bar-suffix {
      color: rgba(0, 0, 0, 0.3);

      &:hover {
        color: #333;
      }
    }
  }
</style>
