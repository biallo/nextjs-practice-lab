export const testingStrategyLesson = {
  id: 'testing-strategy',
  number: '21',
  title: '测试策略',
  level: '工程',
  summary: '为 Next.js 项目设计单元测试、组件测试、E2E 测试和服务端入口测试。',
  methods: [
    {
      title: '分层测试',
      detail:
        '纯函数用单元测试，复杂 UI 用组件测试，关键用户路径用 E2E。不要只靠一种测试覆盖所有风险。',
    },
    {
      title: 'Server Action 测试',
      detail:
        'Server Action 本质是服务端函数，应重点测试输入校验、权限判断、写入结果和缓存失效调用。',
    },
    {
      title: 'Route Handler 测试',
      detail:
        'Route Handler 可以通过构造 Request 调用，验证状态码、响应体、错误路径和权限边界。',
    },
    {
      title: 'E2E 冒烟',
      detail:
        '上线前至少跑关键页面访问、表单提交、导航、登录状态和移动端布局检查，覆盖真实浏览器风险。',
    },
  ],
  examples: [
    {
      title: '测试 Route Handler 输入错误',
      language: 'ts',
      code: `import { POST } from './route';

test('rejects empty title', async () => {
  const request = new Request('http://localhost/api/courses', {
    method: 'POST',
    body: JSON.stringify({ title: '' }),
  });

  const response = await POST(request);
  expect(response.status).toBe(400);
});`,
    },
  ],
  review: [
    {
      question: '为什么测试要分层？',
      answer:
        '不同测试成本和反馈速度不同。单元测试快但覆盖面窄，E2E 更真实但慢，组合使用能更有效控制风险。',
    },
    {
      question: 'Server Action 测试重点是什么？',
      answer:
        '重点是服务端输入校验、权限判断、数据写入、副作用和缓存失效，而不是 React 表单展示细节。',
    },
    {
      question: 'Route Handler 为什么适合直接构造 Request 测试？',
      answer:
        '它使用标准 Web Request/Response API，直接调用函数就能验证 HTTP 方法、状态码和响应体。',
    },
    {
      question: 'E2E 测试应该覆盖哪些路径？',
      answer:
        '覆盖登录、核心页面加载、关键表单、导航、错误状态和移动端布局，不必把所有边角逻辑都放进 E2E。',
    },
    {
      question: '为什么构建成功也不等于测试通过？',
      answer:
        '构建只证明代码能打包和类型/语法大致正确，不能证明业务逻辑、权限和用户流程符合预期。',
    },
  ],
};
