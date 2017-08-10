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
    collapsed: true,
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
