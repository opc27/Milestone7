"use client";
import React from "react";
import styles from "./ModuleList.module.css";
// import { Header } from "./Header";
import { ModuleCard } from "./ModuleCard";
// import { ProgressBar } from "./ProgressBar";
// import { ChatButton } from "./ChatButton";
import { ModuleData } from "./types";

const modules: ModuleData[] = [
  {
    id: 0,
    title: "Module 0",
    subtitle: "Course Overview",
    status: "completed",
  },
  { id: 1, title: "Module 1", subtitle: "Introduction", status: "completed" },
  {
    id: 2,
    title: "Module 2",
    subtitle: "Understanding the Temple",
    status: "active",
  },
  {
    id: 3,
    title: "Module 3",
    subtitle: "The Plan of Salvation",
    status: "locked",
  },
  {
    id: 4,
    title: "Module 4",
    subtitle: "Covenants and Ordinances",
    status: "locked",
  },
  {
    id: 5,
    title: "Module 5",
    subtitle: "Priesthood Blessings",
    status: "locked",
  },
  { id: 6, title: "Module 6", subtitle: "Initiatory", status: "locked" },
  { id: 7, title: "Module 7", subtitle: "Temple Garments", status: "locked" },
  {
    id: 8,
    title: "Module 8",
    subtitle: "The Endowment Ceremony",
    status: "locked",
  },
  { id: 9, title: "Module 9", subtitle: "Temple Worthiness", status: "locked" },
  { id: 10, title: "Module 10", subtitle: "Summary", status: "locked" },
];

export const ModuleList: React.FC = () => {
  return (
    <main className={styles.container}>
      {/* <Header /> */}
      <section className={styles.moduleList}>
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </section>
      {/* <ProgressBar progress={20} />
      <ChatButton /> */}
    </main>
  );
};
