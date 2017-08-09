<template>
  <mw-frame>
    <mw-brand slot="brand">
      Strawes
    </mw-brand>
    <mw-navigation slot="navigation">
      <mw-menu :list="menu"></mw-menu>
    </mw-navigation>
    <mw-information slot="information" :profile="profile">
      <mn-btn theme="secondary" :icon="icons.more" circle size="sm"></mn-btn>
    </mw-information>
  </mw-frame>
</template>

<script>
  import frame from '../../../suites/frame'
  import brand from '../../../suites/brand'
  import navigation from '../../../suites/navigation'
  import menu from '../../../suites/menu'
  import information from '../../../suites/information'

  export default {
    components: {
      ...frame.map(),
      ...brand.map(),
      ...navigation.map(),
      ...menu.map(),
      ...information.map()
    },
    data () {
      return {
        menu: require('./menu').default,
        profile: {
          avatar: 'http://pic-prd.suiyi.com.cn/group1/M00/00/53/CgE-EFlsFFSANB3-AAANCTaiViA67.jpeg',
          name: '测试账号'
        },
        icons: {
          more: require('vue-human-icons/js/ios/gear-outline')
        }
      }
    }
  }
</script>
