import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import VisionAndMission from '../components/dimensions/VisionAndMission';
import DataPrinciples from '../components/dimensions/DataPrinciples';
import DataStrategyAlignment from '../components/dimensions/DataStrategyAlignment';
import ValueDefinition from '../components/dimensions/ValueDefinition';
import GovernanceFramework from '../components/dimensions/GovernanceFramework';
import RiskManagement from '../components/dimensions/RiskManagement';
import Compliance from '../components/dimensions/Compliance';
import DataEthics from '../components/dimensions/DataEthics';

// Define the Props interface
interface DiagnosticPageProps {
  setPageActions: (actions: { onImport?: () => void; onExport?: () => void; }) => void;
}

const DiagnosticPage6: React.FC<DiagnosticPageProps> = ({ setPageActions }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const initialStrategyScores = {
    'Vision and Mission': 0,
    'Data Principles': 0,
    'Data Strategy Alignment': 0,
    'Value Definition & Attribution': 0,
  };
  const initialImplementationScores = {
    'Governance Framework': 0,
    'Risk Management': 0,
    'Compliance': 0,
    'Data Ethics': 0,
  };
  const initialServiceValueDeliveryScores = {
    'Data Quality': 0,
    'Data Accessibility': 0,
    'Data Literacy': 0,
    'Technology and Tools': 0,
  };

  const [strategyScores, setStrategyScores] = useState(initialStrategyScores);
  const [implementationScores, setImplementationScores] = useState(initialImplementationScores);
  const [serviceValueDeliveryScores, setServiceValueDeliveryScores] = useState(initialServiceValueDeliveryScores);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleScoreChange = (category: string, dimension: string, newScore: number) => {
    switch (category) {
      case 'strategy':
        setStrategyScores(prev => ({ ...prev, [dimension]: newScore }));
        break;
      case 'implementation':
        setImplementationScores(prev => ({ ...prev, [dimension]: newScore }));
        break;
      case 'serviceValueDelivery':
        setServiceValueDeliveryScores(prev => ({ ...prev, [dimension]: newScore }));
        break;
      default:
        break;
    }
  };

  const handleExportCSV = useCallback(() => {
    const allScores = {
      ...strategyScores,
      ...implementationScores,
      ...serviceValueDeliveryScores,
    };
    let csvString = 'Dimension,Score\n';
    for (const [key, value] of Object.entries(allScores)) {
      const formattedKey = `"${key.replace(/"/g, '""')}"`;
      csvString += `${formattedKey},${value}\n`;
    }
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'maturity_assessment.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [strategyScores, implementationScores, serviceValueDeliveryScores]);

  const handleImportButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').slice(1);
      const newStrategyScores = { ...initialStrategyScores };
      const newImplementationScores = { ...initialImplementationScores };
      const newServiceValueDeliveryScores = { ...initialServiceValueDeliveryScores };
      lines.forEach(line => {
        if (line.trim() === '') return;
        const match = line.match(/"([^"]+)",(\d+)/);
        if (match) {
          const dimension = match[1];
          const score = parseInt(match[2], 10);
          if (dimension in newStrategyScores) newStrategyScores[dimension] = score;
          else if (dimension in newImplementationScores) newImplementationScores[dimension] = score;
          else if (dimension in newServiceValueDeliveryScores) newServiceValueDeliveryScores[dimension] = score;
        }
      });
      setStrategyScores(newStrategyScores);
      setImplementationScores(newImplementationScores);
      setServiceValueDeliveryScores(newServiceValueDeliveryScores);
    };
    reader.readAsText(file);
  };
  
  useEffect(() => {
    setPageActions({
      onImport: handleImportButtonClick,
      onExport: handleExportCSV,
    });
    return () => {
      setPageActions({});
    };
  }, [setPageActions, handleImportButtonClick, handleExportCSV]);

  const getChartData = () => {
    let labels: string[] = [];
    let data: number[] = [];
    let scores: { [key: string]: number } = {};
    switch (selectedTab) {
      case 0: scores = strategyScores; break;
      case 1: scores = implementationScores; break;
      case 2: scores = serviceValueDeliveryScores; break;
      default: return { labels: [], datasets: [] };
    }
    labels = Object.keys(scores);
    data = Object.values(scores);
    return {
      labels,
      datasets: [{
        label: 'Score',
        data,
        backgroundColor: 'rgba(128, 90, 213, 0.5)',
        borderColor: 'rgba(128, 90, 213, 1)',
        borderWidth: 1,
      }],
    };
  };

  const chartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1, color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        ticks: { color: '#fff' },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `Score: ${context.raw}`,
        },
      },
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Maturity Diagnostic</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>Select a tab to view a category, then score each dimension.</Typography>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportCSV}
        style={{ display: 'none' }}
        accept=".csv"
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="maturity diagnostic tabs">
          <Tab label="Strategy" />
          <Tab label="Implementation" />
          <Tab label="Service & Value Delivery" />
          <Tab label="Summary" />
        </Tabs>
      </Box>

      <Box sx={{ mt: 3, height: '300px' }}>
        {selectedTab < 3 && <Bar options={chartOptions} data={getChartData()} />}
        {selectedTab === 3 && <Typography>Summary coming soon.</Typography>}
      </Box>

      <Box sx={{ mt: 3 }}>
        {selectedTab === 0 && (
          <>
            <VisionAndMission scores={strategyScores} onScoreChange={(dim, score) => handleScoreChange('strategy', dim, score)} />
            <DataPrinciples scores={strategyScores} onScoreChange={(dim, score) => handleScoreChange('strategy', dim, score)} />
            <DataStrategyAlignment scores={strategyScores} onScoreChange={(dim, score) => handleScoreChange('strategy', dim, score)} />
            <ValueDefinition scores={strategyScores} onScoreChange={(dim, score) => handleScoreChange('strategy', dim, score)} />
          </>
        )}
        {selectedTab === 1 && (
          <>
            <GovernanceFramework scores={implementationScores} onScoreChange={(dim, score) => handleScoreChange('implementation', dim, score)} />
            <RiskManagement scores={implementationScores} onScoreChange={(dim, score) => handleScoreChange('implementation', dim, score)} />
            <Compliance scores={implementationScores} onScoreChange={(dim, score) => handleScoreChange('implementation', dim, score)} />
            <DataEthics scores={implementationScores} onScoreChange={(dim, score) => handleScoreChange('implementation', dim, score)} />
          </>
        )}
        {/* Add components for Service & Value Delivery when they are ready */}
      </Box>
    </Box>
  );
};

export default DiagnosticPage6;