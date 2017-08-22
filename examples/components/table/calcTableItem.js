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
        name: 'publish',
        icon: require('vue-human-icons/js/ios/box'),
        label: '可见'
      },
      {
        name: 'edit',
        icon: require('vue-human-icons/js/ios/copy'),
        label: '编辑'
      },
      {
        name: 'view',
        icon: require('vue-human-icons/js/ios/bookmarks'),
        label: '查看'
      },
      {
        name: 'remove',
        icon: require('vue-human-icons/js/ios/trash'),
        label: '移除'
      }
    ]
  }
}
