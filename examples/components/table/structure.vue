<template>
  <mn-page>
    <mn-scroller>
      <mw-container>
        <mn-section>
          <mw-crumb></mw-crumb>
        </mn-section>

        <mn-section>
          <mn-card>
            <mn-card-item><h5>如何做搜索参数与 url 同步</h5></mn-card-item>
            <mn-card-item>
              <mn-card-body>
                <img src="../../assets/how-to-render-href-and-watch-query.jpg" style="display: block; width: 100%; max-width: 800px; margin-bottom: 1rem;">
                <ol>
                  <li>搜索参数均存储在 url query 值内，监听路由的 query 变化，每次改变时，解析 $route.query，将获得的值与默认参数合并，并将 Models 修改。</li>
                  <li>Models 修改后，会触发对组件的重新渲染，就会产生新的 url。</li>
                  <li>建议通过超链接的形式让用户触发，而非通过 JS 和 Vue 事件的方式让用户触发，<strong>这样有助于用户选择是当前标签页打开或新建标签打开</strong>，实现游览器对于超链接的人机交互的优化。</li>
                  <li>各项搜索参数、排序值、页码等数据应该是在 url 中可记录并且是可追回的，这样帮助用户保存他们的搜索条件，随意翻看、新建窗口等操作。</li>
                </ol>
              </mn-card-body>
            </mn-card-item>
          </mn-card>
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
      </mw-container>
    </mn-scroller>
  </mn-page>
</template>

<script>
  export default {
  }
</script>
