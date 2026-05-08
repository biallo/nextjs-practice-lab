export const renderingStreamingLesson = {
  id: 'rendering-streaming',
  title: '渲染策略、Streaming 与 Suspense',
  level: '进阶',
  summary: '理解静态渲染、动态渲染、Streaming、Suspense，以及实验性的 Partial Prerendering。',
  methods: [
    {
      title: '静态与动态渲染',
      detail:
        '静态渲染适合可缓存内容，动态渲染适合依赖请求时数据的页面。cookies、headers、no-store 等会让页面更偏动态。',
    },
    {
      title: 'Streaming',
      detail:
        'Streaming 允许服务端分块发送 UI。用户可以先看到页面骨架，再等待慢数据区域逐步填充。',
    },
    {
      title: 'Suspense 边界',
      detail:
        'Suspense 不是让组件自动变动态，而是定义等待边界。合理的 fallback 能降低慢请求对整页体验的影响。',
    },
    {
      title: 'Partial Prerendering',
      detail:
        'PPR 试图把静态 shell 和动态洞组合在一个路由里。它很有价值，但仍要关注版本和实验状态，不要盲目用于生产。',
    },
  ],
  examples: [
    {
      title: '用 Suspense 隔离慢数据区域',
      language: 'tsx',
      code: `// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <main>
      <Overview /> {/* 静态或快数据区域可以先渲染 */}
      <Suspense fallback={<RevenueChartSkeleton />}>
        <RevenueChart />
      </Suspense>
    </main>
  );
}

async function RevenueChart() {
  const data = await getSlowRevenueData();
  return <Chart data={data} />;
}`,
    },
  ],
  review: [
    {
      question: '静态渲染和动态渲染的核心区别是什么？',
      answer:
        '静态渲染可以提前生成并缓存共享结果；动态渲染在请求到来时根据请求数据生成结果，适合个性化和实时内容。',
    },
    {
      question: 'Streaming 改善的是哪类体验问题？',
      answer:
        '它减少慢数据阻塞整页展示的问题，让页面可先显示可用部分，再逐步填充慢区域。',
    },
    {
      question: 'Suspense fallback 应该如何设计？',
      answer:
        'fallback 应该占据稳定空间并表达加载状态，避免布局跳动；不要用过大的说明文字干扰主要任务。',
    },
    {
      question: '为什么使用 cookies 或 headers 会影响渲染策略？',
      answer:
        '它们依赖请求上下文，不同用户可能得到不同结果，因此页面无法简单使用一份共享静态缓存。',
    },
    {
      question: 'PPR 的核心思想是什么？',
      answer:
        '把可静态缓存的页面 shell 先发给用户，把动态内容作为 Suspense 边界内的洞在请求时流式填充。',
    },
    {
      question: '为什么 PPR 相关能力需要关注版本状态？',
      answer:
        '它涉及渲染模型和缓存行为，部分版本里仍属于实验或渐进采用能力，生产使用前要确认当前 Next.js 版本文档和限制。',
    },
  ],
};
