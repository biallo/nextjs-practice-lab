export const internationalizationLesson = {
  id: 'internationalization',
  number: '20',
  title: '国际化 i18n',
  level: '实践',
  summary: '设计 locale 路由、语言协商、翻译内容组织和多语言 SEO。',
  methods: [
    {
      title: 'Locale 路由',
      detail:
        '常见做法是把 locale 放在路由段中，例如 /en-US/products 和 /zh-CN/products，让 URL 明确表达语言版本。',
    },
    {
      title: '语言协商',
      detail:
        '可以读取 Accept-Language、cookie 或用户设置来选择默认语言，再重定向到对应 locale 路径。',
    },
    {
      title: '翻译资源',
      detail:
        '翻译文案应按 locale 和命名空间组织，不要把所有语言散落在组件内部，后续维护和审校会很困难。',
    },
    {
      title: '多语言 SEO',
      detail:
        '每个语言版本都应有对应 metadata、canonical 和 hreflang 策略，避免搜索引擎把多语言内容误判为重复页面。',
    },
  ],
  examples: [
    {
      title: '按 locale 加载翻译',
      language: 'tsx',
      code: `// app/[locale]/page.tsx
const dictionaries = {
  'en-US': () => import('./dictionaries/en-US.json').then((m) => m.default),
  'zh-CN': () => import('./dictionaries/zh-CN.json').then((m) => m.default),
};

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dictionary = await dictionaries[locale]();

  return <h1>{dictionary.home.title}</h1>;
}`,
    },
  ],
  review: [
    {
      question: '为什么 locale 放进 URL 很常见？',
      answer:
        'URL 能明确表示语言版本，方便分享、缓存、SEO 和用户手动切换，也减少服务端猜测语言造成的不稳定。',
    },
    {
      question: 'Accept-Language 适合做什么？',
      answer:
        '适合首次访问时推断默认语言，但用户显式选择后应优先使用 cookie、账户设置或 URL 中的 locale。',
    },
    {
      question: '为什么翻译不应散落在组件里？',
      answer:
        '分散文案难以审校、复用和批量导出，也会让多语言维护成本随页面数量快速上升。',
    },
    {
      question: '多语言页面为什么需要 SEO 策略？',
      answer:
        '搜索引擎需要知道不同 URL 是不同语言版本，而不是重复内容。hreflang 和 canonical 能提供这种信号。',
    },
    {
      question: '国际化还会影响哪些格式？',
      answer:
        '日期、时间、数字、货币、排序、复数规则和文本方向都可能随 locale 改变。',
    },
  ],
};
