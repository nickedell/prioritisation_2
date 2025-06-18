// src/pages/DiagnosticPage6.tsx

// 1. Import useCallback
import React, { useState, useRef, useEffect, useCallback } from 'react';
// ... other imports

const DiagnosticPage6: React.FC<DiagnosticPageProps> = ({ setPageActions }) => {
  // ... your existing state (scores, selectedTab, etc.)
  const [strategyScores, setStrategyScores] = useState(initialStrategyScores);
  const [implementationScores, setImplementationScores] = useState(initialImplementationScores);
  const [serviceValueDeliveryScores, setServiceValueDeliveryScores] = useState(initialServiceValueDeliveryScores);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 2. Wrap the handler functions in useCallback
  const handleExportCSV = useCallback(() => {
    const allScores = {
      ...strategyScores,
      ...implementationScores,
      ...serviceValueDeliveryScores,
    };
    // ... rest of the export logic ...
    const blob = new Blob([/* ... */], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'maturity_assessment.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [strategyScores, implementationScores, serviceValueDeliveryScores]); // Add dependencies

  const handleImportButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []); // Empty dependency array means this function never changes

  // The handleImportCSV function itself doesn't need to change as it's not passed in the effect
  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };

  // 3. Update the useEffect to depend on the new, stable functions
  useEffect(() => {
    setPageActions({
      onImport: handleImportButtonClick,
      onExport: handleExportCSV,
    });
    return () => {
      setPageActions({});
    };
  }, [setPageActions, handleImportButtonClick, handleExportCSV]); // Add the handlers here

  // ... rest of your component
  return (
    // ... your JSX
  );
};

export default DiagnosticPage6;