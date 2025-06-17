// src/constants/diagnostic.ts

export interface DiagnosticItem {
    category: string;
    name: string;
    description: string;
    levels: string[];
}

export const diagnosticData: DiagnosticItem[] = [
  {
    "category": "STRATEGIES",
    "name": "Vision and Mission",
    "description": "A clear and concise statement that defines the overall purpose and goals of the organisation's data activities. It should articulate the desired future state and how data will be used to achieve strategic objectives.",
    "levels": [
      "Vision and mission for data are unclear or non-existent.",
      "Vision and mission are define but not centrally documented, aligned across teams or actively used.",
      "Vision and mission are clearly defined and communicated.",
      "Vision and mission are used to guide decision-making.",
      "Vision and mission are dynamic and adapt to changing business needs."
    ]
  },
  {
    "category": "STRATEGIES",
    "name": "Data Principles",
    "description": "A set of guiding principles that define how data should be managed, used and shared within the organisation. These principles should be aligned with the organisation's values and ethical considerations.",
    "levels": [
      "No defined data principles.",
      "Basic data principles are documented.",
      "Data principles are clearly defined and communicated, including Data Design Principles.",
      "Data principles are actively enforced and reviewed.",
      "Data principles are embedded in the culture and evolve with best practices."
    ]
  },
  {
    "category": "STRATEGIES",
    "name": "Data STRATEGIES Alignment",
    "description": "The extent to which the data STRATEGIES is aligned with the overall business STRATEGIES. This includes ensuring that data initiatives support key business goals and that data is used to drive decision-making across the organisation.",
    "levels": [
      "Data STRATEGIES is not aligned with overall business STRATEGIES.",
      "Data STRATEGIES is documented but poorly aligned with business STRATEGIES.",
      "Data STRATEGIES is well-defined and aligned with business STRATEGIES.",
      "Data STRATEGIES is a key driver of business STRATEGIES.",
      "Data STRATEGIES is agile and responsive to changing business needs."
    ]
  },
  {
    "category": "STRATEGIES",
    "name": "Governance: Governance Framework",
    "description": "A comprehensive framework that defines roles, responsibilities and processes for data governance. This includes policies, standards and procedures for data management, data quality, data security and data ethics.",
    "levels": [
      "No formal governance framework.",
      "Basic governance framework is documented.",
      "Comprehensive governance framework is in place.",
      "Governance framework is actively used and reviewed.",
      "Governance framework is agile and adapts to changing circumstances."
    ]
  },
  {
    "category": "STRATEGIES",
    "name": "Governance: Risk Management",
    "description": "A systematic process for identifying, assessing and mitigating data-related risks. This includes risks related to data security, data privacy, data quality and data compliance.",
    "levels": [
      "Data risks are not systematically identified or managed.",
      "Data risks are identified but not consistently managed.",
      "Data risks are systematically identified and managed.",
      "Data risk management is proactive and integrated with business risk management.",
      "Data risk management is dynamic and adapts to emerging threats."
    ]
  },
  {
    "category": "STRATEGIES",
    "name": "Governance: Compliance",
    "description": "Ensuring that the organisation's data activities comply with relevant regulations, laws and ethical standards.",
    "levels": [
      "Data compliance is ad hoc and reactive.",
      "Data compliance requirements are identified.",
      "Data compliance is actively managed and monitored.",
      "Data compliance is integrated into processes.",
      "Data compliance is proactive and anticipates future regulations."
    ]
  },
  {
    "category": "STRATEGIES",
    "name": "Governance: Data Ethics",
    "description": "A set of ethical principles that guide the organisation's data activities. This includes considerations around fairness, transparency, accountability and respect for individual rights.",
    "levels": [
      "Data ethics are not considered.",
      "Basic data ethics principles are identified.",
      "Data ethics principles are defined and communicated.",
      "Data ethics are integrated into data governance and processes.",
      "Data ethics are a key part of the data culture."
    ]
  },
  {
    "category": "STRATEGIES",
    "name": "Value Definition & Attribution",
    "description": "A clear definition of how the organisation creates value from data and a model for attributing value to specific data initiatives. This helps to demonstrate the return on investment in data and to prioritise data projects.",
    "levels": [
      "No model for attributing value to data initiatives.",
      "Basic value attribution model is documented.",
      "Value attribution model is in place and used.",
      "Value attribution model is refined and used to optimize data investments.",
      "Value attribution model is continuously reviewed and adapted."
    ]
  },
  {
    "category": "IMPLEMENTATION",
    "name": "Data Products",
    "description": "Data products are applications, tools, or services that leverage data to deliver value to users. This can include dashboards, reports, APIs and machine learning models.",
    "levels": [
      "Data products are developed ad hoc.",
      "Data products are developed with some planning.",
      "Data product development is standardised.",
      "Data product development is optimised and automated.",
      "Data product development is agile and responsive to user needs."
    ]
  },
  {
    "category": "IMPLEMENTATION",
    "name": "Processes: Data Product Development Lifecycle",
    "description": "A defined process for developing and deploying data products. This typically includes stages such as ideation, design, development, testing, deployment and monitoring.",
    "levels": [
      "No defined lifecycle.",
      "Basic lifecycle is documented.",
      "Standardised data product development lifecycle is in place.",
      "Lifecycle is optimised and integrated with other processes.",
      "Lifecycle is agile and adapts to changing requirements."
    ]
  },
  {
    "category": "IMPLEMENTATION",
    "name": "Processes: Continuous Discovery",
    "description": "An ongoing process of understanding user needs and identifying opportunities for new data products or improvements to existing ones. This involves gathering feedback, analysing user behaviour and conducting market research.",
    "levels": [
      "User feedback is gathered informally and inconsistently.",
      "User feedback is collected through basic channels but is not systematically analyzed or integrated into product development.",
      "Defined processes exist for gathering user feedback at specific stages of the product lifecycle.",
      "Continuous user research and feedback loops are embedded into the data product development lifecycle.",
      "Continuous user research and feedback loops are embedded throughout the product lifecycle."
    ]
  },
  {
    "category": "IMPLEMENTATION",
    "name": "Processes: Data Quality Management",
    "description": "Processes and procedures for ensuring the accuracy, completeness, consistency and timeliness of data. This includes data profiling, data cleansing, data validation and data quality monitoring.",
    "levels": [
      "Data quality is inconsistent.",
      "Basic data quality processes are defined.",
      "Data quality management is implemented and monitored.",
      "Data quality is actively measured and improved.",
      "Data quality is a key focus and embedded in the data culture."
    ]
  },
  {
    "category": "IMPLEMENTATION",
    "name": "Processes: Metadata Management",
    "description": "The process of managing metadata, which is data that describes other data. This includes defining metadata standards, capturing metadata and making metadata accessible to users.",
    "levels": [
      "Metadata is not managed.",
      "Basic metadata management is in place.",
      "Comprehensive metadata management is implemented.",
      "Metadata is actively used to support data discovery and understanding.",
      "Metadata management is automated and integrated with other processes."
    ]
  },
  {
    "category": "IMPLEMENTATION",
    "name": "Processes: Data Access and Sharing",
    "description": "Policies and procedures for controlling access to data and enabling secure data sharing within and outside the organisation. This includes authentication, authorisation and data encryption.",
    "levels": [
      "Data access and sharing are ad hoc.",
      "Basic data access and sharing processes are defined.",
      "Secure and controlled data access and sharing are implemented.",
      "Data access and sharing are automated and optimised.",
      "Data access and sharing are seamless and secure."
    ]
  },
  {
    "category": "IMPLEMENTATION",
    "name": "Processes: Product Pipeline Management",
    "description": "A process for managing the flow of data products from ideation to deployment. This includes prioritising data product development, tracking progress and managing resources.",
    "levels": [
      "Product pipeline is largely invisible or non-existent.",
      "Basic backlog of data product ideas and requests exists, but it is poorly maintained.",
      "Defined product pipeline is in place with a documented prioritisation process.",
      "The product pipeline is actively managed, data-driven, responsive and regularly reviewed.",
      "Product pipeline management is a strategic capability, deeply integrated with business STRATEGIES and planning."
    ]
  },
  {
    "category": "IMPLEMENTATION",
    "name": "Roles and Responsibilities",
    "description": "Clearly defined roles and responsibilities for data management, data governance and data product development. This includes roles such as data stewards, data engineers, data scientists and data analysts.",
    "levels": [
      "Data roles and responsibilities are unclear.",
      "Basic data roles and responsibilities are defined.",
      "Clear data roles and responsibilities are in place.",
      "Data roles and responsibilities are aligned with skills and performance.",
      "Data roles are flexible and adaptable to changing needs."
    ]
  },
  {
    "category": "IMPLEMENTATION",
    "name": "Technology and Tools",
    "description": "The technology infrastructure and tools used to support data management, data governance and data product development.",
    "levels": [
      "Technology and tools are selected ad hoc.",
      "Technology and tools are selected with some planning.",
      "Standardised technology and tools are in place.",
      "Technology and tools are optimised and integrated.",
      "Technology and tools are agile and support innovation."
    ]
  },
  {
    "category": "SERVICE & VALUE DELIVERY",
    "name": "Support",
    "description": "Providing support to users of data products and services. This includes answering questions, resolving issues and providing training.",
    "levels": [
      "Data support is ad hoc and reactive. (Business users, Tech teams)",
      "Basic data support processes are defined.",
      "Formal data support processes are in place with SLAs.",
      "Data support is proactive and focused on user satisfaction.",
      "Data support is seamless and anticipates user needs."
    ]
  },
  {
    "category": "SERVICE & VALUE DELIVERY",
    "name": "Communication & Stakeholder Engagement",
    "description": "Effectively communicating data initiatives and engaging with stakeholders across the organisation. This includes providing regular updates, soliciting feedback and building relationships.",
    "levels": [
      "Communication and stakeholder engagement are ad hoc.",
      "Basic communication and stakeholder engagement plans are in place.",
      "Formal communication and stakeholder engagement processes are implemented.",
      "Communication and stakeholder engagement are proactive and targeted.",
      "Communication and stakeholder engagement are highly effective and build strong relationships."
    ]
  },
  {
    "category": "SERVICE & VALUE DELIVERY",
    "name": "Data Culture: Attitudes and beliefs",
    "description": "The shared attitudes, beliefs and values of individuals and teams with respect to the value of data.",
    "levels": [
      "Data is viewed with indifference or suspicion; its use is inconsistent and reactive.",
      "Growing awareness of data's importance, but attitudes are undefined and inconsistent.",
      "Data is seen as valuable; attitudes are positive and consistent.",
      "Data is trusted; strong belief in its ability to drive better decisions.",
      "Data is embraced; culture of experimentation and learning using data to adapt and innovate."
    ]
  },
  {
    "category": "SERVICE & VALUE DELIVERY",
    "name": "Data Culture: Data Behaviours",
    "description": "The behaviours and practices of individuals and teams with respect to data. This includes behaviours such as data sharing, data quality awareness and data-driven decision-making.",
    "levels": [
      "Data behaviours are inconsistent.",
      "Basic data behaviours are defined.",
      "Desired data behaviours are communicated and promoted.",
      "Data behaviours are actively encouraged and reinforced.",
      "Positive data behaviours are embedded in the culture."
    ]
  },
  {
    "category": "SERVICE & VALUE DELIVERY",
    "name": "Data Culture: Data Literacy",
    "description": "The level of data literacy within the organisation and the overall culture around data. This includes promoting data-driven decision-making, encouraging data sharing and fostering a culture of data curiosity.",
    "levels": [
      "Data literacy is low.",
      "Basic data literacy initiatives are in place.",
      "Data literacy programs are implemented.",
      "Data literacy is actively promoted and embedded in the culture.",
      "Data literacy is a core competency."
    ]
  },
  {
    "category": "SERVICE & VALUE DELIVERY",
    "name": "Data Culture: Capability Uplift",
    "description": "Developing the data skills and capabilities of employees through training, mentoring and knowledge sharing. This helps to ensure that the organisation has the talent it needs to execute its data STRATEGIES.",
    "levels": [
      "No formal capability uplift program.",
      "Basic capability uplift initiatives are in place.",
      "Structured capability uplift program is implemented.",
      "Capability uplift is aligned with business needs and future skills.",
      "Capability uplift is continuous and supports innovation."
    ]
  },
  {
    "category": "SERVICE & VALUE DELIVERY",
    "name": "Value Realisation",
    "description": "The process of capturing and measuring the value created from data initiatives. This includes tracking metrics such as cost savings, revenue growth and improved decision-making.",
    "levels": [
      "Data value is not measured.",
      "Basic data value metrics are defined.",
      "Data value is measured and reported.",
      "Data value is actively tracked and used to inform decisions.",
      "Data value is clearly demonstrated and communicated."
    ]
  }
]