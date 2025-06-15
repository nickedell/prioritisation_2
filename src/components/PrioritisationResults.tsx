import { useState, useContext, useEffect } from 'react';
import { initialTomDimensions } from '../constants/dimensions.ts';
import { TOMDimension, Weights } from '../types/index.ts';
import { usePrioritisation } from '../hooks/usePrioritisation.ts';
import { MaturityContext } from '../context/MaturityContext.tsx';
import Header from '../components/Header.tsx';
import Configuration from '../components/Configuration.tsx';
import DimensionTable from '../components/DimensionTable.tsx';
import PrioritisationResults from '../components/PrioritisationResults.tsx';

const PrioritisationPage = () => {
    const [tomDimensions, setTomDimensions] = useState<TOMDimension[]>(initialTomDimensions);
    const [darkMode, setDarkMode] = useState(true);
    const [weights, setWeights] = useState<Weights>({
        businessImpact: 35,
        feasibility: 30,
        political: 20,
        foundation: 15
    });
    
    const maturityContext = useContext(MaturityContext);
    const prioritisedDimensions = usePrioritisation(tomDimensions, weights);

    useEffect(() => {
        if (maturityContext && Object.keys(maturityContext.scores).length > 0) {
            const newDimensions = tomDimensions.map(dim => {
                const newScore = maturityContext.scores[dim.name];
                if (newScore !== undefined) {
                    return { ...dim, currentScore: newScore };
                }
                return dim;
            });
            setTomDimensions(newDimensions);
        }
    }, [maturityContext]);

    const updateScore = (id: number, field: keyof TOMDimension, value: string | number) => {
        setTomDimensions(prev =>
            prev.map(dim =>
                dim.id === id ? {
                    ...dim,
                    [field]: typeof value === 'string' ? (field === 'currentScore' ? parseFloat(value) : parseInt(value)) || 0 : value
                } : dim
            )
        );
    };

    // UPDATE: Restoring the handler functions
    const handleExport = () => {
        const headers = ['Rank', 'TOM Dimension', 'Category', 'Sub Dimension', 'Maturity Score', 'Business Impact', 'Feasibility', 'Political Viability', 'Foundation Building'];
        const csvData = prioritisedDimensions.map((dim, index) => [
            index + 1, dim.name, dim.category, dim.subDimension || '', dim.currentScore, dim.businessImpact,
            dim.feasibility, dim.political, dim.foundation
        ]);
        const csvContent = [headers, ...csvData].map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'tom-prioritisation-scores.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const rows = text.split('\n').slice(1);
            const newDimensions = tomDimensions.map(d => ({ ...d }));
            const headerRow = text.split('\n')[0].split(',').map(h => h.replace(/"/g, '').trim());
            const nameIndex = headerRow.indexOf('TOM Dimension');
            const maturityIndex = headerRow.indexOf('Maturity Score');
            const businessImpactIndex = headerRow.indexOf('Business Impact');
            const feasibilityIndex = headerRow.indexOf('Feasibility');
            const politicalIndex = headerRow.indexOf('Political Viability');
            const foundationIndex = headerRow.indexOf('Foundation Building');
            rows.forEach(row => {
                if (row.trim() === '') return;
                const columns = row.trim().split(',');
                const name = columns[nameIndex]?.replace(/"/g, '').trim();
                const dimension = newDimensions.find(d => d.name === name);
                if (dimension) {
                    dimension.currentScore = parseFloat(columns[maturityIndex]?.replace(/"/g, '')) || 0;
                    dimension.businessImpact = parseInt(columns[businessImpactIndex]?.replace(/"/g, '')) || 0;
                    dimension.feasibility = parseInt(columns[feasibilityIndex]?.replace(/"/g, '')) || 0;
                    dimension.political = parseInt(columns[politicalIndex]?.replace(/"/g, '')) || 0;
                    dimension.foundation = parseInt(columns[foundationIndex]?.replace(/"/g, '')) || 0;
                }
            });
            setTomDimensions(newDimensions);
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <div className={`max-w-7xl mx-