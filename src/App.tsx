// src/App.tsx

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MaturityProvider } from './context/MaturityContext.tsx';
import TabbedDiagnosticPage from './pages/TabbedDiagnosticPage.tsx';
import PrioritisationPage from './pages/PrioritisationPage.tsx';
import Header from './components/Header.tsx';

// An interface to define the shape of the page's header configuration
export interface PageConfig {
  title: string;
  onImport?: () => void;
  onExport?: () => void;
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [pageConfig, setPageConfig] = useState<PageConfig>({ title: '' });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    // The Material-UI and other providers have been removed to use Tailwind primarily
    <div className={mode === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}>
      <MaturityProvider>
        {/* The <Router> component has been REMOVED from here */}
        <Header
          title={pageConfig.title}
          mode={mode}
          toggleTheme={toggleTheme}
          onImport={pageConfig.onImport}
          onExport={pageConfig.onExport}
        />
        <Routes>
          <Route path="/" element={<TabbedDiagnosticPage setPageConfig={setPageConfig} />} />
          <Route path="/prioritisation" element={<PrioritisationPage setPageConfig={setPageConfig} />} />
        </Routes>
      </MaturityProvider>
    </div>
  );
}

export default App;