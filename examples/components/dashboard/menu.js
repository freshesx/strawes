/**
 * 菜单
 * @prop {Array}         menu
 * @prop {Object}        menu[]
 * @prop {String}        menu[].label           - 显示标题
 * @prop {Object}        menu[].route           - 路由地址
 * @prop {Boolean}       menu[].collapsed       - 允许折叠
 * @prop {Object}        menu[].badge           - 徽标
 * @prop {String}        menu[].badge[].content - 徽标显示内容
 * @prop {String}        menu[].badge[].route   - 徽标路由地址
 */
export default [
  {
    label: '首页',
    route: { name: 'start' },
    icon: require('vue-human-icons/js/ios/home-outline'),
    badge: {
      route: { name: 'stylesRegulation' }
    }
  },
  {
    label: '原则',
    collapsed: true,
    icon: require('vue-human-icons/js/ios/paper-outline'),
    badge: {
      route: { name: 'stylesRegulation' }
    },
    children: [
      {
        label: '规则化',
        route: { name: 'stylesRegulation' },
        badge: {
          content: 1,
          route: { name: 'stylesRegulation' }
        }
      },
      {
        label: '多屏化',
        route: { name: 'stylesMultiscreens' },
        badge: {
          content: 'hi',
          route: { name: 'stylesRegulation' }
        }
      },
      {
        label: '高效化',
        route: { name: 'stylesEfficient' }
      },
      {
        label: '活泼化',
        route: { name: 'stylesLively' }
      }
    ]
  },
  {
    label: '列表模式',
    collapsed: true,
    icon: require('vue-human-icons/js/ios/keypad-outline'),
    children: [
      {
        label: '列表案例',
        route: { name: 'tableExample' }
      },
      {
        label: '列表结构',
        route: { name: 'tableStructure' }
      }
    ]
  }
]
