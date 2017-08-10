<template>
  <mn-scroller>
    <div class="mw-menu">
      <div :class="['mw-menu-first-level', { 'is-opened': item.isOpened || !item.collapsed }]" v-for="item in list">
        <!-- 父菜单 -->
        <div
          :class="['mw-menu-first-button',
           {'is-selected': item.route && (item.route.name === routeName)},
           {'is-title': !item.route && !item.collapsed}]"
          @click="onSelect(item)">
          <router-link
            v-if="item.route"
            :to="item.route"
            class="mw-menu-first-link">
            <mn-icon :name="item.icon" :scale="0.8" v-if="item.icon"></mn-icon>
            <span>{{ item.label }}</span>
          </router-link>
          <span v-else class="mw-menu-first-link">
            <mn-icon :name="item.icon" :scale="0.8" v-if="item.icon"></mn-icon>
            {{ item.label }}
          </span>
          <div
            :class="['mw-menu-badge', {'is-empty': !item.content}]"
            v-if="item.badge"
            @click="$router.push(item.badge.route || item.route)">
            {{item.badge.content}}
          </div>
          <div class="mw-menu-dropdown">
            <div v-if="item.collapsed && item.children && item.children.length > 0">
              <mn-icon :name="arrow" :scale="0.8"></mn-icon>
            </div>
          </div>
        </div>
        <!-- 子菜单 -->
        <div
          class="mw-menu-second-level"
          v-if="item.children && item.children.length > 0">
          <div
            :class="['mw-menu-second-button', {'is-selected': child.route && (child.route.name === routeName)}]"
            v-for="child in item.children">
            <router-link :to="child.route" class="mw-menu-second-link">
              {{ child.label }}
            </router-link>
            <div
              :class="['mw-menu-badge', {'is-empty': !child.badge.content}]"
              v-if="child.badge"
              @click="$router.push(child.badge.route || child.route)">
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
  import shade from 'vue-human/utils/shade'

  export default new Element({
    name: 'mw-menu',
    props: {
      list: Array,
      arrow: Object
    },
    computed: {
      routeName () {
        return this.$route.name
      }
    },
    methods: {
      onSelect (item) {
        if (item.children && item.children.length > 0) {
          if (item.collapsed) {
            this.list.forEach(val => {
              val.isOpened = false
            })
            return item.isOpened = true
          }

          item.isOpened = !item.isOpened
        }
      }
    },
    mounted () {
      const routeName = this.$route.name
      this.list.forEach(item => {
        if (item.children) {
          this.$set(item, 'isOpened', false)
          if (item.children.findIndex(child => {
            return child.route && child.route.name === routeName
          }) > -1) return this.$set(item, 'isOpened', true)
        }
      })
    }
  })
</script>

<style lang="scss">
  .mw-menu {
    .is-selected {
      background: #eee;
    }
  }

  .mw-menu-first-level {

  }

  .mw-menu-first-button {
    display: flex;
    align-items: center;
    transition-duration: 500ms;

    &:hover {
      cursor: pointer;
      background: #eee;
    }
    &.is-title {
      cursor: text;
      background: #fff;
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

    .mn-icon-svg > svg {
      vertical-align: sub;
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
    cursor: pointer;

    &.is-empty {
      width: 0.5rem;
      height: 0.5rem;
      padding: 0;
    }
  }

  .mw-menu-dropdown {
    flex-shrink: 0;
    width: 1.5rem;

    .mn-icon-svg > svg {
      vertical-align: sub;
      transition: all 0.3s;
    }
  }

  .mw-menu-second-level {
    height: 0;
    overflow: hidden;
    font-size: 0.875rem;
    transition: all 0.3s;
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
    padding: 0.5rem 1rem 0.5rem 2rem;
    text-decoration: none;
    color: #666;
  }

  .is-opened {
    .mw-menu-second-level {
      height: 100px;
    }

    .mw-menu-dropdown svg {
      transform: rotate(90deg);
    }
  }
</style>
