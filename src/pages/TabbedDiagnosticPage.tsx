// src/pages/TabbedDiagnosticPage.tsx

// CORRECTED: Added useEffect to the import list from React
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic';
import { MaturityContext } from '../context/MaturityContext';
import BarChartComponent from '../components/BarChart';
import Header from '../components/Header';
import DiagnosticQuestionList from '../components/DiagnosticQuestionList';
import { PageConfig } from '../App';

interface DiagnosticPageProps {
  setPageConfig: (config: PageConfig) => void;
}

type Tab = 'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY' | 'SUMMARY';

const TabbedDiagnosticPage: React.FC<DiagnosticPageProps> = ({ setPageConfig }) => {
	const maturityContext = useContext(MaturityContext);
	const [activeTab, setActiveTab] = useState<Tab>('STRATEGY');
	const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(null);
	const [darkMode, setDarkMode] = useState(true); 

	// This useEffect hook sets the header title. It now works because it's imported.
	useEffect(() => {
		setPageConfig({ title: 'Maturity Diagnostic' });
		return () => setPageConfig({ title: '' });
	}, [setPageConfig]);

	if (!maturityContext) { 
		return <div>Loading Context...</div>; 
	}
	const { scores, updateScore } = maturityContext;

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

	const handleChartMouseEnter = (data: any) => {
		if (data && data.activePayload && data.activePayload[0] && data.activePayload[0].payload) {
			setHoveredDimension(data.activePayload[0].payload.dimension);
		}
	};

	const handleChartMouseLeave = () => {
		setHoveredDimension(null);
	};

	const handleSelectScore = (dimensionName: string, score: number) => { 
		updateScore(dimensionName, score); 
	};

	const tabClasses = (tabName: Tab) => 
		`px-4 py-2 font-semibold rounded-t-lg transition-colors border-b-2 ${
			activeTab === tabName 
			? 'bg-gray-800 text-white border-blue-500' 
			: 'bg-gray-900 text-gray-400 hover:bg-gray-700 border-transparent'
		}`;

	return (
		<div className={darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}>
			<div className="max-w-7xl mx-auto p-6 min-h-screen">
				<Header
					title="Maturity Diagnostic"
					subtitle="Select a tab to view a category, then score each dimension."
					darkMode={darkMode}
					setDarkMode={setDarkMode}
					showDevTag={true}
				/>
				
				<div className="mt-4">
					<div className="flex border-b border-gray-700">
						<button className={tabClasses('STRATEGY')} onClick={() => setActiveTab('STRATEGY')}>Strategy</button>
						<button className={tabClasses('IMPLEMENTATION')} onClick={() => setActiveTab('IMPLEMENTATION')}>Implementation</button>
						<button className={tabClasses('SERVICE & VALUE DELIVERY')} onClick={() => setActiveTab('SERVICE & VALUE DELIVERY')}>Service & Value Delivery</button>
						<button className={tabClasses('SUMMARY')} onClick={() => setActiveTab('SUMMARY')}>Summary</button>
					</div>

					<div className="p-6 bg-gray-800 rounded-b-lg border border-t-0 border-gray-700">
						<div className="flex flex-col lg:flex-row gap-8">
							<div className="lg:w-2/3">
								<BarChartComponent 
									data={chartData}
									onMouseEnter={handleChartMouseEnter}
									onMouseLeave={handleChartMouseLeave}
								/>
							</div>
							<div className="lg: