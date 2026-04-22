import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    date: '',
    message: '',
    spotify: ''
  });

  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    if (!image) return '';

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "unsigned_preset");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
      {
        method: "POST",
        body: data
      }
    );

    const file = await res.json();
    return file.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    router.push({
      pathname: '/birthday',
      query: { ...form, image: imageUrl }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬 Create Birthday Experience</h1>

      <form onSubmit={handleSubmit} className={styles.card}>
        <input className={styles.input}
          placeholder="Name"
          onChange={(e)=>setForm({...form, name:e.target.value})}
          required />

        <input className={styles.input}
          type="date"
          onChange={(e)=>setForm({...form, date:e.target.value})}
          required />

        <input className={styles.input}
          placeholder="Message 💌"
          onChange={(e)=>setForm({...form, message:e.target.value})} />

        <input className={styles.input}
          placeholder="Spotify Track URL 🎶"
          onChange={(e)=>setForm({...form, spotify:e.target.value})} />

        <input type="file"
          onChange={(e)=>setImage(e.target.files[0])} />

        <button className={styles.button}>Create 🎉</button>
      </form>
    </div>
  );
}
