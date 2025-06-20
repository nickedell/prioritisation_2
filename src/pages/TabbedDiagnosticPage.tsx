// src/pages/TabbedDiagnosticPage.tsx

import React, { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import BarChartComponent from '../components/BarChart.tsx';
import DiagnosticQuestionList from '../components/DiagnosticQuestionList.tsx';
import { PageConfig } from '../App.tsx'; // Import the config type

// Component now accepts setPageConfig as a prop
interface DiagnosticPageProps {
  setPageConfig: (config: PageConfig) => void;
}

type Tab = 'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY' | 'SUMMARY';

const TabbedDiagnosticPage: React.FC<DiagnosticPageProps> = ({ setPageConfig }) => {
	const maturityContext = useContext(MaturityContext);
	const [activeTab, setActiveTab] = useState<Tab>('STRATEGY');
	// Removed local state for darkMode, title etc. as it's now handled globally or passed in

	// --- Import/Export Logic ---
	const handleExport = useCallback(() => {
	  console.log("Exporting from Diagnostic Page...");
	  // Add your export logic here
	}, []);

	const handleImport = useCallback(() => {
	  console.log("Importing to Diagnostic Page...");
	  // Add your import logic here
	}, []);

	// --- useEffect Hook to Set Header Config ---
	useEffect(() => {
	  setPageConfig({
		title: 'Maturity Diagnostic',
		onImport: handleImport,
		onExport: handleExport,
	  });
	  // Clear the config when the component unmounts
	  return () => setPageConfig({ title: '' });
	}, [setPageConfig, handleImport, handleExport]);


	if (!maturityContext) { return <div>Loading...</div>; }
	const { scores, updateScore } = maturityContext;

	// ... (rest of the component logic remains the same)
	const chartData = useMemo(() => { /* ... */ }, [scores, activeTab]);
	const visibleQuestions = useMemo(() => { /* ... */ }, [activeTab]);
	const handleSelectScore = (dimensionName: string, score: number) => { updateScore(dimensionName, score); };

	return (
		// The outer div with dark mode class is no longer needed here
		<div className="max-w-7xl mx-auto p-6">
			{/* The old local Header component is now removed */}
			
			<div className="mt-4">
				{/* ... The rest of your JSX for tabs, charts, and questions ... */}
				{/* (This part of your code remains unchanged) */}
			</div>

			<DiagnosticQuestionList
				items={visibleQuestions}
				scores={scores}
				updateScore={handleSelectScore}
				darkMode={true} // Or pass this down from App if needed
			/>
			
			<div className="flex justify-end mt-8">
				<Link to="/prioritisation">Proceed to Prioritisation Tool →</Link>
			</div>
		</div>
	);
};

export default TabbedDiagnosticPage;