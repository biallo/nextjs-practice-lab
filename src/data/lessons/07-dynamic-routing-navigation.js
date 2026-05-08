export const dynamicRoutingNavigationLesson = {
  id: 'dynamic-routing-navigation',
  title: '动态路由与导航',
  level: '核心',
  summary: '掌握动态段、generateStaticParams、Link、redirect、notFound 和路由参数传递。',
  methods: [
    {
      title: '动态路由段',
      detail:
        '用 [slug]、[id] 表达动态 URL。页面组件通过 params 读取路由参数，适合文章详情、商品详情、用户主页等场景。',
    },
    {
      title: '预生成参数',
      detail:
        'generateStaticParams 可以在构建阶段生成一批已知动态路径，让热门内容提前静态化，减少首次访问成本。',
    },
    {
      title: '导航与控制流',
      detail:
        'Link 负责声明式导航，redirect 用于服务端跳转，notFound 用于进入 404 边界。它们比手动拼 history 更贴合 App Router。',
    },
    {
      title: '搜索参数',
      detail:
        'searchParams 适合承载排序、筛选、分页等 URL 状态。读取它可能影响渲染策略，应避免把所有 UI 状态都塞进查询串。',
    },
  ],
  examples: [
    {
      title: '动态文章页与缺失内容处理',
      language: 'tsx',
      code: `// app/blog/[slug]/page.tsx
import { notFound, redirect } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getPopularPosts();
  return posts.map((post) => ({ slug: post.slug })); // 构建时预生成热门文章
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound(); // 进入当前路由树最近的 not-found.tsx
  if (post.legacyUrl) redirect(post.legacyUrl);

  return <Article post={post} />;
}`,
    },
  ],
  review: [
    {
      question: '[slug] 这类动态段适合解决什么问题？',
      answer:
        '它适合把 URL 中变化的部分映射为参数，例如文章 slug、商品 id、用户 handle，从而用同一个页面组件渲染不同资源。',
    },
    {
      question: 'generateStaticParams 的价值是什么？',
      answer:
        '它可以提前生成已知动态路径，适合热门内容、稳定内容或可以枚举的资源，减少线上首次请求的渲染压力。',
    },
    {
      question: 'redirect 和 notFound 为什么比返回普通 JSX 更合适？',
      answer:
        '它们是路由级控制流，会让 Next.js 正确处理跳转、状态码和边界 UI，而不是只在页面里展示一段错误提示。',
    },
    {
      question: 'searchParams 适合存放哪些状态？',
      answer:
        '适合可分享、可恢复、影响数据查询的状态，例如排序、筛选、分页；不适合存放临时 hover、弹窗展开等纯 UI 状态。',
    },
    {
      question: '为什么动态路由仍然需要考虑 404 体验？',
      answer:
        '动态 URL 可能来自旧链接、用户手动输入或已删除资源。明确 notFound 能让用户看到一致的缺失页面，并给搜索引擎正确信号。',
    },
  ],
};
