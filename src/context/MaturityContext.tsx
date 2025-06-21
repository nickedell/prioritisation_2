// src/context/MaturityContext.tsx

import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { diagnosticData } from '../constants/diagnostic'; // We need to import the data here

// Define the interface for the context
interface MaturityContextType {
    scores: { [key: string]: number };
    updateScore: (dimensionName: string, score: number) => void;
}

// Create the context
export const MaturityContext = createContext<MaturityContextType | undefined>(undefined);

// Create the Provider component
export const MaturityProvider = ({ children }: { children: ReactNode }) => {
    // This is the corrected initialization logic.
    // It reads the diagnosticData and creates a default score of 0 for every item.
    const initialScores = useMemo(() => {
        return diagnosticData.reduce((acc, item) => {
            if (item) { // safety check
                acc[item.name] = 0;
            }
            return acc;
        }, {} as { [key: string]: number });
    }, []);

    const [scores, setScores] = useState<{ [key: string]: number }>(initialScores);

    const updateScore = (dimensionName: string, score: number) => {
        setScores(prevScores => ({
            ...prevScores,
            [dimensionName]: score,
        }));
    };
    
    // This part correctly memoizes the value to prevent unnecessary re-renders
    const value = useMemo(() => ({ scores, updateScore }), [scores]);

    return (
        <MaturityContext.Provider value={value}>
            {children}
        </MaturityContext.Provider>
    );
};