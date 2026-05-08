export const proxyRedirectsLesson = {
  id: 'proxy-redirects',
  title: 'Proxy、重写与重定向',
  level: '进阶',
  summary: '理解 Next.js 16 中 Proxy 的定位，以及何时使用 redirects、rewrites 和请求前逻辑。',
  methods: [
    {
      title: 'Proxy 的位置',
      detail:
        'Proxy 在路由渲染前运行，适合根据请求信息做重定向、重写、实验分流或轻量请求头处理。',
    },
    {
      title: '最后手段原则',
      detail:
        '简单静态跳转优先用 next.config 的 redirects。只有需要读取请求信息或复杂逻辑时，才使用 Proxy。',
    },
    {
      title: '不要做慢数据获取',
      detail:
        'Proxy 不适合完整鉴权查询、慢接口调用或复杂业务逻辑。它在请求链路前方，过重会拖慢所有命中请求。',
    },
    {
      title: '传递上下文',
      detail:
        'Proxy 和应用渲染代码之间应通过 headers、cookies、rewrite、redirect 或 URL 传递信息，不要依赖共享全局状态。',
    },
  ],
  examples: [
    {
      title: '基于登录态的轻量跳转',
      language: 'ts',
      code: `// proxy.ts
import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // 限制命中范围，避免影响全站请求
};`,
    },
  ],
  review: [
    {
      question: 'Next.js 16 为什么把 Middleware 改名为 Proxy？',
      answer:
        'Proxy 更准确表达它位于应用前方、处理请求边界的角色，也减少和 Express middleware 这类概念混淆。',
    },
    {
      question: '什么场景优先使用 redirects 配置而不是 Proxy？',
      answer:
        '固定路径跳转、旧 URL 到新 URL 的迁移、无需读取请求上下文的跳转，应优先用 redirects 配置。',
    },
    {
      question: 'Proxy 为什么不适合做完整 session 管理？',
      answer:
        '完整 session 管理通常需要数据库或外部服务查询，会拖慢请求前链路。Proxy 更适合快速检查和路由级跳转。',
    },
    {
      question: 'matcher 的作用是什么？',
      answer:
        'matcher 限制 Proxy 只作用于特定路径，减少不必要执行，避免静态资源或无关页面也进入请求前逻辑。',
    },
    {
      question: 'Proxy 如何把信息传给后续页面？',
      answer:
        '可以通过修改 headers、设置 cookies、rewrite 到带参数的 URL 或直接 redirect；不要依赖内存全局变量。',
    },
  ],
};
