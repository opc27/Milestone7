"use client";
import React from "react";
import { StatusBar } from "./StatusBar";
import { Header } from "./Header";
import { WelcomeSection } from "./WelcomeSection";
import { TempleCard } from "./TempleCard";
import { EventsCard } from "./EventsCard";
import { SpiritualThought } from "./SpiritualThought";
import { BottomBar } from "./BottomBar";
import { ArrowIcon } from "./Icons";
import styles from "./InputDesign.module.css";

export const InputDesign: React.FC = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Inter:wght@400;500;600&family=Asap:wght@600&display=swap"
        rel="stylesheet"
      />
      <main className={styles.appContainer}>
        <StatusBar />
        <Header />
        <WelcomeSection />
        {/*This just reloads the page for now but should be updated once we have the info for retaining user progress*/}
        <button className={styles.pickupButton} onClick={() => window.location.href = window.location.href}>
          <span>Pick up where you left off</span>
          <ArrowIcon />
        </button>
        <TempleCard />
        <EventsCard />
        <SpiritualThought />
        <BottomBar />
      </main>
    </>
  );
};
