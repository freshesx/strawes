export default function calcTableItem (item) {
  return {
    $key: item.id,
    cover: item.image,
    title: item.title,
    director: item.directors,
    actor: item.casts,
    rating: item.rating,
    stars: item.stars,
    collectCount: item.collectCount,
    tags: item.genres.split(','),
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
