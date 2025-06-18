// src/context/MaturityContext.tsx

import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { diagnosticData } from '../constants/diagnostic'; // Import data from our new file

interface MaturityContextType {
    scores: { [key: string]: number };
    updateScore: (dimensionName: string, score: number) => void;
}

export const MaturityContext = createContext<MaturityContextType | undefined>(undefined);

export const MaturityProvider = ({ children }: { children: ReactNode }) => {
    // UPDATE: Initialize scores to 0 for all dimensions from the data file.
    const initialScores = useMemo(() => {
        return diagnosticData.reduce((acc, item) => {
            acc[item.name] = 0;
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
    
    const value = useMemo(() => ({ scores, updateScore }), [scores]);

    return (
        <MaturityContext.Provider value={value}>
            {children}
        </MaturityContext.Provider>
    );
};