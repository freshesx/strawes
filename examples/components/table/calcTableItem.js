export default function calcTableItem (item) {
  return {
    $key: item.id,
    cover: item.images.small,
    title: item.title,
    director: item.directors.map(item => item.name).join(', '),
    actor: item.casts.map(item => item.name).join(', '),
    rating: item.rating.average,
    tags: item.genres,
    year: item.year,
    actions: [
      {
        name: 'edit',
        icon: require('vue-human-icons/js/ios/copy-outline'),
        label: '编辑'
      },
      {
        name: 'remove',
        icon: require('vue-human-icons/js/ios/trash-outline'),
        label: '删除'
      },
      {
        name: 'view',
        icon: require('vue-human-icons/js/ios/trash-outline'),
        label: '查看'
      },
      {
        name: 'test',
        icon: require('vue-human-icons/js/ios/trash-outline'),
        label: '测试'
      }
    ]
  }
}
