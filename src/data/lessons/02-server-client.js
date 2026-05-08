export const serverClientLesson = {
    id: 'server-client',
    number: '02',
    title: 'Server Components 与 Client Components',
    level: '核心',
    summary: '掌握默认服务端渲染、客户端边界和数据传递约束。',
    methods: [
      {
        title: '默认 Server Component',
        detail:
          'App Router 下组件默认在服务端执行，可以直接读取数据库、文件或私有环境变量，并减少发送到浏览器的 JavaScript。',
      },
      {
        title: 'use client 边界',
        detail:
          '只有需要状态、事件、浏览器 API 或客户端库的组件才加 use client。边界以下的子树会进入客户端包。',
      },
      {
        title: '可序列化 Props',
        detail:
          'Server Component 可以把字符串、数字、对象等可序列化数据传给 Client Component，但不能直接传函数或数据库连接。',
      },
    ],
    examples: [
      {
        title: '把交互收敛到局部客户端组件',
        language: 'tsx',
        code: `// app/products/page.tsx
import FavoriteButton from './favorite-button';

export default async function ProductsPage() {
  const products = await getProducts(); // 在服务端读取数据，不进入浏览器包

  return products.map((product) => (
    <article key={product.id}>
      <h2>{product.name}</h2>
      <FavoriteButton productId={product.id} />
    </article>
  ));
}

// app/products/favorite-button.tsx
'use client';

export default function FavoriteButton({ productId }) {
  return (
    <button onClick={() => saveFavorite(productId)}>
      收藏
    </button>
  );
}`,
      },
    ],
    review: [
      {
        question: '为什么不应该随手给所有组件加 use client？',
        answer:
          '它会扩大客户端 JavaScript 包体积，让原本可以在服务端完成的数据读取和渲染进入浏览器，降低性能和安全边界。',
      },
      {
        question: 'Client Component 可以接收 Server Component 传来的什么数据？',
        answer:
          '可以接收可序列化数据，例如字符串、数字、数组和普通对象；不能直接接收函数、类实例、数据库连接等不可序列化值。',
      },
      {
        question: '为什么示例中产品数据读取放在 page.tsx，而收藏按钮单独做成 Client Component？',
        answer:
          '产品数据读取不需要浏览器交互，放在 Server Component 可以减少客户端包体积；收藏按钮需要点击事件，因此只把这块交互做成客户端边界。',
      },
      {
        question: 'use client 会影响它下面的组件树吗？',
        answer:
          '会。use client 定义的是客户端边界，该文件导出的组件以及它引入的客户端子树会进入浏览器 JavaScript 包，所以边界应尽量收窄。',
      },
      {
        question: 'Server Component 为什么更适合读取私有环境变量或数据库？',
        answer:
          '它只在服务端执行，相关代码和私有信息不会被打包发送到浏览器，安全边界比 Client Component 更清晰。',
      },
    ],
  };
