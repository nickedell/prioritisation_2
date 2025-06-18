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

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept=".csv"
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Business Impact (35%)</Typography>
              <Typography variant="body2">1=Minimal, 5=Critical</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Feasibility (30%)</Typography>
              <Typography variant="body2">1=Very Hard, 5=Very Easy</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Political Viability (20%)</Typography>
              <Typography variant="body2">1=Strong Resistance, 5=Strong Support</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Foundation Building (15%)</Typography>
              <Typography variant="body2">1=Standalone, 5=Critical Foundation</Typography>
            </CardContent>
          </Card>
        </grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>Input Scores</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TOM Dimension</TableCell>
                <TableCell>Maturity Score</TableCell>
                <TableCell>Business Impact</TableCell>
                <TableCell>Feasibility</TableCell>
                <TableCell>Political Viability</TableCell>
                <TableCell>Foundation Building</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {priorities.map((p, index) => (
                <TableRow key={p.name}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.score}</TableCell>
                  {['businessImpact', 'feasibility', 'politicalViability', 'foundationBuilding'].map(factor => (
                    <TableCell key={factor}>
                      <Tooltip title={(p as any)[factor]}>
                        <Slider
                          value={(p as any)[factor]}
                          onChange={(_, value) => handleSliderChange(index, factor, value as number)}
                          min={1}
                          max={5}
                          step={1}
                          marks
                        />
                      </Tooltip>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>Prioritised Results</Typography>
          <Table>
            <TableBody>
              {sortedPriorities.map((p, index) => (
                <TableRow key={p.name}>
                  <TableCell>
                    <Typography variant="body1">#{index + 1} {p.name}</Typography>
                    <Typography variant="caption">{p.category}</Typography>
                  </TableCell>
                  <TableCell>{p.finalPriority.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrioritisationResults;