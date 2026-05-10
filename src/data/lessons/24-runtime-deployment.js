export const runtimeDeploymentLesson = {
  id: 'runtime-deployment',
  number: '25',
  title: '运行时与部署限制',
  level: '工程',
  summary: '区分 Node.js runtime、Edge runtime、环境变量、区域部署和平台限制。',
  methods: [
    {
      title: 'Node.js Runtime',
      detail:
        'Node.js runtime 支持完整 Node API，适合数据库驱动、文件系统、复杂服务端逻辑和 Cache Components 相关能力。',
    },
    {
      title: 'Edge Runtime',
      detail:
        'Edge runtime 启动快、靠近用户，但 API 受限，不支持完整 Node.js 模块。适合轻量请求处理和低延迟场景。',
    },
    {
      title: '环境变量阶段',
      detail:
        '构建时变量、服务端运行时变量和 NEXT_PUBLIC 客户端变量的暴露范围不同，错误使用会造成配置缺失或 secret 泄露。',
    },
    {
      title: '平台限制',
      detail:
        '不同平台对函数时长、区域、缓存、文件系统、出站网络和日志有不同限制，部署前要按目标平台验证。',
    },
  ],
  examples: [
    {
      title: '显式选择运行时',
      language: 'ts',
      code: `// app/api/report/route.ts
export const runtime = 'nodejs';

export async function GET() {
  const report = await generateReportWithNodeOnlyLibrary();
  return Response.json(report);
}

// app/api/ping/route.ts
export const runtime = 'edge';

export function GET() {
  return Response.json({ ok: true });
}`,
    },
  ],
  review: [
    {
      question: 'Node.js runtime 适合哪些场景？',
      answer:
        '适合依赖 Node API、数据库驱动、复杂服务端逻辑、长一点的处理流程以及需要完整服务端能力的接口。',
    },
    {
      question: 'Edge runtime 的主要限制是什么？',
      answer:
        '它不支持完整 Node.js API 和部分 npm 包，适合轻量、标准 Web API 能完成的逻辑。',
    },
    {
      question: 'NEXT_PUBLIC 环境变量为什么危险？',
      answer:
        '它会被打进客户端代码，所有用户都能看到，不能放 API key secret、数据库地址、私钥等敏感信息。',
    },
    {
      question: '为什么部署前要确认平台限制？',
      answer:
        '不同平台的函数时长、区域、缓存、文件系统和网络限制不同，本地能跑不代表线上行为一致。',
    },
    {
      question: '什么时候应该显式声明 runtime？',
      answer:
        '当某个路由依赖 Node-only 包，或需要确保轻量 API 运行在 Edge 时，显式声明能避免平台推断带来的不确定性。',
    },
  ],
};
