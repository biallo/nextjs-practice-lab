export const serverActionsLesson = {
    id: 'server-actions',
    number: '05',
    title: 'Server Actions 与表单提交',
    level: '进阶',
    summary: '用服务端函数处理变更、校验输入并刷新缓存。',
    methods: [
      {
        title: '服务端变更入口',
        detail:
          'Server Action 用 use server 标记，可以被表单或客户端组件调用，适合创建、更新、删除等写操作。',
      },
      {
        title: '渐进增强',
        detail:
          '表单 action 指向 Server Action 时，即使客户端 JavaScript 尚未加载，浏览器也能完成提交。',
      },
      {
        title: '缓存失效',
        detail:
          '写入成功后使用 revalidatePath 或 revalidateTag，让相关页面和数据重新获取。',
      },
    ],
    examples: [
      {
        title: '提交表单并刷新课程列表',
        language: 'tsx',
        code: `// app/courses/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createCourse(formData) {
  const title = String(formData.get('title') || '').trim();
  if (!title) return { error: '课程标题不能为空' };

  await db.course.create({ data: { title } }); // 写操作只在服务端运行
  revalidatePath('/courses'); // 让课程列表读取最新数据
  return { ok: true };
}

// app/courses/new-course-form.tsx
export function NewCourseForm() {
  return (
    <form action={createCourse}>
      <input name="title" />
      <button type="submit">创建课程</button>
    </form>
  );
}`,
      },
    ],
    review: [
      {
        question: 'Server Action 为什么适合处理写操作？',
        answer:
          '它在服务端执行，可以安全访问数据库和私有环境变量，并且能和表单、缓存刷新直接配合。',
      },
      {
        question: 'revalidatePath 的作用是什么？',
        answer:
          '它让指定路径关联的缓存失效，后续访问会重新获取数据并渲染更新后的结果。',
      },
      {
        question: 'Server Action 里的 use server 标记表示什么？',
        answer:
          '它表示该函数在服务端执行，可以作为表单或客户端调用的服务端变更入口，而不是普通浏览器端事件处理函数。',
      },
      {
        question: '为什么表单 action 指向 Server Action 具备渐进增强能力？',
        answer:
          '因为浏览器原生就能提交表单。即使客户端 JavaScript 尚未加载，表单仍可以把数据提交给服务端处理。',
      },
      {
        question: 'Server Action 中为什么仍然要校验 formData？',
        answer:
          'Server Action 是服务端入口，但请求数据仍然来自用户输入，必须在服务端校验必填项、类型、权限和业务规则。',
      },
      {
        question: '什么时候使用 revalidateTag 会比 revalidatePath 更合适？',
        answer:
          '当多个页面共享同一类数据时，用 tag 让相关数据整体失效更灵活；path 更适合明确刷新某个具体路由。',
      },
    ],
  };
