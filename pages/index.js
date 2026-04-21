import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/index.module.css';

export default function Dashboard() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [colors, setColors] = useState('');
  const [theme, setTheme] = useState('');
  const [secret, setSecret] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageUrl = image ? URL.createObjectURL(image) : '';

    router.push({
      pathname: '/birthday',
      query: { name, date, colors, theme, secret, imageUrl },
    });
  };

  return (
    <div className={styles.container}>
      <h1>🎂 Create Birthday Surprise</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="date" onChange={(e) => setDate(e.target.value)} required />
        <input placeholder="Colors" onChange={(e) => setColors(e.target.value)} />
        <input placeholder="Theme (dark/pastel)" onChange={(e) => setTheme(e.target.value)} />
        <input placeholder="Secret Code 🔐" onChange={(e) => setSecret(e.target.value)} />

        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Generate 🎉</button>
      </form>
    </div>
  );
}
