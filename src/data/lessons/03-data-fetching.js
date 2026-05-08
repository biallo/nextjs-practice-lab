export const dataFetchingLesson = {
    id: 'data-fetching',
    title: '数据获取与缓存',
    level: '核心',
    summary: '学习 fetch 缓存、revalidate、动态渲染和并行请求。',
    methods: [
      {
        title: 'fetch 缓存选项',
        detail:
          'Next.js 扩展了 fetch，可以用 cache 和 next.revalidate 控制静态缓存、增量更新或每次请求都重新获取。',
      },
      {
        title: '并行优先',
        detail:
          '多个互不依赖的数据请求应该先创建 Promise，再一起 await，避免瀑布式等待。',
      },
      {
        title: '动态渲染信号',
        detail:
          '读取 cookies、headers 或设置 cache: no-store 会让路由进入动态渲染，适合用户相关页面。',
      },
    ],
    examples: [
      {
        title: '控制缓存与并行请求',
        language: 'tsx',
        code: `export default async function CoursePage() {
  const coursePromise = fetch('https://api.example.com/course', {
    next: { revalidate: 3600 }, // 最多每小时重新生成一次缓存
  }).then((res) => res.json());

  const notesPromise = fetch('https://api.example.com/notes', {
    cache: 'no-store', // 用户笔记每次请求都读取最新值
  }).then((res) => res.json());

  const [course, notes] = await Promise.all([
    coursePromise,
    notesPromise,
  ]);

  return <CourseView course={course} notes={notes} />;
}`,
      },
    ],
    review: [
      {
        question: 'revalidate: 3600 表示什么？',
        answer:
          '表示该请求的数据最多缓存 3600 秒。超过时间后，下一次访问会触发重新验证并更新缓存。',
      },
      {
        question: '如何避免多个请求形成瀑布？',
        answer: '先启动所有互不依赖的 Promise，再使用 Promise.all 一起等待结果。',
      },
      {
        question: 'cache: no-store 通常适合什么数据？',
        answer:
          '适合用户相关、变化频繁或不能被共享缓存的数据，例如个人笔记、账户状态、实时权限等。',
      },
      {
        question: '读取 cookies 或 headers 为什么可能让页面进入动态渲染？',
        answer:
          '因为这些值依赖每次请求，Next.js 无法只用一份静态缓存满足所有用户，所以会把路由视为动态渲染场景。',
      },
      {
        question: '同一个页面里可以混合缓存数据和实时数据吗？',
        answer:
          '可以，但要明确每个请求的缓存策略。示例中课程内容可以 revalidate，用户笔记用 no-store，二者通过 Promise.all 并行获取。',
      },
      {
        question: '什么时候不应该使用长时间 revalidate？',
        answer:
          '当数据对时效性要求高、权限敏感或错误缓存影响较大时，不应设置过长缓存时间，应缩短 revalidate 或使用 no-store。',
      },
    ],
  };
