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
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Continuous Discovery', 
    category: 'IMPLEMENTATION', 
    description: 'An ongoing process of understanding user needs and identifying opportunities for new data products or improvements to existing ones. This involves gathering feedback, analysing user behaviour and conducting market research.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Data Quality Management', 
    category: 'IMPLEMENTATION', 
    description: 'Processes and procedures for ensuring the accuracy, completeness, consistency and timeliness of data. This includes data profiling, data cleansing, data validation and data quality monitoring.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Metadata Management', 
    category: 'IMPLEMENTATION', 
    description: 'The process of managing metadata, which is data that describes other data. This includes defining metadata standards, capturing metadata and making metadata accessible to users.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Data Access and Sharing', 
    category: 'IMPLEMENTATION', 
    description: 'Policies and procedures for controlling access to data and enabling secure data sharing within and outside the organisation. This includes authentication, authorisation and data encryption.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Product Pipeline Management', 
    category: 'IMPLEMENTATION', 
    description: 'Managing the pipeline of data products from ideation through to deployment and retirement. This includes prioritising initiatives, allocating resources and tracking progress.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Roles and Responsibilities', 
    category: 'IMPLEMENTATION', 
    description: 'Clearly defined roles and responsibilities for data management, data governance and data product development. This includes roles such as data stewards, data engineers, data scientists and data analysts.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Technology and Tools', 
    category: 'IMPLEMENTATION', 
    description: 'The technology infrastructure and tools used to support data management, data governance and data product development.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Support', 
    category: 'SERVICE & VALUE DELIVERY', 
    description: 'Providing support to users of data products and services. This includes answering questions, resolving issues and providing training.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Communication & Stakeholder Engagement', 
    category: 'SERVICE & VALUE DELIVERY', 
    description: 'Effectively communicating data initiatives and engaging with stakeholders across the organisation. This includes providing regular updates, soliciting feedback and building relationships.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Attitudes and beliefs', 
    category: 'SERVICE & VALUE DELIVERY', 
    description: 'The shared attitudes, beliefs and values of individuals and teams with respect to the value of data.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Data Behaviours', 
    category: 'SERVICE & VALUE DELIVERY', 
    description: 'The behaviours and practices of individuals and teams with respect to data. This includes behaviours such as data sharing, data quality awareness and data-driven decision-making.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Data Literacy', 
    category: 'SERVICE & VALUE DELIVERY', 
    description: 'The level of data literacy within the organisation and the overall culture around data. This includes promoting data-driven decision-making, encouraging data sharing and fostering a culture of data curiosity.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Capability Uplift', 
    category: 'SERVICE & VALUE DELIVERY', 
    description: 'Developing the data skills and capabilities of employees through training, mentoring and knowledge sharing. This helps to ensure that the organisation has the talent it needs to execute its data strategy.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  },
  { 
    name: 'Value Realisation', 
    category: 'SERVICE & VALUE DELIVERY', 
    description: 'The process of capturing and measuring the value created from data initiatives. This includes tracking metrics such as cost savings, revenue growth and improved decision-making.', 
    levels: ['Level 1 Placeholder', 'Level 2 Placeholder', 'Level 3 Placeholder', 'Level 4 Placeholder', 'Level 5 Placeholder'] 
  }
];