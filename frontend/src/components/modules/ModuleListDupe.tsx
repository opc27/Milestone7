"use client";
import React, { useState } from "react";
import styles from "./ModuleList.module.css";
import { ModuleCard } from "./ModuleCardDupe";
import { ComprehensionCheck } from "./ComprehensionCheck";
import { ModuleData } from "../../types";

// Initial modules data
const initialModules: ModuleData[] = [
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

export const ModuleListDupe: React.FC = () => {
  // State to manage modules
  const [modules, setModules] = useState<ModuleData[]>(initialModules);
  
  // State for comprehension check
  const [showComprehensionCheck, setShowComprehensionCheck] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<number | null>(null);

  // Handle module click
  const handleModuleClick = (moduleId: number) => {
    // Find the clicked module
    const clickedModule = modules.find(m => m.id === moduleId);
    
    if (!clickedModule) return;
    
    // Check if all previous modules are completed
    const isPreviousModulesCompleted = modules
      .filter(m => m.id < moduleId)
      .every(m => m.status === 'completed');
    
    // If module is locked and previous modules are not completed, don't allow access
    if (clickedModule.status === 'locked' && !isPreviousModulesCompleted) {
      alert('You must complete all previous modules first!');
      return;
    }
    
    // If module is active and all previous modules are completed, show comprehension check
    if (clickedModule.status === 'active' && isPreviousModulesCompleted) {
      setCurrentModuleId(moduleId);
      setShowComprehensionCheck(true);
    }
  };
  
  // Handle correct answer in comprehension check
  const handleCorrectAnswer = () => {
    if (currentModuleId === null) return;
    
    // Update the current module to completed
    const updatedModules = modules.map(m => 
      m.id === currentModuleId ? { ...m, status: 'completed' as const } : m
    );
    
    // Find the next locked module and set it to active
    const nextLockedModuleIndex = updatedModules.findIndex(
      m => m.status === 'locked'
    );
    
    if (nextLockedModuleIndex !== -1) {
      updatedModules[nextLockedModuleIndex] = {
        ...updatedModules[nextLockedModuleIndex],
        status: 'active' as const
      };
    }
    
    // Update modules state
    setModules(updatedModules);
    
    // Close the comprehension check
    setShowComprehensionCheck(false);
    setCurrentModuleId(null);
  };
  
  // Handle closing the comprehension check
  const handleCloseComprehensionCheck = () => {
    setShowComprehensionCheck(false);
    setCurrentModuleId(null);
  };

  return (
    <main className={styles.container}>
      <section className={styles.moduleList}>
        {modules.map((module) => (
          <ModuleCard 
            key={module.id} 
            module={module} 
            allModules={modules}
            onModuleClick={handleModuleClick}
          />
        ))}
      </section>
      
      {showComprehensionCheck && currentModuleId !== null && (
        <ComprehensionCheck 
          moduleId={currentModuleId}
          onCorrectAnswer={handleCorrectAnswer}
          onClose={handleCloseComprehensionCheck}
        />
      )}
    </main>
  );
};
