export const routeHandlersLesson = {
  id: 'route-handlers',
  title: 'Route Handlers 与 API 设计',
  level: '核心',
  summary: '使用 app 目录下的 route.ts 处理 HTTP 请求、Webhook、非 UI 响应和轻量 API。',
  methods: [
    {
      title: 'route.ts 约定',
      detail:
        'Route Handler 写在 app 目录的 route.js 或 route.ts 中，使用 Web Request 和 Response API，不需要再混用 pages/api。',
    },
    {
      title: 'HTTP 方法函数',
      detail:
        '通过导出 GET、POST、PUT、PATCH、DELETE 等函数响应不同方法。方法边界应清晰表达读取、创建、更新和删除。',
    },
    {
      title: '请求体与查询参数',
      detail:
        '可以从 request.json、request.formData、new URL(request.url).searchParams 中读取输入，但服务端仍必须做校验。',
    },
    {
      title: '非 UI 响应',
      detail:
        'Route Handler 适合返回 JSON、RSS、文件、Webhook 响应或流式数据。不要把完整业务后端都塞进前端项目里。',
    },
  ],
  examples: [
    {
      title: '课程 API 与输入校验',
      language: 'ts',
      code: `// app/api/courses/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const level = url.searchParams.get('level');
  const courses = await listCourses({ level }); // 查询参数仍需要校验白名单

  return NextResponse.json({ courses });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (typeof body.title !== 'string' || body.title.trim() === '') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }

  const course = await createCourse({ title: body.title.trim() });
  return NextResponse.json({ course }, { status: 201 });
}`,
    },
  ],
  review: [
    {
      question: 'Route Handler 和 page.tsx 能放在同一个路由段吗？',
      answer:
        '不能在同一层同时放 route.ts 和 page.tsx，因为同一个路由段不能既是 UI 页面又是自定义请求处理器。',
    },
    {
      question: '为什么 Route Handler 使用 Web Request 和 Response API？',
      answer:
        '这让代码更接近标准 Web 平台，也更容易处理 JSON、FormData、Headers、流式响应和边缘运行时相关能力。',
    },
    {
      question: 'POST 处理器为什么必须校验 request body？',
      answer:
        '客户端输入不可信。即使前端表单做了校验，服务端仍要验证类型、必填、长度、权限和业务约束。',
    },
    {
      question: 'Route Handler 适合哪些非页面输出？',
      answer:
        '适合 JSON API、RSS、robots、sitemap、Webhook、文件下载、轻量流式响应等不需要 React 页面渲染的输出。',
    },
    {
      question: '什么时候不应该把逻辑写进 Route Handler？',
      answer:
        '当业务需要复杂队列、长任务、大规模权限系统或独立扩缩容时，应该考虑独立后端服务，而不是把所有能力塞进 Next.js 应用。',
    },
  ],
};
