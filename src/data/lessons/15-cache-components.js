export const cacheComponentsLesson = {
  id: 'cache-components',
  number: '16',
  title: 'Cache Components 与 use cache',
  level: '进阶',
  summary: '学习 Next.js 16 的 Cache Components、use cache、cacheLife、cacheTag 和 updateTag。',
  methods: [
    {
      title: 'Cache Components',
      detail:
        '开启 cacheComponents 后，Next.js 会把可预渲染的静态 shell 和需要请求时完成的动态区域组合起来。动态区域必须用 Suspense 或 use cache 明确处理。',
    },
    {
      title: 'use cache',
      detail:
        'use cache 可以标记组件、函数或文件级作用域，把结果缓存起来。参数和闭包值会参与缓存 key，因此不同输入得到不同缓存项。',
    },
    {
      title: 'cacheLife',
      detail:
        'cacheLife 用于描述缓存生命周期，可以使用 hours、days、weeks 等 profile，也可以自定义 stale、revalidate、expire。',
    },
    {
      title: 'cacheTag 与 updateTag',
      detail:
        'cacheTag 给缓存结果打标签。Server Action 写入后可用 updateTag 立即刷新，或用 revalidateTag 做 stale-while-revalidate。',
    },
  ],
  examples: [
    {
      title: '缓存课程目录并在写入后刷新',
      language: 'tsx',
      code: `// next.config.ts
export default {
  cacheComponents: true,
};

// app/courses/list.tsx
import { cacheLife, cacheTag, updateTag } from 'next/cache';

export async function CourseList() {
  'use cache';
  cacheLife('hours');
  cacheTag('courses');

  const courses = await db.course.findMany();
  return courses.map((course) => <p key={course.id}>{course.title}</p>);
}

export async function createCourse(formData) {
  'use server';
  await db.course.create({ data: { title: String(formData.get('title')) } });
  updateTag('courses'); // 写入后让课程缓存立即过期
}`,
    },
  ],
  review: [
    {
      question: 'Cache Components 解决了什么取舍问题？',
      answer:
        '它让同一路由中可以组合静态 shell、缓存内容和请求时动态内容，不必在整页静态和整页动态之间二选一。',
    },
    {
      question: 'use cache 的缓存 key 和什么有关？',
      answer:
        '和函数或组件的参数、闭包捕获值等输入有关。不同输入会生成不同缓存项，因此可以缓存参数化内容。',
    },
    {
      question: 'cacheLife 和旧的 revalidate 配置有什么关系？',
      answer:
        '在 Cache Components 模型中，更推荐用 cacheLife 描述缓存生命周期，而不是依赖路由段级 revalidate。',
    },
    {
      question: 'updateTag 和 revalidateTag 的差异是什么？',
      answer:
        'updateTag 更适合写入后立即刷新当前相关数据；revalidateTag 更适合允许短暂旧数据、后台重新验证的场景。',
    },
    {
      question: '为什么 runtime data 不能直接和 use cache 放在同一作用域？',
      answer:
        'cookies、headers、searchParams 等依赖具体请求。缓存作用域应接收抽取后的稳定参数，避免把请求上下文错误缓存给其他用户。',
    },
    {
      question: '未缓存动态数据为什么需要 Suspense？',
      answer:
        'Suspense 明确了动态内容的等待边界，让静态 shell 可以先返回，动态内容再在请求时流式填充。',
    },
  ],
};
