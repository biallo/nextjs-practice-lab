import { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { Explain, LessonHero, Review, Tabs } from './components/Lesson.jsx';
import { lessons } from './data/lessons.js';

const storageKey = 'nextjs-practice-lab.completed';
const activeLessonStorageKey = 'nextjs-practice-lab.active-lesson';

function readCompleted() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
}

function readActiveLessonId() {
  try {
    const lessonId = localStorage.getItem(activeLessonStorageKey);
    return lessons.some((lesson) => lesson.id === lessonId) ? lessonId : lessons[0].id;
  } catch {
    return lessons[0].id;
  }
}

export function App() {
  const [selectedLessonId, setSelectedLessonId] = useState(readActiveLessonId);
  const [activeTab, setActiveTab] = useState('explain');
  const [completedLessons, setCompletedLessons] = useState(() => new Set(readCompleted()));
  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) || lessons[0];
  const progress = Math.round((completedLessons.size / lessons.length) * 100);

  function selectLesson(lessonId) {
    setSelectedLessonId(lessonId);
    localStorage.setItem(activeLessonStorageKey, lessonId);
    setActiveTab('explain');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function completeLesson() {
    setCompletedLessons((current) => {
      const next = new Set(current);
      next.add(selectedLessonId);
      localStorage.setItem(storageKey, JSON.stringify([...next]));
      return next;
    });
  }

  return (
    <div className="shell">
      <Sidebar
        lessons={lessons}
        selectedLessonId={selectedLessonId}
        completedLessons={completedLessons}
        progress={progress}
        onSelectLesson={selectLesson}
      />

      <main className="content">
        <LessonHero lesson={selectedLesson} completed={completedLessons.has(selectedLesson.id)} />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <section className="panel">
          {activeTab === 'explain' ? (
            <Explain lesson={selectedLesson} />
          ) : (
            <Review
              lesson={selectedLesson}
              completed={completedLessons.has(selectedLesson.id)}
              onComplete={completeLesson}
            />
          )}
        </section>
      </main>
    </div>
  );
}
