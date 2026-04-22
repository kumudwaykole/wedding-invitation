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
import SacredCeremoniesSection from './components/SacredCeremoniesSection';

function App() {
  const [revealed, setRevealed] = useState(false);

  return (
    <FloatingLeaves>
      <EnvelopeReveal onReveal={() => setRevealed(true)} />

      {revealed && (
        <div className="mx-auto relative overflow-x-hidden">
          <HeroSection revealed={revealed} />
          <SaveTheDateSection />
          <OurStorySection />
          <SacredCeremoniesSection />
          <VenueSection />

          {/* <TimelineSection /> */}
          <WelcomeSection />
        </div>
      )}
    </FloatingLeaves>
  );
}

export default App;