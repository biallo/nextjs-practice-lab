export const formUxLesson = {
  id: 'form-ux',
  number: '18',
  title: '表单体验进阶',
  level: '实践',
  summary: '用 Server Actions、useActionState、useFormStatus 和乐观 UI 处理真实表单体验。',
  methods: [
    {
      title: 'useActionState',
      detail:
        'useActionState 让 Server Action 返回状态给表单组件，适合展示字段错误、全局错误和提交成功信息。',
    },
    {
      title: 'useFormStatus',
      detail:
        'useFormStatus 读取最近父级 form 的 pending 状态，适合禁用提交按钮和显示提交中反馈。',
    },
    {
      title: '服务端校验返回',
      detail:
        '表单校验应在服务端完成，并把结构化错误返回给 UI。不要只依赖 HTML required 或客户端校验。',
    },
    {
      title: '乐观更新',
      detail:
        '对低风险、可回滚的交互，可以先更新 UI，再等待服务端确认。失败时要清晰回滚或提示。',
    },
  ],
  examples: [
    {
      title: '提交课程并显示 pending',
      language: 'tsx',
      code: `'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? '提交中' : '创建课程'}</button>;
}

export function CourseForm({ createCourse }) {
  const [state, action] = useActionState(createCourse, { error: null });

  return (
    <form action={action}>
      <input name="title" aria-invalid={Boolean(state.error)} />
      {state.error ? <p>{state.error}</p> : null}
      <SubmitButton />
    </form>
  );
}`,
    },
  ],
  review: [
    {
      question: 'useActionState 适合解决什么表单问题？',
      answer:
        '它把 action 的返回结果连接到组件状态，适合展示服务端校验错误、成功状态和下一次提交所需的上下文。',
    },
    {
      question: 'useFormStatus 为什么通常放在提交按钮组件里？',
      answer:
        '它读取最近父级 form 的提交状态，放在按钮组件中可以局部禁用按钮、切换文字和显示 loading。',
    },
    {
      question: '为什么服务端仍要校验字段？',
      answer:
        '用户可以绕过客户端校验直接提交请求。服务端校验是数据一致性和安全性的最后边界。',
    },
    {
      question: '乐观更新适合哪些交互？',
      answer:
        '适合点赞、收藏、排序这类失败概率低且容易回滚的操作；支付、权限修改等高风险操作不适合轻率乐观更新。',
    },
    {
      question: 'pending 状态除了禁用按钮还能做什么？',
      answer:
        '可以防止重复提交、展示进度、保持输入稳定、给屏幕阅读器提供状态提示。',
    },
  ],
};
