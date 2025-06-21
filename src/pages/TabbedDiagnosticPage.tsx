// src/pages/TabbedDiagnosticPage.tsx

import React, { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic';
import { MaturityContext } from '../context/MaturityContext';
import BarChartComponent from '../components/BarChart';
import DiagnosticQuestionList from '../components/DiagnosticQuestionList';
import { PageConfig } from '../App';
import Header from '../components/Header'; // This should be the page-level header

interface TabbedDiagnosticPageProps {
  setPageConfig: (config: PageConfig) => void;
}

const TabbedDiagnosticPage: React.FC<TabbedDiagnosticPageProps> = ({ setPageConfig }) => {
	const maturityContext = useContext(MaturityContext);
	const [activeTab, setActiveTab] = useState<'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY' | 'SUMMARY'>('STRATEGY');
	const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(null);

	// --- Stabilized Import/Export Handlers ---
	const handleExport = useCallback(() => {
	  console.log("Exporting...");
	}, []);

	const handleImport = useCallback(() => {
	  console.log("Importing...");
	}, []);

	// --- useEffect to update the global header ---
	useEffect(() => {
	  setPageConfig({
		title: 'Maturity Diagnostic',
		onImport: handleImport,
		onExport: handleExport,
	  });
	  return () => {
		setPageConfig({ title: '' });
	  };
	}, [setPageConfig, handleImport, handleExport]); // Dependencies are now stable

	if (!maturityContext) { return <div>Loading...</div>; }
	const { scores, updateScore } = maturityContext;

	// ... (Your existing useMemo and handler logic remains here)
	const chartData = useMemo(() => {
		return diagnosticData
			.filter(item => activeTab === 'SUMMARY' || item.category === activeTab)
			.map(item => ({ dimension: item, name: item.name, score: scores[item.name] || 0	}));
	}, [scores, activeTab]);
	const visibleQuestions = useMemo(() => {
		if (activeTab === 'SUMMARY') return [];
		return diagnosticData.filter(item => item.category === activeTab);
	}, [activeTab]);
	const handleSelectScore = (dimensionName: string, score: number) => { updateScore(dimensionName, score); };
	const handleChartMouseEnter = (data: any) => { /* ... */ };
	const handleChartMouseLeave = () => { /* ... */ };
	const tabClasses = (tabName: any) => `px-4 py-2 font-semibold ...`;


	return (
		<div className="max-w-7xl mx-auto p-6">
			{/* The Header component is no longer rendered here, as it's global in App.tsx */}
			
			<div className="flex border-b border-gray-700 mb-4">
			  {/* Tabs... */}
			</div>
			<div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-2/3">
						<BarChartComponent data={chartData} onMouseEnter={handleChartMouseEnter} onMouseLeave={handleChartMouseLeave} />
					</div>
					<div className="lg:w-1/3">
						<h3 className="text-lg font-semibold">Dimension Details</h3>
						<div className="p-4 bg-gray-900 rounded-md min-h-[300px]">
							{/* ... description panel JSX ... */}
						</div>
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