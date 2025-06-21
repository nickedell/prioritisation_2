// src/components/Header.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface HeaderProps {
  // NEW: Added a title prop
  title: string; 
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  onImport?: () => void;
  onExport?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, mode, toggleTheme, onImport, onExport }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* UPDATE: The title is now dynamic */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {/* These buttons will now appear or disappear based on the page */}
        {onImport && (
          <Button color="inherit" onClick={onImport}>
            Upload CSV
          </Button>
        )}
        {onExport && (
          <Button color="inherit" onClick={onExport} sx={{ ml: 1 }}>
            Download CSV
          </Button>
        )}

        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;