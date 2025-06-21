// src/pages/TabbedDiagnosticPage.tsx

import React, { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic';
import { MaturityContext } from '../context/MaturityContext';
import BarChartComponent from '../components/BarChart';
import DiagnosticQuestionList from '../components/DiagnosticQuestionList';
import { PageConfig } from '../App';

interface DiagnosticPageProps {
  setPageConfig: (config: PageConfig) => void;
}

type Tab = 'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY' | 'SUMMARY';

const TabbedDiagnosticPage: React.FC<DiagnosticPageProps> = ({ setPageConfig }) => {
	const maturityContext = useContext(MaturityContext);
	const [activeTab, setActiveTab] = useState<Tab>('STRATEGY');

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
	  return () => setPageConfig({ title: '' });
	}, [setPageConfig, handleImport, handleExport]);

	if (!maturityContext) { 
		return <div>Loading Context...</div>; 
	}
	const { scores, updateScore } = maturityContext;

	// --- CORRECTED LOGIC ---
	// This now correctly calculates the data for the chart based on the active tab.
	const chartData = useMemo(() => {
		const category = activeTab !== 'SUMMARY' ? activeTab : '';
		return diagnosticData
			.filter(item => item && (activeTab === 'SUMMARY' || item.category === category))
			.map(item => ({
				name: item.name, // The barchart expects a 'name' property
				score: scores[item.name] || 0,
			}));
	}, [scores, activeTab]);
	
	// This now correctly calculates the questions to display based on the active tab.
	const visibleQuestions = useMemo(() => {
		if (activeTab === 'SUMMARY') return []; // Don't show question list on summary tab
		return diagnosticData.filter(item => item && item.category === activeTab);
	}, [activeTab]);
	// --- END CORRECTION ---

	const handleSelectScore = (dimensionName: string, score: number) => { 
		updateScore(dimensionName, score); 
	};

	const tabClasses = (tabName: Tab) => 
		`px-4 py-2 font-semibold rounded-t-lg transition-colors border-b-2 ${
			activeTab === tabName 
			? 'border-blue-500' 
			: 'border-transparent hover:border-gray-500'
		}`;

	return (
		<div className="max-w-7xl mx-auto p-6">
			<div className="flex border-b border-gray-700 mb-4">
				<button className={tabClasses('STRATEGY')} onClick={() => setActiveTab('STRATEGY')}>Strategy</button>
				<button className={tabClasses('IMPLEMENTATION')} onClick={() => setActiveTab('IMPLEMENTATION')}>Implementation</button>
				<button className={tabClasses('SERVICE & VALUE DELIVERY')} onClick={() => setActiveTab('SERVICE & VALUE DELIVERY')}>Service & Value Delivery</button>
				<button className={tabClasses('SUMMARY')} onClick={() => setActiveTab('SUMMARY')}>Summary</button>
			</div>
			
			<div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
				<BarChartComponent data={chartData} />
			</div>

			<DiagnosticQuestionList
				items={visibleQuestions}
				scores={scores}
				updateScore={handleSelectScore}
			/>
			
			<div className="flex justify-end mt-8">
				<Link to="/prioritisation" className="px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600">
					Proceed to Prioritisation Tool →
				</Link>
			</div>
		</div>
	);
};

export default TabbedDiagnosticPage;