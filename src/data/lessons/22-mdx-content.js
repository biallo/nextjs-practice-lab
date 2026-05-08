export const mdxContentLesson = {
  id: 'mdx-content',
  number: '22',
  title: 'MDX 与内容型站点',
  level: '实践',
  summary: '用 MDX 编写课程、博客和文档内容，并通过组件映射保持统一样式。',
  methods: [
    {
      title: '@next/mdx',
      detail:
        '@next/mdx 让 Next.js 可以处理 .mdx 文件，MDX 可以作为页面、路由内容或被普通组件导入。',
    },
    {
      title: 'mdx-components',
      detail:
        'App Router 使用 MDX 时需要 mdx-components 文件，用于定义全局 HTML 元素和自定义组件映射。',
    },
    {
      title: 'Frontmatter',
      detail:
        '课程标题、描述、标签、发布日期等元数据可以放在 frontmatter 中，再生成目录、SEO 和筛选。',
    },
    {
      title: '插件与兼容',
      detail:
        'remark/rehype 插件可以支持目录、GFM、代码高亮等能力。使用 Turbopack 时要注意插件配置可序列化限制。',
    },
  ],
  examples: [
    {
      title: '配置 MDX 页面',
      language: 'js',
      code: `// next.config.mjs
import createMDX from '@next/mdx';

const withMDX = createMDX({});

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

// mdx-components.tsx
export function useMDXComponents(components) {
  return {
    h2: (props) => <h2 className="section-title" {...props} />,
    ...components,
  };
}`,
    },
  ],
  review: [
    {
      question: 'MDX 相比 Markdown 多了什么能力？',
      answer:
        'MDX 可以在 Markdown 中使用 JSX 和 React 组件，适合课程、文档、交互示例和内容型产品页。',
    },
    {
      question: 'mdx-components 文件的作用是什么？',
      answer:
        '它定义 MDX 渲染时 HTML 元素和自定义组件的映射，让所有 MDX 内容保持统一样式和行为。',
    },
    {
      question: 'Frontmatter 适合保存什么？',
      answer:
        '适合保存标题、摘要、标签、作者、发布日期、排序权重、SEO 信息等内容元数据。',
    },
    {
      question: '为什么远程 MDX 要谨慎？',
      answer:
        'MDX 可以执行组件逻辑。远程内容如果来源不可信，可能带来安全和稳定性风险，应做信任边界和编译隔离。',
    },
    {
      question: '课程项目什么时候适合迁移到 MDX？',
      answer:
        '当课程内容持续增长、需要目录、frontmatter、内嵌组件和非开发人员维护内容时，MDX 会比 JS 对象更适合。',
    },
  ],
};
