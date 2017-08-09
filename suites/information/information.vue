<template>
  <div class="mw-information">
    <div class="mw-information-profile">
      <div class="mw-information-profile-avatar">
        <img :src="profile.avatar" v-if="profile && profile.avatar">
        <mn-icon :name="icons.analytics" :scale="2" v-else></mn-icon>
      </div>
      <div class="mw-information-profile-name" v-if="profile.name">
        {{profile.name}}
      </div>
    </div>
    <div class="mw-information-tool">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-information',
    props: {
      profile: Object
    },
    data () {
      return {
        icons: {
          analytics: require('vue-human-icons/js/ios/analytics')
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  .mw-information {
    font-size: 0.875rem;
    background: #eee;
    padding: 0.6rem 0;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .mw-information-profile {
    color: #666;

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }
  }

  .mw-information-tool {
    flex-shrink: 0;
  }
</style>
