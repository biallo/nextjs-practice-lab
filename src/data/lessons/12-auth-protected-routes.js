export const authProtectedRoutesLesson = {
  id: 'auth-protected-routes',
  number: '12',
  title: '认证、会话与受保护路由',
  level: '实践',
  summary: '理解登录态读取、服务端保护、客户端显示状态和安全边界的分工。',
  methods: [
    {
      title: '服务端优先保护',
      detail:
        '真正的权限判断应该在服务端完成。只在客户端隐藏按钮不能保护数据，也不能阻止用户直接请求接口。',
    },
    {
      title: '页面级跳转',
      detail:
        'Server Component 中读取会话后可用 redirect 跳转登录页。这样受保护页面不会先闪一下再跳。',
    },
    {
      title: 'API 级校验',
      detail:
        'Route Handler 和 Server Action 都必须独立校验身份和权限，不能假设页面已经保护过。',
    },
    {
      title: '客户端只做体验',
      detail:
        '客户端状态适合显示用户名、按钮状态、乐观 UI。它不能作为最终权限来源。',
    },
  ],
  examples: [
    {
      title: '服务端保护仪表盘页面',
      language: 'tsx',
      code: `// app/dashboard/page.tsx
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login'); // 服务端直接跳转，避免受保护内容泄露
  }

  const projects = await getProjectsForUser(session.user.id);
  return <Dashboard projects={projects} />;
}`,
    },
  ],
  review: [
    {
      question: '为什么不能只在客户端隐藏受保护按钮？',
      answer:
        '客户端代码和请求都可被用户绕过。隐藏按钮只能改善体验，真正的数据访问必须在服务端验证权限。',
    },
    {
      question: 'Server Component 中 redirect 登录页有什么体验优势？',
      answer:
        '服务端在渲染前就能决定跳转，用户不会先看到受保护页面或加载出错后再跳转。',
    },
    {
      question: 'Route Handler 为什么还要重新校验权限？',
      answer:
        'API 可以被页面外的请求直接访问。每个服务端入口都必须独立验证身份、权限和资源归属。',
    },
    {
      question: '会话信息适合放在哪里读取？',
      answer:
        '关键权限应在服务端读取并验证；客户端可以接收必要的非敏感展示数据，例如用户名或头像。',
    },
    {
      question: 'Proxy 在认证里适合扮演什么角色？',
      answer:
        '适合做轻量路径跳转和粗略登录态检查，不适合承担完整权限查询和复杂 session 生命周期管理。',
    },
  ],
};
