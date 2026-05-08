import { useEffect, useRef } from 'react';
import { Icon } from './Icon.jsx';

const iconBase = import.meta.env.BASE_URL;

export function Sidebar({
  lessons,
  selectedLessonId,
  completedLessons,
  progress,
  onSelectLesson,
}) {
  const courseListRef = useRef(null);
  const selectedCourseRef = useRef(null);

  useEffect(() => {
    const list = courseListRef.current;
    const selectedCourse = selectedCourseRef.current;

    if (!list || !selectedCourse) return;

    const listRect = list.getBoundingClientRect();
    const selectedRect = selectedCourse.getBoundingClientRect();
    const visibilityPadding = 8;
    const isFullyVisible =
      selectedRect.top >= listRect.top + visibilityPadding &&
      selectedRect.bottom <= listRect.bottom - visibilityPadding;

    if (isFullyVisible) return;

    const selectedTopInList = selectedRect.top - listRect.top + list.scrollTop;
    const targetTop = selectedTopInList - list.clientHeight / 2 + selectedRect.height / 2;
    list.scrollTo({ top: Math.max(0, targetTop), behavior: 'auto' });
  }, [selectedLessonId]);

  return (
    <aside className="sidebar" aria-label="课程导航">
      <div className="sidebar-fixed">
        <div className="brand">
          <img src={`${iconBase}icons/next-js-light.svg`} alt="" />
          <div>
            <span>Next.js Practice Lab</span>
            <strong>系统学习 Next.js</strong>
          </div>
        </div>

        <div className="progress-panel" aria-label="课程完成进度">
          <div className="progress-row">
            <span>学习进度</span>
            <strong>
              {completedLessons.size}/{lessons.length}
            </strong>
          </div>
          <div className="progress">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <label className="mobile-lesson-picker">
          <span>选择课程</span>
          <select value={selectedLessonId} onChange={(event) => onSelectLesson(event.target.value)}>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {completedLessons.has(lesson.id) ? '已完成 · ' : ''}{lesson.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="course-list" ref={courseListRef}>
        {lessons.map((lesson) => (
          <CourseButton
            key={lesson.id}
            lesson={lesson}
            selected={lesson.id === selectedLessonId}
            completed={completedLessons.has(lesson.id)}
            onClick={() => onSelectLesson(lesson.id)}
            buttonRef={lesson.id === selectedLessonId ? selectedCourseRef : null}
          />
        ))}
      </div>
    </aside>
  );
}

function CourseButton({ lesson, selected, completed, onClick, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      className={`course-item ${selected ? 'selected' : ''} ${completed ? 'completed' : ''}`}
      onClick={onClick}
    >
      <span className="course-meta">
        <span className="course-title">{lesson.title}</span>
        <span>{lesson.level}</span>
      </span>
      {completed ? (
        <span className="course-check done">
          <Icon name="check" />
        </span>
      ) : null}
    </button>
  );
}
