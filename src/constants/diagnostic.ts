export interface DiagnosticItem {
  name: string;
  description: string;
  category: 'STRATEGY' | 'IMPLEMENTATION' | 'SERVICE & VALUE DELIVERY';
  levels: [string, string, string, string, string];
}

export const diagnosticData: DiagnosticItem[] = [
  { 
    name: 'Vision and Mission', 
    category: 'STRATEGY', 
    description: 'A clear and concise statement that defines the overall purpose and goals of the organisation\'s data activities. It should articulate the desired future state and how data will be used to achieve strategic objectives.', 
    levels: ['Vision and mission for data are unclear or non-existent.', 'Vision and mission are define but not centrally documented, aligned across teams or actively used.', 'Vision and mission are clearly defined and communicated.', 'Vision and mission are used to guide decision-making.', 'Vision and mission are dynamic and adapt to changing business needs.'] 
  },
  { 
    name: 'Data Principles', 
    category: 'STRATEGY', 
    description: 'A set of guiding principles that define how data should be managed, used and shared within the organisation. These principles should be aligned with the organisation\'s values and ethical considerations.', 
    levels: ['Data principles are not defined.', 'Some informal data principles exist but are not documented or enforced.', 'Data principles are formally documented and communicated.', 'Data principles are integrated into data governance and decision-making processes.', 'Data principles are regularly reviewed and updated to reflect best practices and business changes.'] 
  },
  { 
    name: 'Data Strategy Alignment', 
    category: 'STRATEGY', 
    description: 'The extent to which the data strategy is aligned with the overall business strategy. This includes ensuring that data initiatives support key business goals and that data is used to drive decision-making across the organisation.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Value Definition & Attribution', 
    category: 'STRATEGY', 
    description: 'A clear definition of how the organisation creates value from data and a model for attributing value to specific data initiatives. This helps to demonstrate the return on investment in data and to prioritise data projects.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Governance Framework', 
    category: 'IMPLEMENTATION', 
    description: 'A comprehensive framework that defines roles, responsibilities and processes for data governance. This includes policies, standards and procedures for data management, data quality, data security and data ethics.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Risk Management', 
    category: 'IMPLEMENTATION', 
    description: 'A systematic process for identifying, assessing and mitigating data-related risks. This includes risks related to data security, data privacy, data quality and data compliance.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Compliance', 
    category: 'IMPLEMENTATION', 
    description: 'Ensuring that the organisation\'s data activities comply with relevant regulations, laws and ethical standards.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Data Ethics', 
    category: 'IMPLEMENTATION', 
    description: 'A set of ethical principles that guide the organisation\'s data activities. This includes considerations around fairness, transparency, accountability and respect for individual rights.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Data Products', 
    category: 'IMPLEMENTATION', 
    description: 'Data products are applications, tools, or services that leverage data to deliver value to users. This can include dashboards, reports, APIs and machine learning models.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Data Product Development Lifecycle', 
    category: 'IMPLEMENTATION', 
    description: 'A defined process for developing and deploying data products. This typically includes stages such as ideation, design, development, testing, deployment and monitoring.', 
    levels: ['Level 1 Placeholder', 'Level 2