export const instrumentationObservabilityLesson = {
  id: 'instrumentation-observability',
  number: '18',
  title: 'Instrumentation 与生产监控',
  level: '实践',
  summary: '使用 instrumentation.ts 接入监控、日志、追踪和运行时初始化逻辑。',
  methods: [
    {
      title: 'instrumentation.ts 约定',
      detail:
        '在项目根目录或 src 下创建 instrumentation.ts，并导出 register 函数。新的 Next.js 服务实例启动时会调用它。',
    },
    {
      title: 'OpenTelemetry',
      detail:
        'Instrumentation 常用于接入 OpenTelemetry，把请求、数据库、外部 API 调用串成 trace，定位生产性能瓶颈。',
    },
    {
      title: '运行时区分',
      detail:
        '服务端、边缘运行时和浏览器环境能力不同。初始化监控时应按 runtime 拆分依赖，避免把 Node-only 包带到不支持的环境。',
    },
    {
      title: '日志关联',
      detail:
        '生产日志应该关联 request id、user id、trace id 等上下文，单条孤立日志很难排查真实问题。',
    },
  ],
  examples: [
    {
      title: '注册 OpenTelemetry',
      language: 'ts',
      code: `// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { registerOTel } = await import('@vercel/otel');
    registerOTel({ serviceName: 'nextjs-practice-lab' });
  }
}`,
    },
  ],
  review: [
    {
      question: 'instrumentation.ts 的 register 什么时候执行？',
      answer:
        '它会在新的 Next.js 服务实例初始化时执行，并且需要在服务开始处理请求前完成。',
    },
    {
      question: '为什么监控初始化要避免无条件导入所有包？',
      answer:
        '不同 runtime 支持能力不同。无条件导入 Node-only 包可能让边缘运行时或构建阶段失败。',
    },
    {
      question: 'Trace 相比普通日志多提供什么价值？',
      answer:
        'Trace 能串联一次请求经过的多个服务、数据库和外部 API 调用，帮助定位慢点和错误来源。',
    },
    {
      question: '生产日志为什么要带 request id？',
      answer:
        'request id 可以把同一次请求产生的多条日志关联起来，排查并发问题时更容易定位链路。',
    },
    {
      question: '监控代码为什么也需要控制成本？',
      answer:
        '过多采样、同步上报或大日志会增加延迟和费用。生产监控应权衡可见性、性能和成本。',
    },
  ],
};
