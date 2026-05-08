export const bundlePerformanceLesson = {
  id: 'bundle-performance',
  number: '23',
  title: 'Bundle 分析与性能调优',
  level: '工程',
  summary: '用 bundle analyzer、动态导入和客户端边界收敛控制 JavaScript 成本。',
  methods: [
    {
      title: 'Bundle Analyzer',
      detail:
        '@next/bundle-analyzer 可以生成包体积报告，帮助识别大依赖、重复依赖和不该进入客户端包的模块。',
    },
    {
      title: '收窄 Client Component',
      detail:
        'use client 边界越大，发送给浏览器的 JavaScript 越多。把交互组件拆小是最常见的优化手段。',
    },
    {
      title: '动态导入',
      detail:
        '对重型编辑器、图表、地图等非首屏模块，可以用动态导入延迟加载，降低首屏 JS。',
    },
    {
      title: '按指标优化',
      detail:
        '性能优化应围绕 LCP、CLS、INP、TTFB 和包体积报告，而不是单纯追求更少代码行。',
    },
  ],
  examples: [
    {
      title: '按需加载重型图表',
      language: 'tsx',
      code: `'use client';

import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./heavy-chart'), {
  loading: () => <p>图表加载中...</p>,
  ssr: false,
});

export function AnalyticsPanel() {
  return <HeavyChart />;
}`,
    },
  ],
  review: [
    {
      question: 'Bundle Analyzer 能帮助发现什么？',
      answer:
        '它能显示各模块和依赖的体积，帮助定位大依赖、重复打包、误进入客户端包的服务端库。',
    },
    {
      question: '为什么 use client 边界越小越好？',
      answer:
        '边界越小，浏览器需要下载、解析和执行的 JavaScript 越少，首屏和交互性能通常越好。',
    },
    {
      question: 'dynamic import 适合哪些模块？',
      answer:
        '适合非首屏、体积大、只在特定交互后才需要的模块，例如编辑器、地图、图表、复杂可视化。',
    },
    {
      question: 'ssr: false 有什么代价？',
      answer:
        '它会让组件只在客户端渲染，可能影响首屏内容、SEO 和加载体验，应只用于确实依赖浏览器 API 的组件。',
    },
    {
      question: '为什么性能优化要结合真实指标？',
      answer:
        '包体积只是因素之一。用户体验还受网络、渲染、布局稳定性和交互延迟影响，应结合指标判断优先级。',
    },
  ],
};
