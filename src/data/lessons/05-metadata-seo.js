export const metadataSeoLesson = {
    id: 'metadata-seo',
    title: 'Metadata、Icons 与 SEO',
    level: '基础',
    summary: '配置标题、描述、Open Graph 和应用图标。',
    methods: [
      {
        title: '静态 metadata',
        detail:
          '在 layout 或 page 中导出 metadata 对象，定义 title、description、openGraph 等常见 SEO 信息。',
      },
      {
        title: '动态 metadata',
        detail:
          '详情页可用 generateMetadata 根据路由参数读取数据，生成与内容匹配的标题和分享图。',
      },
      {
        title: '文件约定',
        detail:
          'favicon.ico、icon.png、apple-icon.png 等文件可以放在 app 目录中，由 Next.js 自动注入 head。',
      },
    ],
    examples: [
      {
        title: '为文章页生成动态 metadata',
        language: 'tsx',
        code: `export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [post.cover], // 社交平台分享时使用的预览图
    },
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}`,
      },
    ],
    review: [
      {
        question: 'metadata 对象通常放在哪里？',
        answer:
          '可以放在 layout 或 page 中。layout 适合全局或某个分区共享信息，page 适合具体页面信息。',
      },
      {
        question: 'generateMetadata 适合什么场景？',
        answer:
          '适合依赖路由参数或远程数据生成标题、描述、分享图的详情页。',
      },
      {
        question: 'metadata 放在 layout 和 page 中有什么取舍？',
        answer:
          'layout 适合放站点级或分区级默认信息；page 适合放具体页面的标题、描述和社交分享信息。',
      },
      {
        question: 'Open Graph 图片为什么需要和内容匹配？',
        answer:
          '它会影响社交平台分享预览。如果图片和标题、页面内容不匹配，用户点击预期会变差，也会降低内容识别度。',
      },
      {
        question: 'Next.js 的图标文件约定能减少哪些手动工作？',
        answer:
          '把 favicon、icon、apple icon 等放到约定位置后，Next.js 可以自动生成对应 head 标签，减少路径和尺寸配置错误。',
      },
    ],
  };
