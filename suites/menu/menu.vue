<template>
  <div class="mw-menu">
    <div class="mw-menu-first-level" v-for="item in list">
      <!-- 父菜单 -->
      <div class="mw-menu-first-button">
        <router-link :to="item.route" class="mw-menu-first-link" v-if="item.route">
          <mn-icon :name="item.icon" :scale="0.9" v-if="item.icon"></mn-icon>
          {{ item.label }}
        </router-link>
        <span v-else class="mw-menu-first-link">
          <mn-icon :name="item.icon" :scale="0.9" v-if="item.icon"></mn-icon>
          {{ item.label }}
        </span>
        <div class="mw-menu-badge">

        </div>
        <div class="mw-menu-dropdown" v-if="item.children && item.children.length > 0">
          <mn-icon :name="icons.arrowDown" :scale="0.9"></mn-icon>
        </div>
      </div>
      <!-- 子菜单 -->
      <div class="mw-menu-second-level is-hidden" v-if="item.children && item.children.length > 0">
        <div class="mw-menu-second-button" v-for="child in item.children">
          <router-link :to="child.route" class="mw-menu-second-link">
            {{ child.label }}
          </router-link>
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
    },
    data () {
      return {
        icons: {
          arrowDown: require('vue-human-icons/js/ios/arrow-down'),
          arrowUp: require('vue-human-icons/js/ios/arrow-up')
        }
      }
    },
    methods: {
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
    align-items: center;
    transition-duration: 500ms;

    &:hover {
      background: #eee;
    }
  }

  .mw-menu-first-link {
    display: block;
    align-items: center;
    flex: 1;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #333;

    .mn-icon {
      margin-right: 0.2rem;
    }
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
    display: block;
    flex: 1;
    padding: 0.5rem 2rem;
    text-decoration: none;
    color: #333;
  }
</style>
