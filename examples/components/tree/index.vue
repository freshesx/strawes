<template>
  <mn-scroller>
    <mw-container>
      <mn-section>
        <mn-letter>
          <mn-letter-body>
            <h1>Tree</h1>
          </mn-letter-body>
        </mn-letter>
      </mn-section>
      <mn-section>
        <mn-card>
          <mn-card-item>
            <h3>单选</h3>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <mw-tree :options="single.options" @select="select"></mw-tree>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              已选择: {{single.value}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <h3>多选</h3>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <mw-tree :values.sync="multiple.values" :options="multiple.options" checkable></mw-tree>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              已选择: {{multiple.values}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <h3>默认展开</h3>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <mw-tree :options="defaultExpand.options" :defaultExpand="defaultExpand.defaultExpand"></mw-tree>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            默认展开: {{defaultExpand.defaultExpand}}
          </mn-card-item>
          <mn-card-item>
            <h3>单选默认选中</h3>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <mw-tree :options="defaultSelect.options" :defaultExpand="defaultSelect.defaultExpand" :defaultSelect="defaultSelect.defaultSelect"></mw-tree>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <h3>多选默认选中</h3>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <mw-tree checkable :values.sync="defaultCheck.values" :options="defaultCheck.options" :defaultExpand="defaultCheck.defaultExpand" :defaultCheck="defaultCheck.defaultCheck"></mw-tree>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            默认选中: {{defaultCheck.defaultCheck}}
          </mn-card-item>
          <mn-card-item>
            已选择: {{defaultCheck.values}}
          </mn-card-item>
        </mn-card>
      </mn-section>
      <mn-section>
        <mn-card>
          <mn-card-item>
            <h3>Attributes</h3>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              属性
            </mn-card-body>
            <mn-card-body>
              说明
            </mn-card-body>
            <mn-card-body>
              类型
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              options
            </mn-card-body>
            <mn-card-body>
              选项
            </mn-card-body>
            <mn-card-body>
              Array[Option]
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              checkable
            </mn-card-body>
            <mn-card-body>
              是否多选
            </mn-card-body>
            <mn-card-body>
              Boolean
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              values
            </mn-card-body>
            <mn-card-body>
              选中的值
            </mn-card-body>
            <mn-card-body>
              Array[String,Number]
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              rename
            </mn-card-body>
            <mn-card-body>
              重命名选项; 可以只重命名一部分,其余会使用默认值;
            </mn-card-body>
            <mn-card-body>
              Rename
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              defaultExpand
            </mn-card-body>
            <mn-card-body>
              默认展开项,以节点的 value 为判断条件; 展开到该节点为止,该节点的子节点不会被展开; 自动展开该节点的所有父节点;
            </mn-card-body>
            <mn-card-body>
              Array[String,Number]
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              defaultSelect
            </mn-card-body>
            <mn-card-body>
              单选默认选中项，判断标准是节点的 value ; 不会自动展开，需要展开请设置 defaultExpand
            </mn-card-body>
            <mn-card-body>
              String,Number
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              defaultCheck
            </mn-card-body>
            <mn-card-body>
              多选默认选中项，判断标准是节点的 value
            </mn-card-body>
            <mn-card-body>
              Array[String,Number]
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </mn-section>
      <mn-section>
        <mn-card>
          <mn-card-item>
            <h3>Events</h3>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              名称
            </mn-card-body>
            <mn-card-body>
              说明
            </mn-card-body>
            <mn-card-body>
              参数
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              select
            </mn-card-body>
            <mn-card-body>
              单选时，点击触发
            </mn-card-body>
            <mn-card-body>
              value 选择的节点的 value
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </mn-section>
      <mn-section>
        <mn-card>
          <mn-card-item>
            <h3>Option</h3>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              属性
            </mn-card-body>
            <mn-card-body>
              说明
            </mn-card-body>
            <mn-card-body>
              类型
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              label
            </mn-card-body>
            <mn-card-body>
              选项名
            </mn-card-body>
            <mn-card-body>
              String
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              value
            </mn-card-body>
            <mn-card-body>
              选项值
            </mn-card-body>
            <mn-card-body>
              String,Number
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              children
            </mn-card-body>
            <mn-card-body>
              子选项
            </mn-card-body>
            <mn-card-body>
              Array[Option]
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </mn-section>
      <mn-section>
        <mn-card>
          <mn-card-item>
            <h3>Rename</h3>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              属性
            </mn-card-body>
            <mn-card-body>
              说明
            </mn-card-body>
            <mn-card-body>
              类型
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              label
            </mn-card-body>
            <mn-card-body>
              选项名
            </mn-card-body>
            <mn-card-body>
              String
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              value
            </mn-card-body>
            <mn-card-body>
              选项值
            </mn-card-body>
            <mn-card-body>
              String
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              children
            </mn-card-body>
            <mn-card-body>
              子选项
            </mn-card-body>
            <mn-card-body>
              String
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </mn-section>
    </mw-container>
  </mn-scroller>
</template>

<script>
import { standard } from './mock'
export default {
  data () {
    return {
      single: {
        options: standard,
        value: undefined
      },
      multiple: {
        options: standard,
        values: []
      },
      defaultExpand: {
        options: standard,
        defaultExpand: ['0-0-0-0', '0-1-0']
      },
      defaultSelect: {
        options: standard,
        defaultSelect: '0-0-0-0',
        defaultExpand: ['0-0-0-0']
      },
      defaultCheck: {
        values: [],
        options: standard,
        defaultCheck: ['0-0-0', '0-1-0'],
        defaultExpand: ['0-0-0', '0-1-0']
      }
    }
  },
  methods: {
    select (value) {
      this.single.value = value
    }
  }
}
</script>
