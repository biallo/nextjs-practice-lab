export const parallelInterceptingRoutesLesson = {
  id: 'parallel-intercepting-routes',
  title: '并行路由与拦截路由',
  level: '进阶',
  summary: '使用 slots、modal 路由和拦截路由组织复杂界面，避免把所有状态塞进单个页面组件。',
  methods: [
    {
      title: '并行路由 slots',
      detail:
        '用 @slot 目录让同一 layout 同时渲染多个独立区域，例如 dashboard 同时显示详情、活动流和弹窗。',
    },
    {
      title: 'default.tsx',
      detail:
        '当某个 slot 当前没有匹配内容时，default.tsx 提供兜底 UI，避免刷新或直接访问时出现缺失区域。',
    },
    {
      title: '拦截路由',
      detail:
        '拦截路由可以在当前上下文中展示另一个路由，例如列表页点击图片时以 modal 打开详情，但直接访问仍是完整页面。',
    },
    {
      title: 'URL 驱动 UI',
      detail:
        '复杂弹窗、详情抽屉和多区域布局如果由 URL 驱动，刷新、分享和返回按钮行为会更可靠。',
    },
  ],
  examples: [
    {
      title: '用并行路由承载 modal',
      language: 'tsx',
      code: `// app/photos/layout.tsx
export default function PhotosLayout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

// app/photos/@modal/default.tsx
export default function DefaultModal() {
  return null; // 没有 modal 匹配时保持页面干净
}

// app/photos/@modal/(.)[id]/page.tsx
export default function PhotoModal({ params }) {
  return <Modal photoId={params.id} />;
}`,
    },
  ],
  review: [
    {
      question: '并行路由解决了什么布局问题？',
      answer:
        '它允许一个 layout 同时渲染多个独立路由区域，适合复杂工作台、弹窗、详情栏等并列 UI。',
    },
    {
      question: 'default.tsx 为什么重要？',
      answer:
        '它为 slot 没有匹配路由时提供兜底内容，避免直接刷新或访问某些 URL 时并行区域缺失导致错误。',
    },
    {
      question: '拦截路由适合什么交互？',
      answer:
        '适合在当前页面上下文中打开另一个路由，例如图片详情 modal、购物车抽屉、列表中的详情预览。',
    },
    {
      question: 'modal 为什么也应该考虑 URL？',
      answer:
        'URL 驱动的 modal 可以刷新恢复、分享链接、正确响应浏览器返回，比纯本地 state 更可靠。',
    },
    {
      question: '什么时候不需要并行或拦截路由？',
      answer:
        '简单页面切换、普通 tab、纯本地展开状态不需要引入复杂路由结构，普通组件状态即可。',
    },
  ],
};
