// src/context/MaturityContext.tsx

import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of our shared data
interface MaturityContextType {
    scores: { [key: string]: number };
    updateScore: (dimensionName: string, score: number) => void;
}

// Create the context with a default value
export const MaturityContext = createContext<MaturityContextType | undefined>(undefined);

// Create a "Provider" component that will wrap our app
export const MaturityProvider = ({ children }: { children: ReactNode }) => {
    const [scores, setScores] = useState<{ [key: string]: number }>({});

    const updateScore = (dimensionName: string, score: number) => {
        setScores(prevScores => ({
            ...prevScores,
            [dimensionName]: score,
        }));
    };

    return (
        <MaturityContext.Provider value={{ scores, updateScore }}>
            {children}
        </MaturityContext.Provider>
    );
};