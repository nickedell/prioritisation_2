// src/App.tsx

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MaturityProvider } from './context/MaturityContext.tsx';
import TabbedDiagnosticPage from './pages/TabbedDiagnosticPage.tsx';
import PrioritisationPage from './pages/PrioritisationPage.tsx';
import Header from './components/Header.tsx';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Interface for the header configuration that pages will send up
export interface PageConfig {
  title: string;
  onImport?: () => void;
  onExport?: () => void;
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  // State to hold the current page's header configuration
  const [pageConfig, setPageConfig] = useState<PageConfig>({ title: 'Loading...' });

  // Create a theme instance based on the current mode
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        // Using a dark blue for the header as a base
        main: mode === 'dark' ? '#1E40AF' : '#2563EB',
      },
      background: {
        default: mode === 'dark' ? '#111827' : '#F9FAFB',
        paper: mode === 'dark' ? '#1F2937' : '#FFFFFF',
      },
      text: {
          primary: mode === 'dark' ? '#F9FAFB' : '#111827',
          secondary: mode === 'dark' ? '#9CA3AF' : '#6B7280',
      }
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MaturityProvider>
        {/* The single global Header receives its configuration from App's state */}
        <Header
          title={pageConfig.title}
          mode={mode}
          toggleTheme={toggleTheme}
          onImport={pageConfig.onImport}
          onExport={pageConfig.onExport}
        />
        <Routes>
          {/* Each page is given the function to set the header's configuration */}
          <Route path="/" element={<TabbedDiagnosticPage setPageConfig={setPageConfig} />} />
          <Route path="/prioritisation" element={<PrioritisationPage setPageConfig={setPageConfig} />} />
        </Routes>
      </MaturityProvider>
    </ThemeProvider>
  );
}

export default App;