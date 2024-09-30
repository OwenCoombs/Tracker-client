import React, { useState, useEffect } from "react";
import "./App.css";
import hero from './assets/stoic.jpeg'; // Ensure you have the correct path to your hero image
import logo from './assets/Habitly.png'; // Update this path to your logo

// Array of motivational Bible quotes
const bibleQuotes = [
  "For I know the plans I have for you, declares the Lord. - Jeremiah 29:11",
  "I can do all things through Christ who strengthens me. - Philippians 4:13",
  "The Lord is my shepherd; I shall not want. - Psalm 23:1",
  "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
  "The steadfast love of the Lord never ceases; his mercies never come to an end. - Lamentations 3:22",
  "Delight yourself in the Lord, and he will give you the desires of your heart. - Psalm 37:4",
  "Cast all your anxiety on him because he cares for you. - 1 Peter 5:7",
  "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go. - Joshua 1:9",
  "This is the day that the Lord has made; let us rejoice and be glad in it. - Psalm 118:24",
  "God is our refuge and strength, a very present help in trouble. - Psalm 46:1",
  "The Lord will fight for you; you need only to be still. - Exodus 14:14",
  "And we know that in all things God works for the good of those who love him. - Romans 8:28",
  "When you pass through the waters, I will be with you. - Isaiah 43:2",
  "The joy of the Lord is your strength. - Nehemiah 8:10",
  "Let everything that has breath praise the Lord. - Psalm 150:6",
  "For God gave us a spirit not of fear but of power and love and self-control. - 2 Timothy 1:7"
];

function App() {
  const [scripture, setScripture] = useState(""); // For storing the Bible scripture
  const [isLoading, setIsLoading] = useState(true); // Loading state for the logo

  // Fetch a motivational quote based on the current date
  useEffect(() => {
    const currentDate = new Date();
    const index = currentDate.getDate() % bibleQuotes.length; // Cycle through the quotes based on the day of the month
    setScripture(bibleQuotes[index]);

    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after a delay
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="app">
      {isLoading ? (
        <div className={`logo ${!isLoading ? 'fade-out' : ''}`}>
          <img src={logo} alt="Logo" />
        </div>
      ) : (
        <>
          {/* Hero Section with Placeholder Image */}
          <section className="hero">
            <img src={hero} alt="Motivational Background" className="hero-image" />
            <div className="hero-content">
              <h1>Welcome to Your Daily Tracker</h1>
            </div>
          </section>

          {/* Daily Scripture Section */}
          <section className="daily-scripture">
            <h2>Daily Scripture</h2>
            <p>{scripture ? scripture : "Loading today's scripture..."}</p>
          </section>

          <nav className="bottom-nav">
            <a href="/">Home</a>
            <a href="/tasks">Tasks</a>
            <button>Profile</button>
          </nav>
        </>
      )}
    </div>
  );
}

export default App;
