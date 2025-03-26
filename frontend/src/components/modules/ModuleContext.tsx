import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ModuleData } from '../../components/modules/types';

// ✅ Define initial modules outside the component
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
  const userId = 1; // Replace with actual logged-in user ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user data');

        const userData = await response.json();
        const userCurrentModule = userData.currentModule;
        setCurrentModule(userCurrentModule);

        // ✅ Update modules based on user progress
        setModules((prevModules) =>
          prevModules.map((module) => ({
            ...module,
            status:
              module.id < userCurrentModule
                ? 'completed'
                : module.id === userCurrentModule
                ? 'active'
                : 'locked',
          }))
        );
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const completeModule = async (moduleId: number) => {
    if (currentModule === null) return;

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/updateModule`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to update module');

      const updatedUser = await response.json();
      const newCurrentModule = updatedUser.currentModule;
      setCurrentModule(newCurrentModule);

      // ✅ Ensure state updates correctly
      setModules((prevModules) =>
        prevModules.map((m) => ({
          ...m,
          status:
            m.id < newCurrentModule
              ? 'completed'
              : m.id === newCurrentModule
              ? 'active'
              : 'locked',
        }))
      );
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  return (
    <ModuleContext.Provider value={{ modules, completeModule }}>
      {children}
    </ModuleContext.Provider>
  );
};



// import React, { createContext, useState, useContext, ReactNode } from 'react';
// import { ModuleData } from '../../types';

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
