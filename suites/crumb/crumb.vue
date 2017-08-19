<template>
  <div class="mw-crumb">
    <div class="mw-crumb-back">
      <mn-btn class="has-one-padding-left" :icon="back" theme="secondary" size="sm">返回</mn-btn>
    </div>
    <div class="mw-crumb-link">
      <span v-for="(item, key) in matched" :key="key">
        <a href="#">{{ item.meta.title || '请为 meta.title 命名' }}</a><span v-if="key !== matched.length - 1">&gt;</span>
      </span>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'
  import iconElement from 'vue-human/suites/icon/icon'

  export default new Element({
    name: 'mw-crumb',
    components: {
      ...iconElement.inject()
    },
    data () {
      return {
        back: require('vue-human-icons/js/ios/arrow-back')
      }
    },
    computed: {
      matched () {
        return this.$route.matched
      }
    }
  })
</script>

<style lang="scss">
  .mw-crumb {
    display: flex;
    align-items: center;
  }

  .mw-crumb-back {

  }

  .mw-crumb-link {
    margin-left: 1rem;
    > span > a {
      font-size: 1.2rem;
      color: #666;
      text-decoration: none;
      font-weight: 400;
    }
    > span > span {
      font-size: 1.2rem;
      margin: 0 0.5rem;
    }
  }
</style>
