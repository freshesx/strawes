<template>
  <mn-scroller>
    <div class="mw-menu">
      <div class="mw-menu-first-level" v-for="item in list">
        <!-- 父菜单 -->
        <div :class="['mw-menu-first-button']" @click="onSelect(item)">
          <router-link
            v-if="item.route"
            :to="item.route"
            class="mw-menu-first-link">
            <mn-icon :name="item.icon" :scale="0.9" v-if="item.icon"></mn-icon>
            {{ item.label }}
          </router-link>
          <span v-else class="mw-menu-first-link">
            <mn-icon :name="item.icon" :scale="0.9" v-if="item.icon"></mn-icon>
            {{ item.label }}
          </span>
          <div :class="['mw-menu-badge', {'is-empty': !item.content}]" v-if="item.badge" @click="$router.push(item.badge.route || item.route)">
            {{item.badge.content}}
          </div>
          <div class="mw-menu-dropdown">
            <div v-if="!item.isFixed && item.children && item.children.length > 0">
              <mn-icon :name="icons.arrowUp" :scale="0.8" v-if="item.isOpened"></mn-icon>
              <mn-icon :name="icons.arrowDown" :scale="0.8" v-else></mn-icon>
            </div>
          </div>
        </div>
        <!-- 子菜单 -->
        <div :class="['mw-menu-second-level', { 'is-opened': item.isOpened || item.isFixed }]" v-if="item.children && item.children.length > 0">
          <div class="mw-menu-second-button" v-for="child in item.children">
            <router-link :to="child.route" class="mw-menu-second-link">
              {{ child.label }}
            </router-link>
            <div :class="['mw-menu-badge', {'is-empty': !child.badge.content}]" v-if="child.badge" @click="$router.push(child.badge.route || child.route)">
              {{child.badge.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </mn-scroller>
</template>

<script>
  import Element from 'vue-human/utils/Element'

  export default new Element({
    name: 'mw-menu',
    props: {
      list: Array,
      accordion: {
        type: Boolean,
        default: false
      }
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
      onSelect (item) {
        if (item.children && item.children.length > 0) {
          item.isOpened = !item.isOpened
        }
      }
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
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    background: #ff5b57;
    color: #fff;
    font-size: 0.75rem;
    line-height: 1rem;
    margin-right: 0.2rem;

    &.is-empty {
      width: 0.5rem;
      height: 0.5rem;
      padding: 0;
    }
  }

  .mw-menu-dropdown {
    flex-shrink: 0;
    width: 1.5rem;
  }

  .mw-menu-second-level {
    height: 0;
    overflow: hidden;

    &.is-opened {
      height: auto;
    }
  }

  .mw-menu-second-button {
    display: flex;
    align-items: center;

    &:hover {
      background: #eee;
    }

    .mw-menu-badge {
      margin-right: 1.5rem;
    }
  }

  .mw-menu-second-link {
    display: block;
    flex: 1;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    text-decoration: none;
    color: #333;
  }

  .router-link-active {
    background: #eee;
  }
</style>
