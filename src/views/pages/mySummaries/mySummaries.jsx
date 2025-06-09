import React, { useState } from 'react';
import styles from './MySummaries.module.css';

const mockSummaries = [
  { id: 1, course: 'React', title: 'Summary from lesson number 7 - useEffect', file: '#' },
  { id: 2, course: 'React', title: 'Summary from lesson number 9 - useState', file: '#' },
  { id: 3, course: 'JavaScript', title: 'Summary from lesson number 2 - localStorage use', file: '#' },
];


function MySummaries() {


  const [summaries, setSummaries] = useState(mockSummaries);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [file, setFile] = useState(null);

  const handleAdd = () => {
    if (!title || !course || !file) return;

    const newSummary = {
      id: summaries.length + 1,
      course,
      title,
      file: URL.createObjectURL(file),
    };
    setSummaries([...summaries, newSummary]);

    // Reset form
    setTitle('');
    setCourse('');
    setFile(null);
  };

  const courses = [...new Set(summaries.map((s) => s.course))];

  return (
     <div className={styles.container}>
      

      {courses.map((c) => (
        <div key={c} className={styles.box}>
            <div className={styles.legendTab}>{c} summaries</div>
  <ul>
    {summaries
      .filter((s) => s.course === c)
      .map((s) => (
        <li key={s.id}>
          <a href={s.file} download>
            {s.title} <span className={styles.download}>⬇️</span>
          </a>
        </li>
      ))}
  </ul>
</div>
      ))}

      <div className={styles.uploadBox}>
        <h3>Upload new summary</h3>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Summary title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select value={course} onChange={(e) => setCourse(e.target.value)}>
            <option value="">Subject</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="UX/UI">UX/UI</option>
            {/* אפשר להוסיף עוד */}
          </select>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleAdd}>ADD</button>
        </div>
      </div>
    </div>
  );
}

export default MySummaries;