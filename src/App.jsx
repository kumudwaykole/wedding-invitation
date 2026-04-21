import { useState } from 'react';
import FloatingLeaves from './components/FloatingLeaves';
import EnvelopeReveal from './components/EnvelopeReveal';
import HeroSection from './components/HeroSection';
import SaveTheDateSection from './components/SaveTheDateSection';
import OurStorySection from './components/OurStorySection';
import EventCard from './components/EventCard';
import VenueSection from './components/VenueSection';
import TimelineSection from './components/TimelineSection';
import WelcomeSection from './components/WelcomeSection';
import './index.css';

function App() {
  const [revealed, setRevealed] = useState(false);

  return (
    <FloatingLeaves>
      <EnvelopeReveal onReveal={() => setRevealed(true)} />
      <div
        className="mx-auto relative transition-opacity duration-500 overflow-x-hidden"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <HeroSection />
        <SaveTheDateSection />
        <OurStorySection />
        <EventCard
          isDay2={true}
          day="Monday"
          date={18}
          month={5}
          year={2026}
          title="Sangeet"
          time="5:45 PM Onwards"
          venue="Aditya Lawn, Jalgaon"
          theme="Mystic & Magic"
          theme2="Glits & Glam"
          bgGradient="linear-gradient(135deg,#0d1b4b 0%,#1a2d6b 30%,#2a0a4a 70%,#0d1b4b 100%)"
          accentColor="#ffd700"
        />
        <EventCard
          isDay2={false}
          day="Wednesday"
          date={27}
          month={5}
          year={2026}
          title="Reception"
          time="5:00 PM Onwards"
          venue="Bing, Indo-Western"
          theme="An Evening to Remember"
          theme2="Wedding Reception"
          bgGradient="linear-gradient(135deg,#0a2a3a 0%,#0d3d52 30%,#1a4a5a 70%,#0a2a3a 100%)"
          accentColor="#e8c96a"
        />
        <VenueSection />
        <TimelineSection />
        <WelcomeSection />
      </div>
    </FloatingLeaves>
  );
}

export default App;
