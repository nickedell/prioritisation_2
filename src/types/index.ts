export interface TOMDimension {
  id: number;
  name: string;
  category: 'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY';
  subDimension: string | null;
  currentScore: number;
  businessImpact: number;
  feasibility: number;
  political: number;
  foundation: number;
}

export interface PrioritisedDimension extends TOMDimension {
  baseScore: number;
  adjustedScore: number;
  tier: string;
  filters: string[];
  paradoxDescription: string;
}

export interface Weights {
  businessImpact: number;
  feasibility: number;
  political: number;
  foundation: number;
}