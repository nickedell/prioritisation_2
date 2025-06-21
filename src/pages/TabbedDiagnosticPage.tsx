// src/pages/TabbedDiagnosticPage.tsx

import React, { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic';
import { MaturityContext } from '../context/MaturityContext';
import BarChartComponent from '../components/BarChart';
import DiagnosticQuestionList from '../components/DiagnosticQuestionList';
import { PageConfig } from '../App'; // Import the config type from App

// Define the props this page component accepts
interface TabbedDiagnosticPageProps {
  setPageConfig: (config: PageConfig) => void;
}

const TabbedDiagnosticPage: React.FC<TabbedDiagnosticPageProps> = ({ setPageConfig }) => {
	const maturityContext = useContext(MaturityContext);
	const [activeTab, setActiveTab] = useState<'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY' | 'SUMMARY'>('STRATEGY');
	const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(null);

	// Placeholder functions for the buttons
	const handleExport = useCallback(() => { console.log("Exporting..."); }, []);
	const handleImport = useCallback(() => { console.log("Importing..."); }, []);

	// This hook runs when the page loads and tells the App what to put in the header
	useEffect(() => {
	  setPageConfig({
		title: 'Maturity Diagnostic',
		onImport: handleImport,
		onExport: handleExport,
	  });
	  // Resets the header when we navigate away from this page
	  return () => setPageConfig({ title: '' });
	}, [setPageConfig, handleImport, handleExport]);

	// The rest of your component logic...
	if (!maturityContext) { return <div className="p-6">Loading...</div>; }
	const { scores, updateScore } = maturityContext;
	const chartData = useMemo(() => {
		return diagnosticData
			.filter(item => activeTab === 'SUMMARY' || item.category === activeTab)
			.map(item => ({ dimension: item, name: item.name, score: scores[item.name] || 0	}));
	}, [scores, activeTab]);
	const visibleQuestions = useMemo(() => {
		if (activeTab === 'SUMMARY') return [];
		return diagnosticData.filter(item => item.category === activeTab);
	}, [activeTab]);
	const handleChartMouseEnter = useCallback((data: any) => { /* ... */ }, []);
	const handleChartMouseLeave = useCallback(() => { /* ... */ }, []);
	const handleSelectScore = (dimensionName: string, score: number) => { updateScore(dimensionName, score); };
	const tabClasses = (tabName: any) => `px-4 py-2 font-semibold ...`;

	return (
		<div className="max-w-7xl mx-auto p-6">
			{/* The local Header component has been removed from here */}

			{/* All the rest of your page content (tabs, chart, questions) goes here */}
			{/* ... */}
		</div>
	);
};

export default TabbedDiagnosticPage;