"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { PhotoSection } from "@/components/PhotoSection";
import { SheSaidYes } from "@/components/SheSaidYes";
import { OurStory } from "@/components/OurStory";
import { Schedule } from "@/components/Schedule";
import { Countdown } from "@/components/Countdown";
import { RSVP } from "@/components/RSVP";
import { DressCode } from "@/components/DressCode";
import { Details } from "@/components/Details";
import { Address } from "@/components/Address";
import { Footer } from "@/components/Footer";
import { SecretCodeGate } from "@/components/SecretCodeGate";

const STORAGE_KEY = "wedding-unlocked";

export function PageClient() {
  const [menuRequests, setMenuRequests] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unlocked = localStorage.getItem(STORAGE_KEY) === "true";
    setIsUnlocked(unlocked);
    setIsLoading(false);
  }, []);

  const handleUnlock = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsUnlocked(true);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[var(--bg)]" />
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SecretCodeGate onUnlock={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Nav />

            {/* 1. HERO */}
            <Hero />

            {/* 2. SHE SAID YES */}
            <SheSaidYes />

            {/* Photo Section 1 - Most beautiful couple photo */}
            <PhotoSection 
              src="/images/03-img-8080.webp" 
              alt="Lukas and Maria" 
              objectPosition="center center"
            />

            {/* 3. OUR STORY */}
            <OurStory />

            {/* Photo Section 2 - Elegant couple moment */}
            <PhotoSection 
              src="/images/05-img-8153.webp" 
              alt="Lukas and Maria" 
              objectPosition="center center"
            />

            {/* 4. SCHEDULE */}
            <Schedule />

            {/* Photo Section 3 - Romantic embrace */}
            <PhotoSection 
              src="/images/04-img-8127.webp" 
              alt="Lukas and Maria" 
              objectPosition="center 50%"
            />

            {/* 5. COUNTDOWN */}
            <Countdown />

            {/* Photo Section 4 - Stairs moment */}
            <PhotoSection 
              src="/images/06-img-8167.webp" 
              alt="Lukas and Maria" 
              objectPosition="center 40%"
            />

            {/* 6. VENUE */}
            <Address />

            {/* 7. DRESS CODE */}
            <DressCode />

            {/* 8. RSVP */}
            <RSVP />

            {/* Photo Section 5 - Intimate moment */}
            <PhotoSection 
              src="/images/09-img-9142.webp" 
              alt="Lukas and Maria" 
              objectPosition="center 50%"
            />

            {/* 9. DETAILS & QUESTIONS */}
            <Details menuRequests={menuRequests} onMenuRequestsChange={setMenuRequests} />

            {/* 10. FOOTER */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


