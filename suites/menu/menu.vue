<template>
  <div class="mw-menu">
    <div class="mw-menu-first-level" v-for="item in list">
      <!-- 父菜单 -->
      <div class="mw-menu-first-button">
        <a href="#" class="mw-menu-first-link">
          {{ item.label }}
        </a>
        <div class="mw-menu-badge">

        </div>
        <div class="mw-menu-dropdown">

        </div>
      </div>
      <!-- 子菜单 -->
      <div class="mw-menu-second-level" v-if="item.children && item.children.length > 0">
        <div class="mw-menu-second-button" v-for="child in item.children">
          <a href="#" class="mw-menu-second-link">
            {{ child.label }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-menu',
    props: {
      list: Array
    }
  })
</script>

<style lang="scss">
  .mw-menu {

  }

  .mw-menu-first-level {

  }

  .mw-menu-first-button {
    display: flex;
    transition-duration: 500ms;

    &:hover {
      background: #eee;
    }
  }

  .mw-menu-first-link {
    display: block;
    flex: 1;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #333;
  }

  .mw-menu-badge {
    flex-shrink: 0;
  }

  .mw-menu-dropdown {
    flex-shrink: 0;
  }

  .mw-menu-second-level {

  }

  .mw-menu-second-button {

  }

  .mw-menu-second-link {

  }
</style>
