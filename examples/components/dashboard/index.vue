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
    <router-view slot="contents"></router-view>
  </mw-frame>
</template>

<script>
  export default {
    data () {
      return {
        menu: require('./menu').default
      }
    }
  }
</script>
