import { useState } from 'react';
import { initialTomDimensions } from '../constants/dimensions.ts';
import { TOMDimension, Weights } from '../types/index.ts';
import { usePrioritisation } from '../hooks/usePrioritisation.ts';

import Header from '../components/Header.tsx';
import Configuration from '../components/Configuration.tsx';
import DimensionTable from '../components/DimensionTable.tsx';
import PrioritisationResults from '../components/PrioritisationResults.tsx';

const PrioritisationPage = () => {
    const [tomDimensions, setTomDimensions] = useState<TOMDimension[]>(initialTomDimensions);
    const [darkMode, setDarkMode] = useState(true);

    const [weights, setWeights] = useState<Weights>({
        businessImpact: 35,
        feasibility: 30,
        political: 20,
        foundation: 15
    });

    const prioritisedDimensions = usePrioritisation(tomDimensions, weights);

    // UPDATE: The logic for this function has been restored.
    const updateScore = (id: number, field: keyof TOMDimension, value: string | number) => {
        setTomDimensions(prev =>
            prev.map(dim =>
                dim.id === id ? {
                    ...dim,
                    [field]: typeof value === 'string' ? (field === 'currentScore' ? parseFloat(value) : parseInt(value)) || 0 : value
                } : dim
            )
        );
    };

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className={`max-w-7xl mx-auto p-6 min-h-screen ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <Header
                    title="TOM Prioritisation Tool"
                    subtitle="Score each dimension on a 1-5 scale. The tool will automatically calculate priorities and apply special filters."
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    showDevTag={false}
                />
                <div className="mb-8">
                    <Configuration
                        weights={weights}
                        setWeights={setWeights}
                        darkMode={darkMode}
                    />
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Input Scores</h2>
                        <div className="overflow-x-auto">
                            <DimensionTable
                                tomDimensions={tomDimensions}
                                updateScore={updateScore}
                                darkMode={darkMode}
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="sticky top-6">
                            <PrioritisationResults
                                prioritisedDimensions={prioritisedDimensions}
                                darkMode={darkMode}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrioritisationPage;