<template>
  <mn-page>
    <mn-scroller>
      <mw-container>
        <mn-section>
          <mw-crumb></mw-crumb>
        </mn-section>

        <mn-section>
          <mn-card>
            <mn-card-item><h5>筛选区域常见的类型</h5></mn-card-item>
            <mn-card-item>
              <mn-card-body>
                <ul>
                  <li>单行输入框（包含自动提示功能）</li>
                  <li>下拉菜单</li>
                  <li>多选标签</li>
                  <li>Date 选择器（包含区间选择）</li>
                  <li>Time 选择器（包含区间选择）</li>
                  <li>DateTime 选择器（包含区间选择）</li>
                  <li>数值区间选择器</li>
                </ul>
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </mn-section>

        <mn-section>
          <mn-card>
            <mn-card-item><h5>列表条件区域的开发要求</h5></mn-card-item>
            <mn-card-item>
              <mn-card-body>
                <p>管理系统的筛选条件应实时反映在 URL 上，应该通过添加 Query 的形式实现 URL 的可找回性、重新加载性。</p>
                <p>当重新发生这些时，URL 是有记录的。</p>
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </mn-section>
      </mw-container>
    </mn-scroller>
  </mn-page>
</template>

<script>
  export default {
  }
</script>
