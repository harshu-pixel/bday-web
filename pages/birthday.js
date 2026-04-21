import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function BirthdayPage() {
  const router = useRouter();
  const { name, date, theme, colors, secret, imageUrl } = router.query;

  const [timeLeft, setTimeLeft] = useState({});
  const [access, setAccess] = useState(false);
  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);

  // 🎊 Confetti rain
  useEffect(() => {
    const interval = setInterval(() => {
      confetti({ particleCount: 20, spread: 70, origin: { y: 0 } });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // ⏳ Countdown
  useEffect(() => {
    if (!date) return;
    const birthdayDate = new Date(date);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = birthdayDate - now;

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  // 🔐 Lock screen
  if (secret && !access) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Enter Secret Code 🔐</h2>
        <input onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => input === secret && setAccess(true)}>Enter</button>
      </div>
    );
  }

  const bg =
    theme === 'dark'
      ? '#111'
      : theme === 'pastel'
      ? '#ffe4ec'
      : `linear-gradient(135deg, ${colors || '#ff9a9e'}, #fad0c4)`;

  return (
    <div style={{
      textAlign: 'center',
      padding: '20px',
      minHeight: '100vh',
      background: bg,
      color: theme === 'dark' ? 'white' : '#333',
    }}>
      
      {/* 🎥 Video background */}
      <video autoPlay loop muted playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}>
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {!show ? (
        <button onClick={() => setShow(true)}>🎁 Click for Surprise</button>
      ) : (
        <>
          <h1 style={{ fontSize: 'clamp(24px,6vw,40px)' }}>
            🎉 Happy Birthday {name}! 🎉
          </h1>

          <p>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </p>

          <img
            src={imageUrl || "/cake.jpg"}
            style={{ width: '80%', maxWidth: '250px' }}
          />

          <br /><br />

          <audio controls autoPlay>
            <source src="/music.mp3" type="audio/mpeg" />
          </audio>
        </>
      )}
    </div>
  );
}
