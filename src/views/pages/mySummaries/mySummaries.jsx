import React, { useEffect, useState } from 'react';
import styles from './MySummaries.module.css';
import { db, auth } from '../../../firebase/firbase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function MySummaries() {
  const [summaries, setSummaries] = useState([]);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snapshot = await getDocs(collection(db, 'users', user.uid, 'summaries'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSummaries(data);
    };

    fetchSummaries();
  }, []);

  const handleAdd = async () => {
    if (!title || !course || !file) return;

    const user = auth.currentUser;
    if (!user) return;

    const newSummary = {
      course,
      title,
      fileName: file.name,
    };

    // Store in Firestore
    try {
      await addDoc(collection(db, 'users', user.uid, 'summaries'), newSummary);
      setSummaries((prev) => [...prev, { ...newSummary, id: Date.now() }]);
    } catch (error) {
      console.error('Error adding summary:', error);
    }

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
                  <span>{s.title}</span>
                  <span className={styles.download}>⬇️ {s.fileName}</span>
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
            <option value="WordPress">WordPress</option>
            <option value="UX/UI">UX/UI</option>
          </select>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleAdd}>ADD</button>
        </div>
      </div>
    </div>
  );
}

export default MySummaries;
