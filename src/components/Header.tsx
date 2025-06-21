// src/components/Header.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface HeaderProps {
  title: string; // The title is now a prop
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  onImport?: () => void;
  onExport?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, mode, toggleTheme, onImport, onExport }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* The Typography component now displays the title from props */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

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