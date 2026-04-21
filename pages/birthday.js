import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import styles from '../styles/Birthday.module.css';

export default function Birthday() {
  const router = useRouter();
  const { name, date, theme, music, secret } = router.query;

  const [show, setShow] = useState(false);
  const [access, setAccess] = useState(!secret);
  const [input, setInput] = useState('');
  const [time, setTime] = useState({});

  // 🎊 Confetti burst
  useEffect(() => {
    if (show) {
      confetti({ particleCount: 200, spread: 100 });
    }
  }, [show]);

  // ⏳ Countdown
  useEffect(() => {
    if (!date) return;
    const t = setInterval(() => {
      const diff = new Date(date) - new Date();
      if (diff <= 0) return;

      setTime({
        d: Math.floor(diff / (1000*60*60*24)),
        h: Math.floor((diff / (1000*60*60))%24),
        m: Math.floor((diff / (1000*60))%60),
        s: Math.floor((diff/1000)%60)
      });
    }, 1000);
    return ()=>clearInterval(t);
  }, [date]);

  // 🔐 Lock
  if (!access) {
    return (
      <div className={styles.lock}>
        <h2>🔐 Private Page</h2>
        <input placeholder="Enter Code"
          onChange={(e)=>setInput(e.target.value)} />
        <button onClick={()=> input===secret && setAccess(true)}>
          Unlock
        </button>
      </div>
    );
  }

  const themes = {
    dark: styles.dark,
    pastel: styles.pastel,
    party: styles.party
  };

  return (
    <div className={`${styles.page} ${themes[theme]}`}>

      {/* 🎥 video bg */}
      <video autoPlay loop muted className={styles.video}>
        <source src="/bg.mp4" />
      </video>

      {!show ? (
        <button className={styles.reveal}
          onClick={()=>setShow(true)}>
          🎁 Tap to Reveal
        </button>
      ) : (
        <div className={styles.card}>
          <h1>🎉 Happy Birthday {name}!</h1>

          <p className={styles.count}>
            {time.d}d {time.h}h {time.m}m {time.s}s
          </p>

          <img src="/cake.jpg" className={styles.img} />

          <audio controls autoPlay loop>
            <source src={music} />
          </audio>

          <button onClick={()=>{
            navigator.clipboard.writeText(window.location.href)
          }}>
            🔗 Share Link
          </button>
        </div>
      )}
    </div>
  );
}
