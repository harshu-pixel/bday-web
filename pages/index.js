import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    date: '',
    message: '',
    music: '/music.mp3'
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
      <h1 className={styles.title}>🎬 Create Cinematic Birthday</h1>

      <form onSubmit={handleSubmit} className={styles.card}>
        <input className={styles.input} placeholder="Name"
          onChange={(e)=>setForm({...form, name:e.target.value})} required />

        <input className={styles.input} type="date"
          onChange={(e)=>setForm({...form, date:e.target.value})} required />

        <input className={styles.input} placeholder="Message 💌"
          onChange={(e)=>setForm({...form, message:e.target.value})} />

        <select className={styles.input}
          onChange={(e)=>setForm({...form, music:e.target.value})}>
          <option value="/music.mp3">🎵 Soft</option>
          <option value="/party.mp3">🎧 Party</option>
        </select>

        <button className={styles.button}>Create 🎉</button>
      </form>
    </div>
  );
}
