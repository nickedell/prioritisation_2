// src/components/Header.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

// Define the types for the props our Header will accept
interface HeaderProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  // Add optional onImport and onExport functions to the props
  onImport?: () => void;
  onExport?: () => void;
}

const Header: React.FC<HeaderProps> = ({ mode, toggleTheme, onImport, onExport }) => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TOM Prioritisation Tool
        </Typography>

        {/* Conditionally render the Import/Export buttons */}
        {onImport && (
          <Button color="inherit" onClick={onImport}>
            Import CSV
          </Button>
        )}
        {onExport && (
          <Button color="inherit" onClick={onExport} sx={{ ml: 1 }}>
            Export CSV
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