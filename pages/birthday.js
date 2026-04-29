import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import styles from '../styles/Birthday.module.css';

export default function Birthday() {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState({});
  const [copied, setCopied] = useState(false);

  const emojis = ["🎈","💖","🌸"];

  // ✅ Wait for router query safely
  useEffect(() => {
    if (!router.isReady) return;

    const safeData = {
      name: router.query.name || "Someone Special 💖",
      date: router.query.date || null,
      message: router.query.message || "You deserve something magical ✨",
      image: router.query.image || "",
      spotify: router.query.spotify || ""
    };

    setData(safeData);
  }, [router.isReady]);

  // ⏳ Countdown
  useEffect(() => {
    if (!data?.date) return;

    const t = setInterval(() => {
      const diff = new Date(data.date) - new Date();
      if (diff <= 0) return;

      setTime({
        d: Math.floor(diff/(1000*60*60*24)),
        h: Math.floor((diff/(1000*60*60))%24),
        m: Math.floor((diff/(1000*60))%60),
        s: Math.floor((diff/1000)%60)
      });
    }, 1000);

    return () => clearInterval(t);
  }, [data]);

  // 🎊 Confetti
  useEffect(() => {
    if (show) {
      confetti({ particleCount: 200, spread: 120 });
    }
  }, [show]);

  // 🔗 Copy
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 📲 WhatsApp
  const shareWhatsApp = () => {
    if (!data) return;

    const text = `🎉 Check this Birthday Surprise for ${data.name}! 💖`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + window.location.href)}`);
  };

  // ✅ Prevent render crash
  if (!data) return <p style={{textAlign:"center"}}>Loading...</p>;

  return (
    <div className={styles.page}>

      {/* Floating */}
      <div className={styles.floating}>
        {Array.from({ length: 20 }).map((_, i) => (
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

          <h1>🎉 Happy Birthday {data.name}</h1>

          <p>{data.message}</p>

          {/* Image */}
          {data.image && (
            <img src={data.image} className={styles.image} />
          )}

          {/* Timer */}
          {data.date && (
            <div className={styles.timer}>
              <div><span>{time.d || 0}</span><p>Days</p></div>
              <div><span>{time.h || 0}</span><p>Hours</p></div>
              <div><span>{time.m || 0}</span><p>Min</p></div>
              <div><span>{time.s || 0}</span><p>Sec</p></div>
            </div>
          )}

          {/* Spotify SAFE */}
          {data.spotify && data.spotify.includes("/track/") && (
            <iframe
              src={`https://open.spotify.com/embed/track/${data.spotify.split("/track/")[1]}`}
              width="300"
              height="80"
              allow="autoplay; encrypted-media"
            />
          )}

          {/* Share */}
          <div className={styles.shareBox}>
            <button onClick={copyLink} className={styles.shareBtn}>
              {copied ? "✅ Copied!" : "🔗 Copy Link"}
            </button>

            <button onClick={shareWhatsApp} className={styles.whatsapp}>
              📲 WhatsApp
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
