import { useState, useEffect, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Cover from "@/components/Cover";
import Hero from "@/components/Hero";
import BrideGroom from "@/components/BrideGroom";
import Countdown from "@/components/Countdown";
import LoveStory from "@/components/LoveStory";
import VideoPrewedding from "@/components/VideoPrewedding";
import EventDetail from "@/components/EventDetail";
import Gallery from "@/components/Gallery";
import Maps from "@/components/Maps";
import RSVPForm from "@/components/RSVPForm";
import Wishes from "@/components/Wishes";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingParticles from "@/components/decorations/FloatingParticles";
import SectionDivider from "@/components/decorations/SectionDivider";
import Dashboard from "@/components/Dashboard";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      <AnimatePresence>
        {!isOpen && (
          <Suspense fallback={null}>
            <Cover onOpen={() => setIsOpen(true)} />
          </Suspense>
        )}
      </AnimatePresence>

      {isOpen && (
        <div className="animate-fade-in relative bg-[#FCF9F7]">
          {/* Global floating particles floating across the whole viewport */}
          <FloatingParticles count={40} color="rgba(212, 175, 55, 0.25)" className="fixed inset-0 z-0 pointer-events-none" />
          
          <div className="relative z-10">
            <Hero />
            <SectionDivider variant="floral" />
            
            <BrideGroom />
            <SectionDivider variant="diamond" />
            
            <Countdown />
            <SectionDivider variant="hearts" />
            
            <LoveStory />
            <SectionDivider variant="ornate" />
            
            <VideoPrewedding />
            <SectionDivider variant="floral" />
            
            <EventDetail />
            <SectionDivider variant="diamond" />
            
            <Gallery />
            <SectionDivider variant="wave" />
            
            <Maps />
            <SectionDivider variant="ornate" />
            
            <RSVPForm />
            <SectionDivider variant="hearts" />
            
            <Wishes />
            <SectionDivider variant="floral" />
            
            <Footer />
          </div>
          
          <MusicPlayer autoPlay={true} />
        </div>
      )}
    </main>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const path = currentPath.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path === "/dashboard" || path === "/dashboard/" || hash === "#/dashboard" || hash === "#/dashboard/") {
    return <Dashboard />;
  }

  return <Home />;
}

