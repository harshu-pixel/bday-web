import { useState } from 'react';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [colors, setColors] = useState('');
  const [theme, setTheme] = useState('');
  const [music, setMusic] = useState(null);

  const handleMusicUpload = (event) => {
    setMusic(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ name, date, colors, theme, music });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Birthday Website Dashboard</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Colors:
          <input type="text" value={colors} onChange={(e) => setColors(e.target.value)} required />
        </label>
        <label>
          Theme:
          <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} required />
        </label>
        <label>
          Music Upload:
          <input type="file" accept="audio/*" onChange={handleMusicUpload} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Dashboard;
