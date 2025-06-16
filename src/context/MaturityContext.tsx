import React, { createContext, useState, ReactNode, useMemo } from 'react';

interface MaturityContextType {
    scores: { [key: string]: number };
    updateScore: (dimensionName: string, score: number) => void;
}

export const MaturityContext = createContext<MaturityContextType | undefined>(undefined);

export const MaturityProvider = ({ children }: { children: ReactNode }) => {
    const [scores, setScores] = useState<{ [key: string]: number }>({});

    const updateScore = (dimensionName: string, score: number) => {
        setScores(prevScores => ({
            ...prevScores,
            [dimensionName]: score,
        }));
    };

    // This useMemo hook is critical for performance and preventing bugs
    const value = useMemo(() => ({ scores, updateScore }), [scores]);

    return (
        <MaturityContext.Provider value={value}>
            {children}
        </MaturityContext.Provider>
    );
};