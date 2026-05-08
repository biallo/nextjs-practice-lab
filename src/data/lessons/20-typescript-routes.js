export const typescriptRoutesLesson = {
  id: 'typescript-routes',
  number: '20',
  title: 'TypeScript 与类型安全路由',
  level: '工程',
  summary: '使用 Next.js TypeScript 支持、typedRoutes、Route 类型和环境变量类型提示减少低级错误。',
  methods: [
    {
      title: '内置 TypeScript 支持',
      detail:
        'Next.js 可以自动配置 TypeScript，并提供插件辅助 App Router、Server Components 和配置文件类型检查。',
    },
    {
      title: 'typedRoutes',
      detail:
        'typedRoutes 已稳定，可让 Link、router.push、router.replace 等校验静态 href，减少写错路径的问题。',
    },
    {
      title: 'Route 类型',
      detail:
        '非字面量路径可用 Route 类型显式声明或断言，动态拼接路径时要保持类型边界清晰。',
    },
    {
      title: '环境变量类型',
      detail:
        '为 process.env 添加类型能减少拼写错误，但类型不等于运行时校验，生产配置仍需启动时验证。',
    },
  ],
  examples: [
    {
      title: '开启 typedRoutes',
      language: 'ts',
      code: `// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
};

export default nextConfig;

// app/nav.tsx
import Link from 'next/link';

export function Nav() {
  return <Link href="/dashboard">Dashboard</Link>; // 路径拼错会得到类型提示
}`,
    },
  ],
  review: [
    {
      question: 'typedRoutes 主要防什么错误？',
      answer:
        '它防止 Link 或 router 方法里写错静态路径，让不存在的路由在开发期就暴露，而不是上线后 404。',
    },
    {
      question: 'typedRoutes 使用有什么前提？',
      answer:
        '项目需要使用 TypeScript，并在 next.config 中启用 typedRoutes，生成的 .next/types 也要包含在 tsconfig include 中。',
    },
    {
      question: '非字面量动态路径为什么更难类型检查？',
      answer:
        '拼接字符串在编译期无法完全知道最终值。此时需要用 Route 类型、封装路由生成函数或显式断言。',
    },
    {
      question: '类型化环境变量能替代运行时校验吗？',
      answer:
        '不能。类型只能帮助开发阶段提示，生产环境变量可能缺失或格式错误，仍需要启动时校验。',
    },
    {
      question: '为什么 next.config.ts 也值得类型检查？',
      answer:
        '配置项写错会影响构建、路由、图片、缓存等行为。给配置文件加类型可以尽早发现不支持或拼写错误的选项。',
    },
  ],
};
