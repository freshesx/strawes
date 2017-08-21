<template>
  <mw-frame>
    <mw-brand slot="brand">
      Strawes
    </mw-brand>
    <mw-navigation slot="navigation">
      <mw-menu :list="menu"></mw-menu>
    </mw-navigation>
    <div slot="information">
      <mw-profile label="周聪"
        avator="https://ois1yok9v.qnssl.com/example-avator.png">
      </mw-profile>
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
