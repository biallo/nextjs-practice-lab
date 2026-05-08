export const cachingModelLesson = {
  id: 'caching-model',
  number: '16',
  title: 'Next.js 缓存全景',
  level: '核心',
  summary: '区分 Request Memoization、Data Cache、Full Route Cache 和 Router Cache 的职责与失效方式。',
  methods: [
    {
      title: 'Request Memoization',
      detail:
        '同一次服务端渲染生命周期内，相同请求或函数结果可以复用，减少同一组件树中的重复数据读取。',
    },
    {
      title: 'Data Cache',
      detail:
        'Data Cache 存储跨请求、跨部署可复用的数据请求结果，可以通过时间或 tag/path 主动失效。',
    },
    {
      title: 'Full Route Cache',
      detail:
        'Full Route Cache 缓存静态渲染出的 HTML 和 RSC payload，减少服务端重复渲染成本。',
    },
    {
      title: 'Router Cache',
      detail:
        'Router Cache 是浏览器内存中的 RSC payload 缓存，用于提升客户端导航、返回和前进体验。',
    },
  ],
  examples: [
    {
      title: '用 tag 管理数据缓存',
      language: 'tsx',
      code: `async function getPosts() {
  const response = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'], revalidate: 3600 },
  });

  return response.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}`,
    },
  ],
  review: [
    {
      question: 'Request Memoization 的生命周期是什么？',
      answer:
        '它通常只存在于一次服务端渲染过程内，用于避免同一组件树里重复执行相同读取，不是跨用户的持久缓存。',
    },
    {
      question: 'Data Cache 和 Full Route Cache 的区别是什么？',
      answer:
        'Data Cache 缓存数据请求结果；Full Route Cache 缓存已经渲染好的路由结果，包括 HTML 和 RSC payload。',
    },
    {
      question: 'Router Cache 为什么能让返回操作更快？',
      answer:
        '它在客户端内存中保留已访问路由段的 RSC payload，返回时可以复用已有数据和布局状态，减少重新请求。',
    },
    {
      question: 'revalidatePath 会影响哪些缓存？',
      answer:
        '它会让指定路径相关的缓存失效，后续访问重新获取数据并重新渲染相关路由输出。',
    },
    {
      question: '为什么理解缓存层级很重要？',
      answer:
        '因为“数据更新了但页面没变”可能发生在不同缓存层。只有知道层级，才能选择正确的失效 API。',
    },
  ],
};
