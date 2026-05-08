export const appRouterLesson = {
    id: 'app-router',
    title: 'App Router 与项目结构',
    level: '基础',
    summary: '理解 app 目录、layout、page、嵌套路由和路由组的协作方式。',
    methods: [
      {
        title: '文件系统路由',
        detail:
          'App Router 使用目录表达 URL。每个路由段用文件夹表示，页面入口是 page.jsx，公共外壳是 layout.jsx。layout 会包裹子路由并在导航时保持状态。',
      },
      {
        title: '路由组',
        detail:
          '用括号目录如 (dashboard) 组织代码，不会改变 URL。它适合把营销页、控制台、认证页拆成清晰模块。',
      },
      {
        title: '加载与错误边界',
        detail:
          'loading.jsx 会自动包住当前路由段的异步内容，error.jsx 提供局部错误恢复，不必让整个应用崩掉。',
      },
    ],
    examples: [
      {
        title: '最小 App Router 结构',
        language: 'tsx',
        code: `// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <section className="dashboard-shell">
      <aside>{/* 侧栏会在子页面切换时保留状态 */}</aside>
      <main>{children}</main>
    </section>
  );
}

// app/dashboard/page.tsx
export default function DashboardPage() {
  return <h1>仪表盘首页</h1>;
}`,
      },
    ],
    review: [
      {
        question: 'layout.jsx 和 page.jsx 的核心区别是什么？',
        answer:
          'page.jsx 是某个 URL 的可访问页面；layout.jsx 是包裹同一路由段及其子路由的共享 UI，并且在子路由导航时尽量保留状态。',
      },
      {
        question: '什么时候使用路由组？',
        answer:
          '当你想按业务域组织目录，但又不想让该目录名出现在 URL 中时使用，例如 app/(marketing)/pricing/page.tsx 对应 /pricing。',
      },
      {
        question: '为什么 layout 在页面切换时适合放导航、侧栏这类共享 UI？',
        answer:
          'layout 会包裹同一路由段下的子页面，导航到子路由时它不会像 page 一样完整替换，因此适合承载需要保留状态的共享 UI。',
      },
      {
        question: 'loading.jsx 和 error.jsx 分别解决什么问题？',
        answer:
          'loading.jsx 处理当前路由段异步内容加载中的反馈；error.jsx 处理局部渲染错误和恢复入口，避免整个应用页面一起崩掉。',
      },
    ],
  };
