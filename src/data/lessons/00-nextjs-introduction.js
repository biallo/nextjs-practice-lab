export const nextjsIntroductionLesson = {
  id: 'nextjs-introduction',
  number: '01',
  title: '认识 Next.js',
  level: '入门',
  summary: '建立 Next.js 的整体定位：它是基于 React 的全栈框架，运行在 Node.js 生态中。',
  methods: [
    {
      title: 'Next.js 的定位',
      detail:
        'Next.js 更准确地说是 React 框架。它用 React 组织界面，同时补上路由、渲染、数据获取、构建优化和部署约定，让项目从组件库变成完整应用。',
    },
    {
      title: 'React 与 Node.js 的关系',
      detail:
        '写页面、组件和交互时，你主要在写 React；开发服务端渲染、Route Handlers、Server Actions 或构建流程时，代码通常会运行在 Node.js 或平台提供的服务端运行时中。',
    },
    {
      title: '学习主线',
      detail:
        '先理解 App Router 的文件系统路由，再区分 Server Components 与 Client Components，随后学习数据获取、表单提交、缓存、性能和部署限制。',
    },
  ],
  examples: [
    {
      title: '一个最小 Next.js 页面',
      language: 'tsx',
      code: `// app/page.tsx
export default function HomePage() {
  return (
    <main>
      <h1>Next.js Practice Lab</h1>
      <p>这是一个由 React 组件组成的页面。</p>
    </main>
  );
}`,
    },
    {
      title: '一个服务端接口',
      language: 'ts',
      code: `// app/api/health/route.ts
export function GET() {
  return Response.json({
    ok: true,
    framework: 'Next.js',
  });
}`,
    },
  ],
  review: [
    {
      question: 'Next.js 是 Node.js 框架还是 React 框架？',
      answer:
        'Next.js 首先是 React 框架，因为页面和交互建立在 React 之上；但它的开发、构建和很多服务端能力会运行在 Node.js 生态或类似的服务端运行时里。',
    },
    {
      question: '为什么只会 React 还不等于会 Next.js？',
      answer:
        'React 主要解决组件和界面状态；Next.js 还要求你理解路由、服务端组件、数据获取、缓存、构建输出和部署平台限制。',
    },
    {
      question: '学习 Next.js 时应该先抓住哪条主线？',
      answer:
        '先抓住“文件决定路由、组件决定渲染位置、数据获取决定缓存行为”这条主线，再逐步补上表单、鉴权、性能和部署。',
    },
  ],
};
