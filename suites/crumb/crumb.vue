<template>
  <div class="mw-crumb">
    <div class="mw-crumb-back">
      <mn-btn class="has-one-padding-left" :icon="back" theme="secondary" size="sm" @click="$router.go(-1)">返回</mn-btn>
    </div>
    <div class="mw-crumb-link">
      <a :href="calcLink(item)" v-for="(item, key) in matched" :key="key">{{ item.meta.title || '请为 meta.title 命名' }}</a>
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
    },
    methods: {
      calcLink (item) {
        return this.$router.resolve(item.path).href
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
    display: flex;

    > a {
      display: block;
      background: #d9d9d9;
      height: 32px;
      padding: 5px 0.75rem;
      color: #000;
      text-decoration: none;
      border-right: solid 1px rgba(0, 0, 0, 0.1);
      font-size: 0.875rem;

      &:first-child {
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }

      &:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        border-right: none;
      }
    }
  }
</style>
