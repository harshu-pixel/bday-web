import { useState } from 'react';
import styles from './index.module.css';

export default function Dashboard() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [colors, setColors] = useState('');
  const [theme, setTheme] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirect to birthday page with data
    window.location.href = `/birthday?name=${name}&date=${date}&theme=${theme}&colors=${colors}`;
  };

  return (
    <div className={styles.container}>
      <h1>🎂 Birthday Website Dashboard</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Favorite Colors"
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Theme (e.g. party, pastel)"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          required
        />

        <button type="submit">Create Birthday Page 🎉</button>
      </form>
    </div>
  );
}
