<script>
import Element from 'vue-human/utils/Element'

export default new Element({
  name: 'mw-tree-node',
  data () {
    return {
      icons: {
        arrowRight: require('vue-human-icons/js/ios/arrow-right'),
        arrowDown: require('vue-human-icons/js/ios/arrow-down'),
        checkMarkEmpty: require('vue-human-icons/js/ios/checkmark-empty'),
        minusEmpty: require('vue-human-icons/js/ios/minus-empty')
      }
    }
  },
  props: {
    label: {
      type: String
    },
    value: {
      type: [String, Number]
    },
    selectValue: {
      type: [String, Number]
    },
    handleCheck: {
      type: Function
    },
    handleExpand: {
      type: Function
    },
    handleSelect: {
      type: Function
    },
    isCheck: {
      type: Boolean
    },
    isExpand: {
      type: Boolean
    },
    hasParent: {
      type: Boolean
    },
    hasChildren: {
      type: Boolean
    },
    index: {
      type: Array
    },
    children: {
      type: Array
    },
    checkable: {
      type: Boolean
    }
  },
  computed: {
    paddingNum () {
      if (this.checkable) {
        return 48
      } else {
        return 24
      }
    },
    isSelect () {
      return this.selectValue === this.value
    }
  },
  methods: {
    getArrow () {
      let content = ''
      if (this.hasChildren) {
        const iconSvg = this.isExpand ? this.icons.arrowDown : this.icons.arrowRight
        content = <mn-icon name={iconSvg}></mn-icon>
      }
      return (
        <div class="mw-tree-node-arrow">
          {content}
        </div>
      )
    },
    onCheck (event) {
      event.stopPropagation()
      this.handleCheck(this.index, this.value)
    },
    onClickLine () {
      if (this.hasChildren) {
        this.onExpand()
      }
      if (!this.checkable) {
        this.onSelect()
      }
    },
    onSelect () {
      this.handleSelect(this.value)
    },
    onExpand () {
      this.handleExpand(this.index)
    },
    isMixedCheck () {
      const flag = this.children[0].isCheck
      let result = false
      const check = (temp) => {
        temp.forEach(item => {
          if (item.isCheck !== flag) {
            result = true
          }
          if (item.children) {
            check(item.children)
          }
        })
      }
      check(this.children)
      return result
    },
    getCheck () {
      if (this.checkable) {
        let checkStyle = {}
        let content = ''
        if (this.isCheck) {
          checkStyle = {
            backgroundColor: '#4cd964',
            color: 'white',
            border: 'none'
          }
          content = <mn-icon name={this.icons.checkMarkEmpty}></mn-icon>
        }
        if (this.hasChildren && this.isMixedCheck()) {
          checkStyle = {
            backgroundColor: '#4cd964',
            color: 'white',
            border: 'none'
          }
          content = <mn-icon name={this.icons.minusEmpty}></mn-icon>
        }
        return (
          <div class="mw-tree-node-check" style={checkStyle} onClick={this.onCheck}>
            {content}
          </div>
        )
      } else {
        return ''
      }
    }
  },
  render () {
    const arrow = this.getArrow()
    const check = this.getCheck()
    const lineStyle = {
      paddingLeft: `${this.paddingNum * (this.index.length - 1)}px`
    }
    const lineClassName = `mw-tree-node-line${this.isSelect ? ' is-select' : ''}`
    const toggleStyle = {
      display: this.isExpand ? 'block' : 'none'
    }
    return (
      <div class="mw-tree-node">
        <div class={lineClassName} style={lineStyle} onClick={this.onClickLine}>
          {arrow}
          {check}
          <span class="mw-tree-node-label">{this.label}</span>
        </div>
        <div style={toggleStyle}>{this.$slots.default}</div>
      </div>
    )
  }
})
</script>

<style lang="scss">
@import "~vue-human/scss/vars.scss";
.mw-tree-node {
  margin: 5px 0;

  .mw-tree-node-line {
    width: 100%;
    cursor: pointer;
    display: flex;
    &:hover {
      background-color: #f5f7fa;
    }
    &.is-select {
      background-color: #d2eafb;
    }
    .mw-tree-node-arrow {
      width: 24px;
      height: 24px;
    }
    .mw-tree-node-check {
      width: 24px;
      height: 24px;
      border: 1px solid #ccc;
      &:hover {
        border: 1px solid $green;
      }
    }
    .mw-tree-node-label {
      margin-left: 8px;
    }
  }
}
</style>
