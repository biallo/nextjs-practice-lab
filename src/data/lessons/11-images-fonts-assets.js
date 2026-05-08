export const imagesFontsAssetsLesson = {
  id: 'images-fonts-assets',
  number: '11',
  title: '图片、字体与静态资源优化',
  level: '基础',
  summary: '使用 next/image、next/font 和 public 目录管理页面性能、视觉稳定性和资源路径。',
  methods: [
    {
      title: 'Image 组件',
      detail:
        'next/image 提供尺寸约束、懒加载和格式优化。明确 width、height 或 fill 能减少布局偏移。',
    },
    {
      title: '远程图片白名单',
      detail:
        '加载远程图片前要在 next.config 中配置允许的来源，避免任意外链图片进入优化管线。',
    },
    {
      title: '字体优化',
      detail:
        'next/font 会在构建时处理字体，减少外部请求和布局闪动。品牌字体和正文备用字体都要考虑加载体验。',
    },
    {
      title: 'public 目录',
      detail:
        'public 适合 favicon、manifest、下载文件和无需打包处理的静态资源。路径从站点根开始引用。',
    },
  ],
  examples: [
    {
      title: '图片和字体的基础使用',
      language: 'tsx',
      code: `// app/layout.tsx
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}

export function CourseCover() {
  return (
    <Image
      src="/covers/app-router.png"
      alt="App Router course cover"
      width={960}
      height={540}
      priority
    />
  );
}`,
    },
  ],
  review: [
    {
      question: '为什么 Image 组件需要明确尺寸？',
      answer:
        '明确尺寸让浏览器提前预留空间，减少图片加载后造成的布局偏移，也便于生成合适的响应式图片。',
    },
    {
      question: '什么时候使用 priority？',
      answer:
        '首屏关键图片、LCP 图片可以使用 priority；列表中的普通图片不应滥用，否则会抢占网络资源。',
    },
    {
      question: '远程图片为什么要配置来源？',
      answer:
        '这是安全和性能边界。只允许可信域名进入图片优化流程，避免不可控外部资源影响应用。',
    },
    {
      question: 'next/font 相比直接引用外部 CSS 有什么优势？',
      answer:
        '它可以在构建时处理字体，减少运行时外部请求，并通过自动优化降低字体加载导致的布局闪动。',
    },
    {
      question: 'public 目录适合放什么？',
      answer:
        '适合无需经过打包器处理、需要稳定 URL 的文件，例如 favicon、manifest、robots、下载资源、示例图片等。',
    },
  ],
};
