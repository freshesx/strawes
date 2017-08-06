<template>
  <mw-frame>
    <mw-brand slot="brand">
      Strawes
    </mw-brand>
    <mw-navigation slot="navigation"></mw-navigation>
    <div slot="information">
      ChaselWu
    </div>
  </mw-frame>
</template>

<script>
  import frame from '../../../suites/frame'
  import brand from '../../../suites/brand'
  import navigation from '../../../suites/navigation'

  export default {
    components: {
      ...frame.map(),
      ...brand.map(),
      ...navigation.map()
    }
  }
</script>
