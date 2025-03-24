import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Scripture, fetchRandomScripture } from '../services/scriptureService';

// Define the context type
interface ScriptureContextType {
  scripture: Scripture | null;
  loading: boolean;
  error: string | null;
  refreshScripture: () => Promise<void>;
}

// Create the context with a default value
const ScriptureContext = createContext<ScriptureContextType>({
  scripture: null,
  loading: false,
  error: null,
  refreshScripture: async () => {},
});

// Custom hook to use the scripture context
export const useScripture = () => useContext(ScriptureContext);

// Props for the provider component
interface ScriptureProviderProps {
  children: ReactNode;
}

// Provider component
export const ScriptureProvider: React.FC<ScriptureProviderProps> = ({ children }) => {
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch a new random scripture
  const refreshScripture = async () => {
    setLoading(true);
    setError(null);
    try {
      const newScripture = await fetchRandomScripture();
      setScripture(newScripture);
    } catch (err) {
      setError('Failed to fetch scripture');
      console.error('Error refreshing scripture:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a scripture when the component mounts
  useEffect(() => {
    refreshScripture();
  }, []);

  // The context value
  const value = {
    scripture,
    loading,
    error,
    refreshScripture,
  };

  return (
    <ScriptureContext.Provider value={value}>
      {children}
    </ScriptureContext.Provider>
  );
};
