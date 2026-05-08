export const productionQualityLesson = {
  id: 'production-quality',
  title: '生产质量、可观测性与维护',
  level: '实践',
  summary: '建立上线前检查、错误边界、性能指标、环境配置和测试策略，避免只会写 demo。',
  methods: [
    {
      title: '错误边界',
      detail:
        'error.tsx、not-found.tsx 和全局错误页可以把失败限制在局部范围内，并给用户可恢复的操作入口。',
    },
    {
      title: '性能指标',
      detail:
        '关注 LCP、CLS、INP、包体积和服务端响应时间。优化应基于指标，而不是凭感觉改代码。',
    },
    {
      title: '环境配置',
      detail:
        '区分构建时变量、服务端运行时变量和暴露给浏览器的 NEXT_PUBLIC 变量，避免泄露 secret。',
    },
    {
      title: '测试与发布检查',
      detail:
        '至少覆盖关键页面渲染、核心交互、表单提交和部署构建。发布前检查 console、网络请求和移动端布局。',
    },
  ],
  examples: [
    {
      title: '局部错误恢复',
      language: 'tsx',
      code: `// app/dashboard/error.tsx
'use client';

export default function DashboardError({ error, reset }) {
  return (
    <section>
      <h2>仪表盘加载失败</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>重试</button>
    </section>
  );
}

// app/dashboard/not-found.tsx
export default function DashboardNotFound() {
  return <p>没有找到这个仪表盘资源。</p>;
}`,
    },
  ],
  review: [
    {
      question: 'error.tsx 为什么通常需要 use client？',
      answer:
        '错误边界需要在客户端提供 reset 等交互恢复能力，因此 error.tsx 通常是 Client Component。',
    },
    {
      question: 'not-found.tsx 和 error.tsx 的语义区别是什么？',
      answer:
        'not-found 表示资源不存在或主动调用 notFound；error 表示渲染或数据过程中的异常失败。',
    },
    {
      question: '为什么 NEXT_PUBLIC 变量要谨慎使用？',
      answer:
        'NEXT_PUBLIC 变量会进入浏览器包，任何用户都能看到。secret、数据库地址、私钥都不应加这个前缀。',
    },
    {
      question: '性能优化为什么要先看指标？',
      answer:
        '没有指标容易优化错方向。LCP、CLS、INP、包体积和响应时间能帮助定位真正影响用户体验的瓶颈。',
    },
    {
      question: '一个 Next.js 项目上线前至少要检查什么？',
      answer:
        '检查构建、关键页面、移动端、资源路径、环境变量、错误状态、控制台报错和核心交互是否正常。',
    },
  ],
};
