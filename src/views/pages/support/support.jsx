
import React, { useState } from 'react';
import styles from './support.module.css';

const faqs = [
  {
    question: 'How to add new assignment?',
    answer:
      'To add a new task, go to the Add Task page and fill out the form with all the task details.',
  },
  {
    question: 'How to update your profile?',
    answer: 'Go to the user settings page and edit your profile details.',
  },
  {
    question: 'How to upload new summary?',
    answer: 'Use the My Summaries page to upload a new file by course.',
  },
  {
    question: 'How to delete a task?',
    answer: 'Navigate to My Assignments and click the delete icon next to the task.',
  },
  {
    question: 'How to change password?',
    answer: 'Go to User Settings and click on "Change Password".',
  },
];


function Support() {
  const [query, setQuery] = useState('');

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(query.toLowerCase())
  );
  return (
     <div className={styles.mainDev}>
      <div className={styles.supportContainer}>
        {/* FAQ Section */}
        <div className={styles.faqBox}>
          <h3>🧠 Frequently Asked Questions</h3>
          <input
            type="text"
            placeholder="Search question here"
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <ul>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <li key={idx}>
                  <strong>{faq.question}</strong>
                  <p>{faq.answer}</p>
                </li>
              ))
            ) : (
              <p style={{ color: 'gray', marginTop: '20px' }}>
                No matching question found. Please contact support 🙋‍♂️
              </p>
            )}
          </ul>
        </div>

        {/* Contact Form */}
        <div className={styles.contactBox}>
          <h3>📞 Contact Us</h3>
          <form className={styles.contactForm}>
            <label>Topic of the request</label>
            <input type="text" placeholder="Enter topic" />
            <label>Request details</label>
            <textarea rows="4" placeholder="Enter your message here"></textarea>
            <button type="submit">SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Support;