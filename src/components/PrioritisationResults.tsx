import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Slider,
  Tooltip,
} from '@mui/material';

interface PrioritisationResultsProps {
  setPageActions: (actions: { onImport?: () => void; onExport?: () => void; }) => void;
}

const PrioritisationResults: React.FC<PrioritisationResultsProps> = ({ setPageActions }) => {
  const [priorities, setPriorities] = useState([
    { name: 'Vision and Mission', category: 'STRATEGY', score: 0, businessImpact: 0, feasibility: 0, politicalViability: 0, foundationBuilding: 0, finalPriority: 0 },
    { name: 'Data Principles', category: 'STRATEGY', score: 0, businessImpact: 0, feasibility: 0, politicalViability: 0, foundationBuilding: 0, finalPriority: 0 },
    { name: 'Data Strategy Alignment', category: 'STRATEGY', score: 0, businessImpact: 0, feasibility: 0, politicalViability: 0, foundationBuilding: 0, finalPriority: 0 },
    { name: 'Value Definition & Attribution', category: 'STRATEGY', score: 0, businessImpact: 0, feasibility: 0, politicalViability: 0, foundationBuilding: 0, finalPriority: 0 },
    { name: 'Governance Framework', category: 'Governance', score: 0, businessImpact: 0, feasibility: 0, politicalViability: 0, foundationBuilding: 0, finalPriority: 0 },
    { name: 'Risk Management', category: 'Governance', score: 0, businessImpact: 0, feasibility: 0, politicalViability: 0, foundationBuilding: 0, finalPriority: 0 },
    { name: 'Compliance', category: 'Governance', score: 0, businessImpact: 0, feasibility: 0, politicalViability: 0, foundationBuilding: 0, finalPriority: 0 },
    { name: 'Data Ethics', category: 'Governance', score: 0, businessImpact: 0, feasibility: 0, politicalViability: 0, foundationBuilding: 0, finalPriority: 0 },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const weights = {
    businessImpact: 0.35,
    feasibility: 0.30,
    politicalViability: 0.20,
    foundationBuilding: 0.15,
  };

  const handleSliderChange = (index: number, factor: string, value: number) => {
    const newPriorities = [...priorities];
    (newPriorities[index] as any)[factor] = value;
    newPriorities[index].finalPriority =
      newPriorities[index].businessImpact * weights.businessImpact +
      newPriorities[index].feasibility * weights.feasibility +
      newPriorities[index].politicalViability * weights.politicalViability +
      newPriorities[index].foundationBuilding * weights.foundationBuilding;
    setPriorities(newPriorities);
  };

  const sortedPriorities = [...priorities].sort((a, b) => b.finalPriority - a.finalPriority);

  const exportToCsv = useCallback(() => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Category,Maturity Score,Business Impact,Feasibility,Political Viability,Foundation Building,Final Priority\n";
    priorities.forEach(p => {
      const row = [p.name, p.category, p.score, p.businessImpact, p.feasibility, p.politicalViability, p.foundationBuilding, p.finalPriority.toFixed(2)].join(",");
      csvContent += row + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "prioritisation_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [priorities]);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const text = e.target?.result as string;
        const lines = text.split('\n').slice(1);
        const newPriorities = [...priorities];
        lines.forEach((line, i) => {
          if (i < newPriorities.length) {
            const parts = line.split(',');
            newPriorities[i].score = parseInt(parts[2], 10) || 0;
            newPriorities[i].businessImpact = parseInt(parts[3], 10) || 0;
            newPriorities[i].feasibility = parseInt(parts[4], 10) || 0;
            newPriorities[i].politicalViability = parseInt(parts[5], 10) || 0;
            newPriorities[i].foundationBuilding = parseInt(parts[6], 10) || 0;
            newPriorities[i].finalPriority = parseFloat(parts[7]) || 0;
          }
        });
        setPriorities(newPriorities);
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    setPageActions({
      onImport: handleImportClick,
      onExport: exportToCsv,
    });
    return () => {
      setPageActions({});
    };
  }, [setPageActions, handleImportClick, exportToCsv]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>TOM Prioritisation Tool</Typography>
      <Typography variant="body1" gutterBottom>
        Score each dimension on a 1-5 scale. The tool will automatically calculate priorities and apply special filters.
      </Typography>