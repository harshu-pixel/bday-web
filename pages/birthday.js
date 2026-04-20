import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BirthdayPage() {
  const router = useRouter();
  const { name, date, theme, colors } = router.query;

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    if (!date) return;

    const birthdayDate = new Date(date);

    const timer = setInterval(() => {
      const now = new Date();
      const distance = birthdayDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({});
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>🎉 Happy Birthday {name || 'Friend'}!</h1>

      <p>Theme: {theme}</p>
      <p>Colors: {colors}</p>

      <h2>Countdown:</h2>
      <p>
        {timeLeft.days || 0}d {timeLeft.hours || 0}h{' '}
        {timeLeft.minutes || 0}m {timeLeft.seconds || 0}s
      </p>

      <img src="/cake.jpg" width="200" />

      <audio controls autoPlay>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
