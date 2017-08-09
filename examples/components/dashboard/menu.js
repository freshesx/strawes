/**
 * 菜单
 * @prop {Array} menu
 * @prop {Object} menu[]
 * @prop {String} menu[].label
 * @prop {Object|String} menu[].route - 路由地址
 * @prop {Boolean} menu[].enableCollapse - 允许折叠
 */
export default [
  {
    label: '首页',
    route: { name: 'start' },
    icon: require('vue-human-icons/js/ios/keypad'),
    badge: {
      route: { name: 'stylesRegulation' }
    }
  },
  {
    label: '原则1',
    collapsed: true,
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
      }
    ]
  },
  {
    label: '原则2',
    children: [
      {
        label: '高效化',
        route: { name: 'stylesEfficient' }
      },
      {
        label: '活泼化',
        route: { name: 'stylesLively' }
      }
    ]
  }
]
