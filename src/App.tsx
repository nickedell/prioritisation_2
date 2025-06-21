// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MaturityProvider } from './context/MaturityContext';
import TabbedDiagnosticPage from './pages/TabbedDiagnosticPage';
import Header from './components/Header';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Interface to define the header's configuration
export interface PageConfig {
  title: string;
  onImport?: () => void;
  onExport?: () => void;
}

// A simple placeholder for the prioritisation page
const PrioritisationPage = () => <div style={{padding: '2rem'}}>Prioritisation Page Content</div>;

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [pageConfig, setPageConfig] = useState<PageConfig>({ title: '' });

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MaturityProvider>
        <Router>
          <Header
            title={pageConfig.title}
            mode={mode}
            toggleTheme={toggleTheme}
            onImport={pageConfig.onImport}
            onExport={pageConfig.onExport}
          />
          <Routes>
            <Route path="/" element={<TabbedDiagnosticPage setPageConfig={setPageConfig} />} />
            <Route path="/prioritisation" element={<PrioritisationPage />} />
          </Routes>
        </Router>
      </MaturityProvider>
    </ThemeProvider>
  );
}

export default App;