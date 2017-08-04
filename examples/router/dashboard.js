export default [
  {
    path: '/start',
    name: 'start',
    component: resolve => { require(['../components/start'], resolve) },
    meta: {
      title: '入门'
    }
  }
]
