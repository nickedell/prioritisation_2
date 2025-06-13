import { useMemo } from 'react';
import { TOMDimension, PrioritisedDimension, Weights } from '../types';

// Helper function to detect paradoxes
const detectParadox = (dim: TOMDimension) => {
  const selectedScores = [dim.businessImpact, dim.feasibility, dim.political, dim.foundation].filter(score => score > 0);
  
  if (selectedScores.length < 2) {
    return { isParadox: false, description: '' };
  }
  
  const maxScore = Math.max(...selectedScores);
  const minScore = Math.min(...selectedScores);
  
  const hasSignificantGap = maxScore >= 4 && minScore <= 2 && (maxScore - minScore) >= 2;
  
  if (hasSignificantGap) {
    const criteriaNames = ['Business Impact', 'Feasibility', 'Political Viability', 'Foundation Building'];
    const criteriaValues = [dim.businessImpact, dim.feasibility, dim.political, dim.foundation];
    
    const highCriteria = criteriaNames.filter((_, index) => criteriaValues[index] === maxScore && criteriaValues[index] > 0);
    const lowCriteria = criteriaNames.filter((_, index) => criteriaValues[index] === minScore && criteriaValues[index] > 0);
    
    return {
      isParadox: true,
      description: `High ${highCriteria.join('/')} (${maxScore}) vs Low ${lowCriteria.join('/')} (${minScore})`
    };
  }
  
  return { isParadox: false, description: '' };
};


export const usePrioritisation = (tomDimensions: TOMDimension[], weights: Weights): PrioritisedDimension[] => {
  return useMemo(() => {
    return tomDimensions.map(dim => {
      let businessImpact = dim.businessImpact;
      let baseScore = (businessImpact * (weights.businessImpact / 100)) + 
                     (dim.feasibility * (weights.feasibility / 100)) + 
                     (dim.political * (weights.political / 100)) + 
                     (dim.foundation * (weights.foundation / 100));
      
      let adjustedScore = baseScore;
      let filters: string[] = [];
      
      // Special filter logic
      if ((dim.name.includes('Support') || dim.name.includes('Data Products') || dim.name.includes('Data Quality') || 
           dim.name.includes('Data Access') || dim.name.includes('Metadata') || dim.name.includes('Value')) && businessImpact >= 3) {
        adjustedScore += 0.175 * (weights.businessImpact / 35);
        filters.push('Reputation Recovery');
      }
      
      if (dim.feasibility >= 4 && businessImpact >= 3) {
        filters.push('Quick Win');
      }
      
      if ((dim.name.includes('Governance') || dim.name.includes('Compliance') || dim.name.includes('Risk Management')) && dim.political < 3) {
        filters.push('Political Risk');
      }
      
      if ((dim.name.includes('Metadata') || dim.name.includes('Data Quality') || dim.name.includes('Roles')) && dim.foundation >= 4) {
        filters.push('Foundation Builder');
      }
      
      const paradoxResult = detectParadox(dim);
      if (paradoxResult.isParadox) {
        filters.push('Paradox');
      }
      
      // Tier calculation
      let tier = 'Deprioritise';
      if (adjustedScore >= 4.0) tier = 'Priority 1';
      else if (adjustedScore >= 3.0) tier = 'Priority 2';
      else if (adjustedScore >= 2.0) tier = 'Priority 3';
      
      return {
        ...dim,
        baseScore,
        adjustedScore,
        tier,
        filters,
        paradoxDescription: paradoxResult.description
      };
    }).sort((a, b) => b.adjustedScore - a.adjustedScore);
  }, [tomDimensions, weights]);
};