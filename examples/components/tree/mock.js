export const standard = [
  {
    label: '0',
    value: '0',
    children: [
      {
        label: '0-0',
        value: '0-0',
        children: [
          {
            label: '0-0-0',
            value: '0-0-0',
            children: [
              {
                label: '0-0-0-0',
                value: '0-0-0-0'
              },
              {
                label: '0-0-0-1',
                value: '0-0-0-1'
              }
            ]
          },
          { label: '0-0-1', value: '0-0-1' },
          { label: '0-0-2', value: '0-0-2' }
        ]
      },
      {
        label: '0-1',
        value: '0-1',
        children: [
          { label: '0-1-0', value: '0-1-0' },
          { label: '0-1-1', value: '0-1-1' },
          { label: '0-1-2', value: '0-1-2' }
        ]
      },
      {
        label: '0-2',
        value: '0-2'
      }
    ]
  },
  {
    label: '1',
    value: '1',
    children: [
      {
        label: '1-0',
        value: '1-0',
        children: [
          { label: '1-0-0', value: '1-0-0' },
          { label: '1-0-1', value: '1-0-1' },
          { label: '1-0-2', value: '1-0-2' }
        ]
      }
    ]
  },
  {
    label: '2',
    value: '2'
  }
]

export const nonstandard = [
  {
    name: '0-0',
    id: '0-0',
    children: [
      {
        name: '0-0-0',
        id: '0-0-0',
        children: [
          { name: '0-0-0-0', id: '0-0-0-0' },
          { name: '0-0-0-1', id: '0-0-0-1' },
          { name: '0-0-0-2', id: '0-0-0-2' }
        ]
      },
      {
        name: '0-0-1',
        id: '0-0-1',
        children: [
          { name: '0-0-1-0', id: '0-0-1-0' },
          { name: '0-0-1-1', id: '0-0-1-1' },
          { name: '0-0-1-2', id: '0-0-1-2' }
        ]
      },
      {
        name: '0-0-2',
        id: '0-0-2'
      }
    ]
  },
  {
    name: '0-1',
    id: '0-1',
    children: [
      {
        name: '0-1-0',
        id: '0-1-0',
        children: [
          { name: '0-1-0-0', id: '0-1-0-0' },
          { name: '0-1-0-1', id: '0-1-0-1' },
          { name: '0-1-0-2', id: '0-1-0-2' }
        ]
      }
    ]
  },
  {
    name: '0-2',
    id: '0-2'
  }
]

export const element = [
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          },
          {
            id: 10,
            label: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1'
      },
      {
        id: 8,
        label: '二级 3-2'
      }
    ]
  }
]
