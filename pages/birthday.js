import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import styles from '../styles/Birthday.module.css';

export default function Birthday() {
  const router = useRouter();
  const { name, date, message, image, spotify } = router.query;

  const [show, setShow] = useState(false);
  const [time, setTime] = useState({});

  const emojis = ["🎈","💖","🌸","🎁"];

  useEffect(() => {
    if (show) {
      confetti({ particleCount: 200, spread: 120 });
    }
  }, [show]);

  useEffect(() => {
    if (!date) return;

    const t = setInterval(() => {
      const diff = new Date(date) - new Date();
      if (diff <= 0) return;

      setTime({
        d: Math.floor(diff/(1000*60*60*24)),
        h: Math.floor((diff/(1000*60*60))%24),
        m: Math.floor((diff/(1000*60))%60),
        s: Math.floor((diff/1000)%60)
      });
    }, 1000);

    return ()=>clearInterval(t);
  }, [date]);

  return (
    <div className={styles.page}>

      {/* 🌸 Floating */}
      <div className={styles.floating}>
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i}
            style={{
              left: Math.random()*100+"%",
              animationDuration: (6 + Math.random()*6)+"s"
            }}>
            {emojis[i % 3]}
          </span>
        ))}
      </div>

      {!show ? (
        <button className={styles.reveal} onClick={()=>setShow(true)}>
          🎁 Tap to Begin
        </button>
      ) : (
        <div className={styles.card}>

          <h1 className={styles.heading}>
            🎉 Happy Birthday {name}
          </h1>

          <p className={styles.message}>
            {message || "You deserve something magical 💖"}
          </p>

          {image && <img src={image} className={styles.image} />}

          {/* ⏳ Countdown */}
          <div className={styles.timer}>
            <div><span>{time.d}</span><p>Days</p></div>
            <div><span>{time.h}</span><p>Hours</p></div>
            <div><span>{time.m}</span><p>Min</p></div>
            <div><span>{time.s}</span><p>Sec</p></div>
          </div>

          {/* 🎶 Spotify */}
          {spotify && (
            <iframe
              src={`https://open.spotify.com/embed/track/${spotify.split("/track/")[1]}`}
              width="300"
              height="80"
              allow="autoplay; clipboard-write; encrypted-media"
            ></iframe>
          )}

          {/* 🔗 Share */}
          <button
            onClick={()=>{
              navigator.clipboard.writeText(window.location.href)
            }}
            className={styles.share}
          >
            🔗 Copy Link
          </button>

        </div>
      )}
    </div>
  );
}
