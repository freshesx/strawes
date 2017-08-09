<template>
  <mw-frame>
    <mw-brand slot="brand">
      Strawes
    </mw-brand>
    <mw-navigation slot="navigation">
      <mw-menu :list="menu" :collapsed="false"></mw-menu>
    </mw-navigation>
    <div slot="information">
      ChaselWu
    </div>
  </mw-frame>
</template>

<script>
  import frame from '../../../suites/frame'
  import brand from '../../../suites/brand'
  import navigation from '../../../suites/navigation'
  import menu from '../../../suites/menu'

  export default {
    components: {
      ...frame.map(),
      ...brand.map(),
      ...navigation.map(),
      ...menu.map()
    },
    data () {
      return {
        menu: require('./menu').default
      }
    }
  }
</script>
