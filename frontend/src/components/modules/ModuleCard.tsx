import React from 'react';
import styles from './ModuleCard.module.css';
import { ModuleCardProps, ModuleData } from './types';

interface ExtendedModuleCardProps extends ModuleCardProps {
  allModules?: ModuleData[];
  onModuleClick?: (moduleId: number) => void;
}

export const ModuleCard: React.FC<ExtendedModuleCardProps> = ({ 
  module, 
  allModules = [], 
  onModuleClick 
}) => {
  const handleModuleClick = () => {
    // Check if all previous modules are completed
    const isPreviousModulesCompleted = allModules
      .filter(m => m.id < module.id)
      .every(m => m.status === 'completed');
    
    // If module is locked and previous modules are not all completed, don't allow click
    if (module.status === 'locked' && !isPreviousModulesCompleted) {
      console.log('Cannot access this module until previous modules are completed');
      return;
    }
    
    // If module is active or completed, or if all previous modules are completed, allow click
    if (onModuleClick) {
      onModuleClick(module.id);
    }
  };
  const getStatusIcon = () => {
    switch (effectiveStatus) {
      case 'completed':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3333 9.23333V10C18.3323 11.797 17.7504 13.5456 16.6744 14.9849C15.5984 16.4241 14.086 17.4771 12.3628 17.9866C10.6395 18.4961 8.79768 18.4349 7.11202 17.8122C5.42636 17.1894 3.98717 16.0384 3.00909 14.5309C2.03101 13.0234 1.56645 11.2401 1.68469 9.44693C1.80293 7.6538 2.49763 5.94694 3.66519 4.58089C4.83275 3.21485 6.41061 2.26282 8.16345 1.86679C9.91629 1.47076 11.7502 1.65195 13.3916 2.38333M18.3333 3.33333L9.99996 11.675L7.49996 9.175"
            stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'active':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6023 1.66667 9.99996 1.66667C5.39759 1.66667 1.66663 5.39763 1.66663 10C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z"
            stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'locked':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.83333 9.16667V5.83333C5.83333 4.72827 6.27232 3.66846 7.05372 2.88706C7.83512 2.10565 8.89493 1.66667 10 1.66667C11.1051 1.66667 12.1649 2.10565 12.9463 2.88706C13.7277 3.66846 14.1667 4.72827 14.1667 5.83333V9.16667M4.16667 9.16667H15.8333C16.7538 9.16667 17.5 9.91286 17.5 10.8333V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V10.8333C2.5 9.91286 3.24619 9.16667 4.16667 9.16667Z"
            stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  // Determine if this module should be accessible
  const isPreviousModulesCompleted = allModules
    .filter(m => m.id < module.id)
    .every(m => m.status === 'completed');
  
  // Force locked status if previous modules are not completed
  const effectiveStatus = (!isPreviousModulesCompleted && module.status !== 'completed') 
    ? 'locked' 
    : module.status;

  return (
    <article 
      className={`${styles.moduleCard} ${styles[effectiveStatus]}`}
      onClick={handleModuleClick}
      style={{ cursor: effectiveStatus === 'locked' ? 'not-allowed' : 'pointer' }}
    >
      <h2 className={styles.title}>{module.title}</h2>
      <p className={styles.subtitle}>{module.subtitle}</p>
      <div className={styles.statusIcon}>
        {getStatusIcon()}
      </div>
    </article>
  );
};
