import React, { useEffect, useState } from 'react';
import './style.css'; // Assuming there is a CSS file for styles

const BirthdayPage = () => {
  const [timeLeft, setTimeLeft] = useState({});
  
  // Set your birthday date here, for example: '2026-04-30'
  const birthdayDate = new Date('2026-04-30T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = birthdayDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({});
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdayDate]);

  return (
    <div className="birthday-page">
      <h1>Happy Birthday!</h1>
      <div className="countdown">
        <h2>Countdown to your birthday:</h2>
        <p>{timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds</p>
      </div>
      <div className="gallery">
        {/* Example photo gallery */}
        <h2>Photo Gallery</h2>
        <img src="image1.jpg" alt="Birthday 1" />
        <img src="image2.jpg" alt="Birthday 2" />
      </div>
      <audio controls autoPlay>
        <source src="background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BirthdayPage;