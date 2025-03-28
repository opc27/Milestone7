"use client";
import React from "react";
import { WelcomeSection } from "./WelcomeSection";
import { TempleCard } from "./TempleCard";
import { SpiritualThought } from "./SpiritualThought";
import { ArrowIcon } from "../sharedLayout/Icons";
import styles from "./InputDesign.module.css";
import UpcomingEvents from "./Events/UpcomingEvents";
import { useNavigate } from "react-router-dom";
import { ChatButton } from "../sharedLayout/ChatButton";

export const InputDesign: React.FC = () => {
  const navigate = useNavigate();


  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Inter:wght@400;500;600&family=Asap:wght@600&display=swap"
        rel="stylesheet"
      />
      <main className={styles.appContainer}>
        <WelcomeSection />
        {/*This just reloads the page for now but should be updated once we have the info for retaining user progress*/}
        <button className={styles.pickupButton} onClick={() => navigate('/modules')}>
          <span>Pick up where you left off</span>
          <ArrowIcon />
        </button>
        <TempleCard />
        <UpcomingEvents />
        <SpiritualThought />
        <ChatButton />
        
      </main>


    </>
  );
};
