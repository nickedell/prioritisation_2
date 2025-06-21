// src/pages/TabbedDiagnosticPage.tsx

import React, { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticData, DiagnosticItem } from '../constants/diagnostic';
import { MaturityContext } from '../context/MaturityContext';
import BarChartComponent from '../components/BarChart';
import DiagnosticQuestionList from '../components/DiagnosticQuestionList';
import { PageConfig } from '../App';

interface TabbedDiagnosticPageProps {
  setPageConfig: (config: PageConfig) => void;
}

type Tab = 'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY' | 'SUMMARY';

const TabbedDiagnosticPage: React.FC<TabbedDiagnosticPageProps> = ({ setPageConfig }) => {
	const maturityContext = useContext(MaturityContext);
	const [activeTab, setActiveTab] = useState<Tab>('STRATEGY');
	const [hoveredDimension, setHoveredDimension] = useState<DiagnosticItem | null>(null);

	const handleExport = useCallback(() => { console.log("Exporting..."); }, []);
	const handleImport = useCallback(() => { console.log("Importing..."); }, []);

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
		// The outer div and the local Header have been removed to use the global ones from App.tsx
		<div className="max-w-7xl mx-auto p-6">
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
				darkMode={true}
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