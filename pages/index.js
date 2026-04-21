import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    date: '',
    theme: 'party',
    music: '/music.mp3',
    secret: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push({
      pathname: '/birthday',
      query: form
    });
  };

  return (
    <div className={styles.container}>
      <h1>🎂 Create a Birthday Surprise</h1>

      <form onSubmit={handleSubmit} className={styles.card}>
        <input placeholder="Name" required
          onChange={(e)=>setForm({...form, name:e.target.value})} />

        <input type="date" required
          onChange={(e)=>setForm({...form, date:e.target.value})} />

        <select onChange={(e)=>setForm({...form, theme:e.target.value})}>
          <option value="party">🎉 Party</option>
          <option value="dark">🌙 Dark</option>
          <option value="pastel">🌸 Pastel</option>
        </select>

        <select onChange={(e)=>setForm({...form, music:e.target.value})}>
          <option value="/music.mp3">🎵 Birthday Song</option>
          <option value="/party.mp3">🎧 Party Beat</option>
        </select>

        <input placeholder="Secret Code (optional)"
          onChange={(e)=>setForm({...form, secret:e.target.value})} />

        <button>Generate 🎉</button>
      </form>
    </div>
  );
}
