import React, { useMemo, useState } from 'react';
import { tokenizeCode } from '../utils/codeTokens.js';
import { Icon } from './Icon.jsx';

export function LessonHero({ lesson, completed }) {
  return (
    <section className="lesson-hero">
      <div>
        <div className="eyebrow">{lesson.level}</div>
        <h2>{lesson.title}</h2>
        <p>{lesson.summary}</p>
      </div>
      <span className={`status-pill ${completed ? 'done' : ''}`}>
        {completed ? '已完成' : '学习中'}
      </span>
    </section>
  );
}

export function Tabs({ activeTab, onTabChange }) {
  return (
    <nav className="tabs" aria-label="课程内容">
      <button
        className={activeTab === 'explain' ? 'active' : ''}
        onClick={() => onTabChange('explain')}
      >
        <Icon name="book" />
        讲解
      </button>
      <button
        className={activeTab === 'review' ? 'active' : ''}
        onClick={() => onTabChange('review')}
      >
        <Icon name="rotate" />
        复盘
      </button>
    </nav>
  );
}

export function Explain({ lesson }) {
  return (
    <>
      <div className="section-head">
        <h3>方法与特性</h3>
      </div>
      <div className="method-list">
        {lesson.methods.map((method) => (
          <article className="method-card" key={method.title}>
            <h4>{method.title}</h4>
            <p>{method.detail}</p>
          </article>
        ))}
      </div>

      <div className="section-head code-head">
        <h3>代码示例</h3>
      </div>
      <div className="examples">
        {lesson.examples.map((example) => (
          <CodeExample example={example} key={example.title} />
        ))}
      </div>
    </>
  );
}

function CodeExample({ example }) {
  const tokens = useMemo(() => tokenizeCode(example.code), [example.code]);

  return (
    <article className="code-card">
      <div className="code-title">
        <span>
          <Icon name="code" />
          {example.title}
        </span>
        <small>{example.language}</small>
      </div>
      <pre>
        <code>
          {tokens.map((token, index) =>
            token.className ? (
              <span className={token.className} key={index}>
                {token.value}
              </span>
            ) : (
              <React.Fragment key={index}>{token.value}</React.Fragment>
            ),
          )}
        </code>
      </pre>
    </article>
  );
}

export function Review({ lesson, completed, onComplete }) {
  return (
    <>
      <div className="section-head review-head">
        <h3>提问</h3>
      </div>
      <div className="qa-list">
        {lesson.review.map((item, index) => (
          <ReviewQuestion item={item} index={index} key={item.question} />
        ))}
      </div>
      <div className="review-actions">
        <button
          className={`complete-button ${completed ? 'done' : ''}`}
          onClick={onComplete}
          disabled={completed}
        >
          {completed ? '已完成' : '标记完成'}
        </button>
      </div>
    </>
  );
}

function ReviewQuestion({ item, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <details className="qa-card" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>
        <span>Q{index + 1}</span>
        {item.question}
      </summary>
      <div className="qa-answer">
        <p>{item.answer}</p>
      </div>
    </details>
  );
}
