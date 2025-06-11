import React, { useState } from 'react';
import styles from './AddAssignments.module.css';
import { db, auth } from '../../../firebase/firbase';
import { collection, addDoc } from 'firebase/firestore';

function AddAssignments() {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [subject, setSubject] = useState('');
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState('');
  const [tasks, setTasks] = useState([{ name: 'Task 1', weight: 50 }, { name: 'Task 2', weight: 50 }]);
  const [newTask, setNewTask] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [isFinal, setIsFinal] = useState(false);
  const [file, setFile] = useState(null);

  const handleAddMember = () => {
    if (newMember.trim()) {
      setMembers([...members, newMember]);
      setNewMember('');
    }
  };

  const handleAddTask = () => {
    if (newTask.trim() && newWeight.trim()) {
      setTasks([...tasks, { name: newTask, weight: Number(newWeight) }]);
      setNewTask('');
      setNewWeight('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Please fill in both assignment title and due date.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in to submit an assignment.');
        return;
      }

      await addDoc(collection(db, 'users', user.uid, 'events'), {
        title,
        dueDate,
        createdAt: new Date()
      });

      alert('Assignment submitted and saved!');
      setTitle('');
      setDueDate('');
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      alert('An error occurred while saving the assignment.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>📝 Add a new assignment</h2>

        <div className={styles.formGrid}>
          <div className={styles.leftSide}>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className={styles.input}>
              <option value="">Choose Subject</option>
              <option value="React">React</option>
              <option value="UX/UI">UX/UI Science</option>
              <option value="JavaScript">JavaScript Science</option>
              <option value="WordPress">WordPress</option>
            </select>

            <input
              type="text"
              placeholder="Assignment Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={styles.input}
            />

            <div className={styles.memberRow}>
              <input
                type="text"
                placeholder="Add Members"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                className={styles.input}
              />
              <button type="button" onClick={handleAddMember} className={styles.plusBtn}>+</button>
            </div>

            <hr className={styles.divider} />

            {tasks.map((task, index) => (
              <div key={index} className={styles.taskRow}>
                <input
                  type="text"
                  value={task.name}
                  readOnly
                  className={styles.input}
                />
                <input
                  type="text"
                  value={task.weight + '%'}
                  readOnly
                  className={styles.weightInput}
                />
              </div>
            ))}

            <div className={styles.taskRow}>
              <input
                type="text"
                placeholder="Add more task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="%"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                className={styles.weightInput}
              />
              <button type="button" onClick={handleAddTask} className={styles.plusBtn}>+</button>
            </div>
          </div>

          <div className={styles.rightSide}>
            <label className={styles.label}>Uploading the instructor's submission guidelines</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className={styles.fileInput} />

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isFinal}
                onChange={(e) => setIsFinal(e.target.checked)}
              />
              Is this the final project for the course?
            </label>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>SUBMIT</button>
      </form>
    </div>
  );
}
export default AddAssignments;