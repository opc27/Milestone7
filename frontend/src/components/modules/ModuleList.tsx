"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ModuleList.module.css";
import { ModuleCard } from "./ModuleCard";
import { useModuleContext } from "./ModuleContext";

export const ModuleList: React.FC = () => {
  const { modules } = useModuleContext();
  const navigate = useNavigate();

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
      console.log('Cannot access this module until previous modules are completed');
      return;
    }
    
    // Navigate to the module page
    navigate(`/modules/${moduleId}`);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Temple Preparation Modules</h1>
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
    </main>
  );
};
