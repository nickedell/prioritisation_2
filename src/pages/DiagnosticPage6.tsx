// src/pages/DiagnosticPage6.tsx

import React, { useState, useRef, useEffect } from 'react'; // 1. Import useEffect
import { Tabs, Tab, Box } from '@mui/material';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 2. Define the interface for the props we now receive from App.tsx
interface DiagnosticPageProps {
  setPageActions: (actions: { onImport?: () => void; onExport?: () => void; }) => void;
}

const DiagnosticPage6: React.FC<DiagnosticPageProps> = ({ setPageActions }) => { // 3. Accept setPageActions
  const [selectedTab, setSelectedTab] = useState(0);

  const initialStrategyScores = { 'Vision and Mission': 0, 'Data Principles': 0, /* ...other scores */ };
  const initialImplementationScores = { /* ... */ };
  const initialServiceValueDeliveryScores = { /* ... */ };

  const [strategyScores, setStrategyScores] = useState(initialStrategyScores);
  const [implementationScores, setImplementationScores] = useState(initialImplementationScores);
  const [serviceValueDeliveryScores, setServiceValueDeliveryScores] = useState(initialServiceValueDeliveryScores);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // All the logic for import/export stays here
  const handleExportCSV = () => {
    const allScores = { ...strategyScores, ...implementationScores, ...serviceValueDeliveryScores };
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
  };

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

  const handleImportButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 4. Add the useEffect hook to communicate with App.tsx
  useEffect(() => {
    // When this page loads, give our functions to App.tsx
    setPageActions({
      onImport: handleImportButtonClick,
      onExport: handleExportCSV,
    });

    // When this page unloads, clean up by removing the functions
    return () => {
      setPageActions({});
    };
  }, [setPageActions]); // Dependency array

  // ... rest of the component logic like handleTabChange, getChartData, chartOptions ...
  const handleScoreChange = (category: string, dimension: string, newScore: number) => { /* ... */ };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setSelectedTab(newValue);
  const getChartData = () => { /* ... */ return { labels: [], datasets: [] }; };
  const chartOptions = { /* ... */ };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Maturity Diagnostic</h1>
      <p>Select a tab to view a category, then score each dimension.</p>
      
      {/* 5. The buttons are GONE from here */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportCSV}
        style={{ display: 'none' }}
        accept=".csv"
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '20px' }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Strategy" />
          <Tab label="Implementation" />
          <Tab label="Service & Value Delivery" />
          <Tab label="Summary" />
        </Tabs>
      </Box>

      {/* ... rest of your JSX ... */}
      <div style={{ marginTop: '20px' }}>
        <Bar data={getChartData()} options={chartOptions} />
      </div>

    </div>
  );
};

export default DiagnosticPage6;