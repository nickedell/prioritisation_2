// src/pages/TabbedDiagnosticPage.tsx

import React, { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic';
import { MaturityContext } from '../context/MaturityContext';
import BarChartComponent from '../components/BarChart';
import DiagnosticQuestionList from '../components/DiagnosticQuestionList';
import { PageConfig } from '../App'; // Import the config type

// Component now accepts setPageConfig as a prop
interface TabbedDiagnosticPageProps {
  setPageConfig: (config: PageConfig) => void;
}

const TabbedDiagnosticPage: React.FC<TabbedDiagnosticPageProps> = ({ setPageConfig }) => {
	const maturityContext = useContext(MaturityContext);
	const [activeTab, setActiveTab] = useState<'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY' | 'SUMMARY'>('STRATEGY');
	const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(null);

	// --- Import/Export Logic ---
	const handleExport = useCallback(() => {
	  // Your real export logic will go here
	  console.log("Exporting Diagnostic Data...");
	}, []);

	const handleImport = useCallback(() => {
	  // Your real import logic will go here
	  console.log("Importing Diagnostic Data...");
	}, []);

	// --- This useEffect hook tells the App what the header should look like ---
	useEffect(() => {
	  setPageConfig({
		title: 'Maturity Diagnostic',
		onImport: handleImport,
		onExport: handleExport,
	  });
	  // Cleanup function to reset the header when navigating away
	  return () => setPageConfig({ title: '' });
	}, [setPageConfig, handleImport, handleExport]);

	if (!maturityContext) { 
		return <div className="p-6">Loading...</div>; 
	}
	const { scores, updateScore } = maturityContext;

	// The rest of the component's logic for chartData, visibleQuestions, etc. remains here...
	const chartData = useMemo(() => {
		const category = activeTab !== 'SUMMARY' ? activeTab : '';
		return diagnosticData
			.filter(item => item && (activeTab === 'SUMMARY' || item.category === category))
			.map(item => ({
				dimension: item,
				name: item.name,
				score: scores[item.name] || 0,
			}));
	}, [scores, activeTab]);
	
	const visibleQuestions = useMemo(() => {
		if (activeTab === 'SUMMARY') return [];
		return diagnosticData.filter(item => item && item.category === activeTab);
	}, [activeTab]);

	const handleChartMouseEnter = useCallback((data: any) => {
		if (data && data.activePayload && data.activePayload[0] && data.activePayload[0].payload) {
			setHoveredDimension(data.activePayload[0].payload.dimension);
		}
	}, []);

	const handleChartMouseLeave = useCallback(() => { setHoveredDimension(null); }, []);
	const handleSelectScore = (dimensionName: string, score: number) => { updateScore(dimensionName, score); };

	// ... your tabClasses function ...

	return (
		<div className="max-w-7xl mx-auto p-6">
			{/* The old local Header component is now gone from here */}
			
			{/* All the rest of your page JSX for tabs, charts, etc. goes here */}
			<div className="flex border-b border-gray-700 mb-4">
			  {/* Tabs... */}
			</div>
			<div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-2/3">
						<BarChartComponent data={chartData} onMouseEnter={handleChartMouseEnter} onMouseLeave={handleChartMouseLeave} />
					</div>
					<div className="lg:w-1/3">
						{/* Description Panel... */}
					</div>
				</div>
			</div>
			<DiagnosticQuestionList items={visibleQuestions} scores={scores} updateScore={handleSelectScore} darkMode={true} />
			<div className="flex justify-end mt-8">
				<Link to="/prioritisation">Proceed to Prioritisation Tool →</Link>
			</div>
		</div>
	);
};

export default TabbedDiagnosticPage;