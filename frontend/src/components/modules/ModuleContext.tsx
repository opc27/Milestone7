import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ModuleData } from '../modules/types';

// Initial modules data
const initialModules: ModuleData[] = [
  { id: 0, title: "Module 0", subtitle: "Course Overview", status: "active" },
  { id: 1, title: "Module 1", subtitle: "Introduction", status: "locked" },
  { id: 2, title: "Module 2", subtitle: "Understanding the Temple", status: "locked" },
  { id: 3, title: "Module 3", subtitle: "The Plan of Salvation", status: "locked" },
  { id: 4, title: "Module 4", subtitle: "Covenants and Ordinances", status: "locked" },
  { id: 5, title: "Module 5", subtitle: "Priesthood Blessings", status: "locked" },
  { id: 6, title: "Module 6", subtitle: "Initiatory", status: "locked" },
  { id: 7, title: "Module 7", subtitle: "Temple Garments", status: "locked" },
  { id: 8, title: "Module 8", subtitle: "The Endowment Ceremony", status: "locked" },
  { id: 9, title: "Module 9", subtitle: "Temple Worthiness", status: "locked" },
  { id: 10, title: "Module 10", subtitle: "Summary", status: "locked" },
];

interface ModuleContextType {
  modules: ModuleData[];
  completeModule: (moduleId: number) => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const useModuleContext = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModuleContext must be used within a ModuleProvider');
  }
  return context;
};

interface ModuleProviderProps {
  children: ReactNode;
}

export const ModuleProvider: React.FC<ModuleProviderProps> = ({ children }) => {
  const [modules, setModules] = useState<ModuleData[]>(initialModules);
  const [currentModule, setCurrentModule] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));

  // Fetch user data when the component mounts or the userId changes
  useEffect(() => {
    if (userId) {
      fetchUserData(Number(userId));
    } else {
      initializeModulesForGuest(); // Default to Module 0 being active when no user is logged in
    }
  }, [userId]); // This will run whenever userId changes

  // Listen for changes in localStorage's userId and update state
  useEffect(() => {
    const handleStorageChange = () => {
      const newUserId = localStorage.getItem('userId');
      if (newUserId !== userId) {
        setUserId(newUserId); // Update state when userId changes
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Initial setup in case the userId is already set in localStorage on page load
    const initialUserId = localStorage.getItem('userId');
    if (initialUserId && initialUserId !== userId) {
      setUserId(initialUserId);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userId]); // This effect depends on `userId`

  const fetchUserData = async (userId: number) => {
    try {
      const response = await fetch(`https://localhost:5000/Users/${userId}`);
      const data = await response.json();
      console.log(data); // Log the fetched user data to ensure correctness
      setCurrentModule(data.currentModule);
      initializeModulesForUser(data.currentModule); // Initialize modules after data is fetched
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const resetModules = () => {
    // Reset the modules to their initial state when user logs out
    initializeModulesForGuest(); // Default to Module 0 being active
    setCurrentModule(null); // Clear the current module state
  };

  const initializeModulesForGuest = () => {
    // Initialize modules for a guest (no user logged in)
    const guestModules: ModuleData[] = initialModules.map((module, index) => {
      if (index === 0) {
        return { ...module, status: 'active' as "active" }; // Module 0 is active
      } else {
        return { ...module, status: 'locked' as "locked" }; // All others are locked
      }
    });
    setModules(guestModules);
  };

  const initializeModulesForUser = (currentModuleId: number) => {
    // Initialize modules for a logged-in user
    const updatedModules: ModuleData[] = initialModules.map((module, index) => {
      if (index < currentModuleId) {
        return { ...module, status: 'completed' as "completed" }; // Mark previous modules as completed
      } else if (index === currentModuleId) {
        return { ...module, status: 'active' as "active" }; // Set the current module as active
      } else {
        return { ...module, status: 'locked' as "locked" }; // Set remaining modules as locked
      }
    });

    setModules(updatedModules);
  };

  const completeModule = (moduleId: number) => {
    const updatedModules = modules.map((module) =>
      module.id === moduleId
        ? { ...module, status: 'completed' as "completed" }
        : module
    );

    // Find the next locked module and set it to active
    const nextLockedModuleIndex = updatedModules.findIndex(
      (module) => module.status === 'locked'
    );

    if (nextLockedModuleIndex !== -1) {
      updatedModules[nextLockedModuleIndex] = {
        ...updatedModules[nextLockedModuleIndex],
        status: 'active' as "active",
      };
    }

    setModules(updatedModules);
  };

  return (
    <ModuleContext.Provider value={{ modules, completeModule }}>
      {children}
    </ModuleContext.Provider>
  );
};






// import React, { createContext, useState, useContext, ReactNode } from 'react';
// import { ModuleData } from '../modules/types';

// // Initial modules data
// const initialModules: ModuleData[] = [
//   {
//     id: 0,
//     title: "Module 0",
//     subtitle: "Course Overview",
//     status: "completed",
//   },
//   { id: 1, title: "Module 1", subtitle: "Introduction", status: "completed" },
//   {
//     id: 2,
//     title: "Module 2",
//     subtitle: "Understanding the Temple",
//     status: "active",
//   },
//   {
//     id: 3,
//     title: "Module 3",
//     subtitle: "The Plan of Salvation",
//     status: "locked",
//   },
//   {
//     id: 4,
//     title: "Module 4",
//     subtitle: "Covenants and Ordinances",
//     status: "locked",
//   },
//   {
//     id: 5,
//     title: "Module 5",
//     subtitle: "Priesthood Blessings",
//     status: "locked",
//   },
//   { id: 6, title: "Module 6", subtitle: "Initiatory", status: "locked" },
//   { id: 7, title: "Module 7", subtitle: "Temple Garments", status: "locked" },
//   {
//     id: 8,
//     title: "Module 8",
//     subtitle: "The Endowment Ceremony",
//     status: "locked",
//   },
//   { id: 9, title: "Module 9", subtitle: "Temple Worthiness", status: "locked" },
//   { id: 10, title: "Module 10", subtitle: "Summary", status: "locked" },
// ];

// interface ModuleContextType {
//   modules: ModuleData[];
//   completeModule: (moduleId: number) => void;
// }

// const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

// export const useModuleContext = () => {
//   const context = useContext(ModuleContext);
//   if (!context) {
//     throw new Error('useModuleContext must be used within a ModuleProvider');
//   }
//   return context;
// };

// interface ModuleProviderProps {
//   children: ReactNode;
// }

// export const ModuleProvider: React.FC<ModuleProviderProps> = ({ children }) => {
//   const [modules, setModules] = useState<ModuleData[]>(initialModules);

//   const completeModule = (moduleId: number) => {
//     // Update the current module to completed
//     const updatedModules = modules.map(m => 
//       m.id === moduleId ? { ...m, status: 'completed' as const } : m
//     );
    
//     // Find the next locked module and set it to active
//     const nextLockedModuleIndex = updatedModules.findIndex(
//       m => m.status === 'locked'
//     );
    
//     if (nextLockedModuleIndex !== -1) {
//       updatedModules[nextLockedModuleIndex] = {
//         ...updatedModules[nextLockedModuleIndex],
//         status: 'active' as const
//       };
//     }
    
//     // Update modules state
//     setModules(updatedModules);
//   };

//   return (
//     <ModuleContext.Provider value={{ modules, completeModule }}>
//       {children}
//     </ModuleContext.Provider>
//   );
// };
