export default [
  {
    path: '/',
    name: 'homepage',
    component: resolve => { require(['../components/home'], resolve) },
    meta: {
      title: '首页'
    }
  },
  {
    path: '/start',
    name: 'start',
    component: resolve => { require(['../components/start'], resolve) },
    meta: {
      title: '入门'
    }
  },
  // 原则页面
  {
    path: '/styles/regulation',
    name: 'stylesRegulation',
    component: resolve => { require(['../components/styles/regulation'], resolve) },
    meta: {
      title: '规则化'
    }
  },
  {
    path: '/styles/multiscreens',
    name: 'stylesMultiscreens',
    component: resolve => { require(['../components/styles/multiscreens'], resolve) },
    meta: {
      title: '多屏化'
    }
  },
  {
    path: '/styles/efficient',
    name: 'stylesEfficient',
    component: resolve => { require(['../components/styles/efficient'], resolve) },
    meta: {
      title: '高效化'
    }
  },
  {
    path: '/styles/lively',
    name: 'stylesLively',
    component: resolve => { require(['../components/styles/lively'], resolve) },
    meta: {
      title: '活泼化'
    }
  },
  // 视觉
  {
    path: '/styles/metrics',
    name: 'stylesMetrics',
    component: resolve => { require(['../components/styles/metrics'], resolve) },
    meta: {
      title: '测量与单位'
    }
  },
  {
    path: '/styles/grid',
    name: 'stylesGrid',
    component: resolve => { require(['../components/styles/grid'], resolve) },
    meta: {
      title: '网格'
    }
  },
  {
    path: '/styles/typography',
    name: 'stylesTypography',
    component: resolve => { require(['../components/styles/typography'], resolve) },
    meta: {
      title: '字体'
    }
  },
  {
    path: '/styles/colors',
    name: 'stylesColors',
    component: resolve => { require(['../components/styles/colors'], resolve) },
    meta: {
      title: '颜色'
    }
  },
  {
    path: '/styles/copywriting',
    name: 'stylesCopywriting',
    component: resolve => { require(['../components/styles/copywriting'], resolve) },
    meta: {
      title: '文案'
    }
  },
  // 表格
  {
    path: '/table/example',
    name: 'tableExample',
    component: resolve => { require(['../components/table/example'], resolve) },
    meta: {
      title: '列表案例'
    }
  },
  {
    path: '/table/structure',
    name: 'tableStructure',
    component: resolve => { require(['../components/table/structure'], resolve) },
    meta: {
      title: '列表结构'
    }
  }
]
