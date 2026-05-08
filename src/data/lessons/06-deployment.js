export const deploymentLesson = {
    id: 'deployment',
    title: '静态导出与部署',
    level: '实践',
    summary: '理解静态站点、动态能力限制和 Pages 部署路径。',
    methods: [
      {
        title: '静态产物',
        detail:
          '静态学习项目可以构建成 HTML、CSS、JS 和本地资源，部署到 GitHub Pages、Vercel 或任意静态服务器。',
      },
      {
        title: '路径兼容',
        detail:
          '项目页通常部署在 /repo-name/ 子路径下，资源引用要使用相对路径或配置构建 base。',
      },
      {
        title: '部署检查',
        detail:
          '上线前至少检查构建命令、资源路径、移动端布局和浏览器控制台错误。',
      },
    ],
    examples: [
      {
        title: 'Vite 项目适配 GitHub Pages 子路径',
        language: 'js',
        code: `// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/nextjs-practice-lab/',
  plugins: [react()],
}));

// package.json
{
  "scripts": {
    "build": "vite build" // GitHub Actions 上传 dist 目录
  }
}`,
      },
    ],
    review: [
      {
        question: '为什么 GitHub Pages 项目站点要关注 base 路径？',
        answer:
          '项目站点通常不在域名根路径，而是在 /仓库名/ 下。如果资源使用绝对根路径，部署后可能加载不到 CSS、JS 或图标。',
      },
      {
        question: '部署前最少应该验证哪些内容？',
        answer:
          '验证 npm run build 成功、dist 中资源路径包含仓库 base、移动端不溢出、控制台没有运行时错误。',
      },
      {
        question: '为什么本地开发可以用 /，生产构建却用 /nextjs-practice-lab/？',
        answer:
          '本地开发通常运行在域名根路径；GitHub Pages 项目站点部署在仓库名子路径下。按命令切换 base 可以兼顾本地体验和线上资源路径。',
      },
      {
        question: '静态导出适合哪些类型的学习项目？',
        answer:
          '适合主要由 HTML、CSS、JS 和本地静态资源组成的项目，例如课程浏览、交互练习、文档站和无需服务端运行时的数据展示。',
      },
      {
        question: '如果以后加入真实后端 API，部署检查需要增加什么？',
        answer:
          '需要检查 API 地址、跨域策略、环境变量、错误处理、加载状态以及生产环境是否允许前端访问这些接口。',
      },
    ],
  };
