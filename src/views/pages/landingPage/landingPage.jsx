import React from 'react';
import styles from "./landing.module.css";
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Logo.jpg';
import Land from '../../../assets/land.png';

function LandingPage() {
  const features = [
    {
      icon: "/frame.svg",
      title: "Task Management",
      description: "Keep track of all your assignments, projects, and exams in one place. Never miss a deadline again.",
      bgColor: "#3bcbba",
    },
    {
      icon: "/frame-3.svg",
      title: "Calendar Integration",
      description: "Visualize your schedule and plan ahead with our intuitive calendar view. Sync with your existing calendars.",
      bgColor: "#107567",
    },
    {
      icon: "/frame-2.svg",
      title: "Smart Reminders",
      description: "Get notified about upcoming deadlines and important events so you can stay on top of your studies.",
      bgColor: "#ff5386",
    },
    {
      icon: "/frame-1.svg",
      title: "Collaborative Study",
      description: "Work together with classmates on group projects. Share notes, assign tasks, and track progress collectively.",
      bgColor: "#25174e",
    },
  ];

  const testimonials = [
    {
      quote: "EduFlow has completely transformed how I manage my coursework. The task tracking and reminders have helped me stay on top of my assignments.",
      name: "Sarah J.",
      role: "Engineering Student",
    },
    {
      quote: "The collaborative features make group projects so much easier to coordinate. We can all see who's responsible for what and when it's due.",
      name: "Michael T.",
      role: "Business Major",
    },
    {
      quote: "I used to miss deadlines all the time before using EduFlow. Now I'm always prepared and my grades have improved significantly!",
      name: "Aisha M.",
      role: "Pre-Med Student",
    },
  ];

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo} />
          <img src={Logo} alt="לוגו האתר" className={styles.logo} />
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
          </div>
          <div className={styles.authButtons}>
            <Link to ="/login">
            <button className={styles.loginBtn}>Login</button>
            </Link>
            <Link to ="/signup">
            <button className={styles.signupBtn}>Sign Up</button>
            </Link>
          </div>
        </nav>
      </header>

      <section className={styles.hero}>
        <h1>Manage Your Studies</h1>
        <h2>With EduFlow</h2>
        <div className={styles.heroText}>
          <p>The ultimate task management app designed specifically for students. Track assignments, set reminders, and collaborate with classmates - all in one place.</p>
        </div>
        <div className={styles.heroBtns}>
          <button className={styles.getStartedBtn}>Get Started</button>
          <button className={styles.learnMoreBtn}>Learn More</button>
        </div>
        <img src={Land} alt="לוגו האתר" className={styles.heroImage} />
      </section>

      <section className={styles.features} id="features">
        <span className={styles.sectionTag}>Features</span>
        <h2>Everything You Need to Excel</h2>
        <p>EduFlow comes packed with tools designed specifically for students to manage their academic life efficiently.</p>

        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon} style={{ backgroundColor: feature.bgColor }}>
                <img src={feature.icon} alt={feature.title} />
              </div>
              <div className={styles.featureContent}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.testimonials} id="testimonials">
        <span className={styles.sectionTag}>Testimonials</span>
        <h2>Students Love EduFlow</h2>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <p className={styles.quote}>"{testimonial.quote}"</p>
              <p className={styles.name}>{testimonial.name}</p>
              <p className={styles.role}>{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to boost your productivity?</h2>
        <h3>Start using EduFlow today.</h3>
        <button className={styles.ctaBtn}>Sign up for free</button>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
        <div className={styles.copyright}>
          © 2023 EduFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
