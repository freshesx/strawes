<template>
  <div class="mw-profile">
    <div class="mw-profile-avator">
      <img :src="avator">
    </div>
    <div class="mw-profile-contents">
      <div class="mw-profile-label">{{ label }}</div>
      <div class="mw-profile-custom" v-if="$slots.default">
        <slot></slot>
      </div>
    </div>
    <div class="mw-profile-action">
      <mn-icon :name="cog"></mn-icon>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-profile',
    props: {
      label: String,
      avator: String
    },
    data () {
      return {
        cog: require('vue-human-icons/js/ios/information')
      }
    }
  })
</script>

<style lang="scss">
  @import "~vue-human/scss/vars.scss";

  .mw-profile {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition-duration: 500ms;
  }

  .mw-profile-avator {
    $width: 64px;

    width: $width;
    height: $width;
    flex-shrink: 0;
    margin-right: 1rem;

    > img {
      display: block;
      width: $width;
      height: $width;
    }
  }

  .mw-profile-contents {
    flex: 1;
    overflow: hidden;
  }

  .mw-profile-label {
    font-size: 1.125rem;
    transition-duration: 200ms;
  }

  .mw-profile-action {
    flex-shrink: 0;
    padding-right: 0.5rem;
    color: #999;
    transition-duration: 200ms;
  }

  .mw-profile:hover {
    background: $green;

    .mw-profile-label,
    .mw-profile-action {
      color: #fff;
    }
  }
</style>
