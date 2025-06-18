// src/constants/diagnostic.ts

export interface DiagnosticItem {
  name: string;
  description: string;
  category: 'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY';
  // I've added placeholder levels. Please update these with the real text.
  levels: [string, string, string, string, string];
}

// This list is created by merging your 'initialTomDimensions' and 'dimensionDescriptions'
export const diagnosticData: DiagnosticItem[] = [
  { name: 'Vision and Mission', category: 'STRATEGY', description: 'A clear and concise statement...', levels: ['Level 1 text', 'Level 2 text', 'Level 3 text', 'Level 4 text', 'Level 5 text'] },
  { name: 'Data Principles', category: 'STRATEGY', description: 'A set of guiding principles...', levels: ['Level 1 text', 'Level 2 text', 'Level 3 text', 'Level 4 text', 'Level 5 text'] },
  { name: 'Data Strategy Alignment', category: 'STRATEGY', description: 'The extent to which the data strategy...', levels: ['Level 1 text', 'Level 2 text', 'Level 3 text', 'Level 4 text', 'Level 5 text'] },
  { name: 'Value Definition & Attribution', category: 'STRATEGY', description: 'A clear definition of how the organisation...', levels: ['Level 1 text', 'Level 2 text', 'Level 3 text', 'Level 4 text', 'Level 5 text'] },
  { name: 'Governance Framework', category: 'IMPLEMENTATION', description: 'A comprehensive framework that defines roles...', levels: ['Level 1 text', 'Level 2 text', 'Level 3 text', 'Level 4 text', 'Level 5 text'] },
  { name: 'Risk Management', category: 'IMPLEMENTATION', description: 'A systematic process for identifying...', levels: ['Level 1 text', 'Level 2 text', 'Level 3 text', 'Level 4 text', 'Level 5 text'] },
  { name: 'Compliance', category: 'IMPLEMENTATION', description: 'Ensuring that the organisation\'s data activities comply...', levels: ['Level 1 text', 'Level 2 text', 'Level 3 text', 'Level 4 text', 'Level 5 text'] },
  { name: 'Data Ethics', category: 'IMPLEMENTATION', description: 'A set of ethical principles that guide...', levels: ['Level 1 text', 'Level 2 text', 'Level 3 text', 'Level 4 text', 'Level 5 text'] },
  // ... and so on for all 24 of your dimensions.
  // You will need to add the other dimensions from your list here.
];