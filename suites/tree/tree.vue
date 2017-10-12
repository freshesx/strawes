<script>
import Element from 'vue-human/utils/Element'
import TreeNode from './treeNode'
import cloneDeep from 'lodash/cloneDeep'
export default new Element({
  name: 'mw-tree',
  components: {
    TreeNode
  },
  props: {
    options: {
      type: Array
    },
    checkable: {
      type: Boolean
    },
    values: {
      type: Array
    },
    rename: {
      type: Object
    },
    defaultExpand: {
      type: Array
    },
    defaultSelect: {
      type: [String, Number]
    },
    defaultCheck: {
      type: Array
    }
  },
  data () {
    return {
      initOptions: [],
      selectValue: undefined
    }
  },
  methods: {
    // 根据 index 获取目标节点
    getTargetItem (index) {
      const findTarget = (temp, flag = 0) => {
        if (flag === 0) {
          return findTarget(temp[index[flag]], flag + 1)
        } else if (flag < index.length) {
          return findTarget(temp.children[index[flag]], flag + 1)
        } else {
          return temp
        }
      }
      return findTarget(this.initOptions)
    },
    // 向下遍历子节点，设置选择状态
    deepCheck (root, status) {
      const check = (temp) => {
        temp.children.forEach(item => {
          item.isCheck = status
          if (item.children) {
            check(item)
          }
        })
      }
      check(root)
    },
    // 向下遍历子节点，设置值
    deepHandleValue (targetItem, values) {
      const handleValue = (temp) => {
        temp.children.forEach(item => {
          const { isCheck, value, children } = item
          values = this.toggleValue(isCheck, value, values)
          if (children) {
            handleValue(item)
          }
        })
      }
      handleValue(targetItem)
      return values
    },
    // 修复节点选择状态(该节点的子节点全部选中/不选中时，该节点应当设置成同样的选择状态,并设置对应的值)
    fixCheck (root, values) {
      const flag = root.children[0].isCheck
      for (let i = 0, len = root.children.length; i < len; i++) {
        if (root.children[i].isCheck !== flag) {
          return values
        }
      }
      values = this.toggleValue(root.isCheck, root.value, values)
      root.isCheck = flag
      return values
    },
    // 根据选择状态，添加/删除对应的值
    toggleValue (isCheck, value, values) {
      if (isCheck) {
        // 选中则删除
        values = values.filter(item => {
          return item !== value
        })
      } else {
        // 未选中则添加
        values = [...values, value]
      }
      return values
    },
    // 处理选择状态
    handleCheck (index, value) {
      let values = this.values
      // 获取当前节点
      const targetItem = this.getTargetItem(index)
      // 处理当前节点的值
      values = this.toggleValue(targetItem.isCheck, value, values)
      // 获取当前节点应该被设置的选择状态（此时未设置）
      const incomingCheck = !targetItem.isCheck
      // 存在子节点
      if (targetItem.children) {
        // 递归处理所有子节点的值
        values = this.deepHandleValue(targetItem, values)
        // 递归处理所有子节点的选择状态
        this.deepCheck(targetItem, incomingCheck)
      }
      // 处理当前节点的选择状态
      targetItem.isCheck = incomingCheck
      // 存在父节点
      if (targetItem.parent) {
        // 处理所有可能存在的父节点
        const handleParent = (temp) => {
          // 获取父节点
          const parentItem = this.getTargetItem(temp.index)
          // 处理父节点的值和选择状态
          values = this.fixCheck(parentItem, values)
          if (temp.parent) {
            handleParent(temp.parent)
          }
        }
        handleParent(targetItem.parent)
      }
      // 更新存储值
      this.$emit('update:values', values)
      this.$forceUpdate()
    },
    // 处理展开状态
    handleExpand (index) {
      const targetItem = this.getTargetItem(index)
      targetItem.isExpand = !targetItem.isExpand
      this.$forceUpdate()
    },
    // 处理单选
    handleSelect (value) {
      this.selectValue = value
      this.$emit('select', value)
    },
    // 重命名 options
    renameOptions (options) {
      const { label = 'label', value = 'value', children = 'children' } = this.rename
      const rename = (temp) => {
        return temp.map(item => {
          if (item[children]) {
            item.children = rename(item[children])
          }
          return {
            label: item[label],
            value: item[value],
            children: item.children
          }
        })
      }
      return rename(options)
    },
    // 获取初始 options
    getInitOptions () {
      this.initOptions = cloneDeep(this.options)
      let defaultExpandMap = {}
      let defaultCheckMap = {}
      if (this.rename) {
        this.initOptions = this.renameOptions(this.initOptions)
      }
      const init = (temp) => {
        return temp.map((option, index) => {
          option.isCheck = false
          if (option.parent && option.parent.index) {
            option.index = [...option.parent.index, index]
          } else {
            option.index = [index]
          }
          if (this.defaultCheck) {
            if (this.defaultCheck.includes(option.value)) {
              defaultCheckMap[option.value] = option.index
            }
          }
          if (this.defaultExpand) {
            if (this.defaultExpand.includes(option.value)) {
              defaultExpandMap[option.value] = option.index
            }
          }
          if (option.children) {
            option.isExpand = false
            const { children, ...others } = option
            option.children = children.map(child => {
              child.parent = { ...others }
            })
            option.children = init(children)
          }
          return option
        })
      }
      this.initOptions = init(this.initOptions)
      if (this.defaultExpand) {
        this.initOptions = this.setDefaultExpand(defaultExpandMap, this.initOptions)
      }
      if (this.defaultCheck) {
        this.initOptions = this.setDefaultCheck(defaultCheckMap, this.initOptions)
      }
    },
    // 设置默认展开状态
    setDefaultExpand (defaultExpandMap, options) {
      Object.values(defaultExpandMap).forEach(index => {
        const expand = (temp, flag = 0) => {
          temp[index[flag]].isExpand = true
          if (flag < index.length - 2) {
            expand(temp[index[flag]].children, flag + 1)
          }
        }
        expand(options)
      })
      return options
    },
    // 设置默认选择状态
    setDefaultCheck (defaultCheckMap, options) {
      let values = this.values
      Object.keys(defaultCheckMap).forEach(value => {
        const index = defaultCheckMap[value]
        const targetItem = this.getTargetItem(index)
        targetItem.isCheck = true
        if (!values.includes(value)) {
          values.push(value)
        }
        if (targetItem.children) {
          values = this.deepHandleValue(targetItem, values)
          this.deepCheck(targetItem, true)
        }
      })
      this.$emit('update:values', values)
      return options
    },
    // 递归渲染树节点
    renderTreeNodes (options) {
      return options.map((option) => {
        const { label, value, isCheck, isExpand, index, parent, children } = option
        return (
          <TreeNode
            key={value}
            label={label}
            value={value}
            isCheck={isCheck}
            isExpand={isExpand}
            index={index}
            hasParent={parent !== undefined}
            hasChildren={children !== undefined}
            children={children}
            selectValue={this.selectValue}
            handleCheck={this.handleCheck}
            handleExpand={this.handleExpand}
            handleSelect={this.handleSelect}
            checkable={this.checkable}>
            {children ? this.renderTreeNodes(children) : ''}
          </TreeNode>
        )
      })
    }
  },
  render () {
    return (
      <div class="mw-tree">
        {this.renderTreeNodes(this.initOptions)}
      </div>
    )
  },
  created () {
    if (this.defaultSelect) {
      this.selectValue = this.defaultSelect
    }
    this.getInitOptions()
  }
})
</script>

<style lang="scss">
.mw-tree {
  width: 100%;
  background-color: white;
}
</style>
