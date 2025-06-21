// src/pages/TabbedDiagnosticPage.tsx

import React, { useContext, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic';
import { MaturityContext } from '../context/MaturityContext';
import BarChartComponent from '../components/BarChart';
import DiagnosticQuestionList from '../components/DiagnosticQuestionList';
import Header from '../components/Header'; // Using the page-specific header
import { PageConfig } from '../App';

interface DiagnosticPageProps {
  setPageConfig: (config: PageConfig) => void;
}

type Tab = 'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY' | 'SUMMARY';

const TabbedDiagnosticPage: React.FC<DiagnosticPageProps> = ({ setPageConfig }) => {
	const maturityContext = useContext(MaturityContext);
	const [activeTab, setActiveTab] = useState<Tab>('STRATEGY');
	const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(null);
	const [darkMode, setDarkMode] = useState(true); // Added darkMode state back for local control

	// --- useEffect Hook to Set Header Config ---
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
				dimension: item, // Pass the full item to the chart
				name: item.name,
				score: scores[item.name] || 0,
			}));
	}, [scores, activeTab]);
	
	const visibleQuestions = useMemo(() => {
		if (activeTab === 'SUMMARY') return [];
		return diagnosticData.filter(item => item && item.category === activeTab);
	}, [activeTab]);

	// Handlers for chart hover to show description
	const handleChartMouseEnter = useCallback((data: any) => {
		if (data && data.activePayload && data.activePayload[0] && data.activePayload[0].payload) {
			setHoveredDimension(data.activePayload[0].payload.dimension);
		}
	}, []);

	const handleChartMouseLeave = useCallback(() => {
		setHoveredDimension(null);
	}, []);

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
				{/* This uses the simpler, local Page Header */}
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

					{/* --- CORRECTED TWO-COLUMN LAYOUT --- */}
					<div className="p-6 bg-gray-800 rounded-b-lg border border-t-0 border-gray-700">
						<div className="flex flex-col lg:flex-row gap-8">
							{/* Left Column: Chart (2/3 width on large screens) */}
							<div className="lg:w-2/3">
								<BarChartComponent 
									data={chartData}
									onMouseEnter={handleChartMouseEnter}
									onMouseLeave={handleChartMouseLeave}
								/>
							</div>
							{/* Right Column: Dimension Details (1/3 width on large screens) */}
							<div className="lg:w-1/3">
								<h3 className="text-lg font-semibold mb-2">Dimension Details</h3>
								<div className="p-4 bg-gray-900 rounded-md min-h-[300px]">
									{hoveredDimension ? (
										<>
											<h4 className="font-bold text-white">{hoveredDimension.name}</h4>
											<p className="text-sm text-gray-400 mt-2">{hoveredDimension.description}</p>
										</>
									) : (
										<div className="h-full flex items-center justify-center">
											<p className="text-gray-500">Hover over a bar to see details</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<DiagnosticQuestionList
					items={visibleQuestions}
					scores={scores}
					updateScore={handleSelectScore}
					darkMode={darkMode}
				/>
				
				<div className="flex justify-end mt-8">
					<Link to="/prioritisation" className="px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600">
						Proceed to Prioritisation Tool →
					</Link>
				</div>
			</div>
		</div>
	);
};

export default TabbedDiagnosticPage;