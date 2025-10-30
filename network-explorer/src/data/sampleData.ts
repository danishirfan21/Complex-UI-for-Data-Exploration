import type { NetworkData, Node, Link } from '../types/network';

export const sampleNodes: Node[] = [
  // Computer Science Researchers
  {
    id: 'cs1',
    name: 'Dr. Sarah Chen',
    category: 'Computer Science',
    publications: 145,
    hIndex: 42,
    institution: 'MIT',
    keywords: ['Machine Learning', 'Neural Networks', 'Computer Vision'],
    joinDate: '2015-03-15',
  },
  {
    id: 'cs2',
    name: 'Prof. Michael Rodriguez',
    category: 'Computer Science',
    publications: 189,
    hIndex: 56,
    institution: 'Stanford University',
    keywords: ['Distributed Systems', 'Cloud Computing', 'Algorithms'],
    joinDate: '2012-08-20',
  },
  {
    id: 'cs3',
    name: 'Dr. Emily Watson',
    category: 'Computer Science',
    publications: 98,
    hIndex: 35,
    institution: 'UC Berkeley',
    keywords: ['Natural Language Processing', 'Deep Learning', 'AI'],
    joinDate: '2018-01-10',
  },
  {
    id: 'cs4',
    name: 'Dr. James Kim',
    category: 'Computer Science',
    publications: 112,
    hIndex: 38,
    institution: 'Carnegie Mellon',
    keywords: ['Robotics', 'Computer Vision', 'Reinforcement Learning'],
    joinDate: '2016-06-05',
  },
  {
    id: 'cs5',
    name: 'Dr. Amelia Foster',
    category: 'Computer Science',
    publications: 76,
    hIndex: 28,
    institution: 'MIT',
    keywords: ['Human-Computer Interaction', 'UX Research', 'Accessibility'],
    joinDate: '2019-09-12',
  },

  // Biology Researchers
  {
    id: 'bio1',
    name: 'Prof. David Martinez',
    category: 'Biology',
    publications: 203,
    hIndex: 68,
    institution: 'Harvard University',
    keywords: ['Genomics', 'Bioinformatics', 'Systems Biology'],
    joinDate: '2010-02-18',
  },
  {
    id: 'bio2',
    name: 'Dr. Lisa Anderson',
    category: 'Biology',
    publications: 156,
    hIndex: 52,
    institution: 'Johns Hopkins',
    keywords: ['Molecular Biology', 'Genetics', 'CRISPR'],
    joinDate: '2013-11-22',
  },
  {
    id: 'bio3',
    name: 'Dr. Robert Taylor',
    category: 'Biology',
    publications: 134,
    hIndex: 45,
    institution: 'UCSF',
    keywords: ['Neuroscience', 'Brain Imaging', 'Cognitive Science'],
    joinDate: '2014-05-30',
  },
  {
    id: 'bio4',
    name: 'Dr. Nina Patel',
    category: 'Biology',
    publications: 91,
    hIndex: 33,
    institution: 'Harvard University',
    keywords: ['Computational Biology', 'Proteomics', 'Drug Discovery'],
    joinDate: '2017-03-08',
  },

  // Physics Researchers
  {
    id: 'phy1',
    name: 'Prof. Thomas Zhang',
    category: 'Physics',
    publications: 178,
    hIndex: 61,
    institution: 'Caltech',
    keywords: ['Quantum Computing', 'Quantum Mechanics', 'Particle Physics'],
    joinDate: '2011-07-14',
  },
  {
    id: 'phy2',
    name: 'Dr. Maria Gonzalez',
    category: 'Physics',
    publications: 142,
    hIndex: 48,
    institution: 'Princeton',
    keywords: ['Astrophysics', 'Cosmology', 'Dark Matter'],
    joinDate: '2014-12-03',
  },
  {
    id: 'phy3',
    name: 'Dr. Christopher Lee',
    category: 'Physics',
    publications: 119,
    hIndex: 41,
    institution: 'Caltech',
    keywords: ['Condensed Matter', 'Materials Science', 'Superconductivity'],
    joinDate: '2016-04-19',
  },

  // Mathematics Researchers
  {
    id: 'math1',
    name: 'Prof. Anna Kowalski',
    category: 'Mathematics',
    publications: 167,
    hIndex: 54,
    institution: 'Princeton',
    keywords: ['Applied Mathematics', 'Optimization', 'Game Theory'],
    joinDate: '2012-01-25',
  },
  {
    id: 'math2',
    name: 'Dr. Benjamin Wright',
    category: 'Mathematics',
    publications: 103,
    hIndex: 37,
    institution: 'University of Chicago',
    keywords: ['Statistics', 'Probability Theory', 'Data Science'],
    joinDate: '2015-10-07',
  },
  {
    id: 'math3',
    name: 'Dr. Sophia Nguyen',
    category: 'Mathematics',
    publications: 89,
    hIndex: 32,
    institution: 'MIT',
    keywords: ['Computational Mathematics', 'Numerical Analysis', 'Algorithms'],
    joinDate: '2018-06-14',
  },

  // Chemistry Researchers
  {
    id: 'chem1',
    name: 'Prof. William Brown',
    category: 'Chemistry',
    publications: 192,
    hIndex: 59,
    institution: 'Stanford University',
    keywords: ['Organic Chemistry', 'Catalysis', 'Synthesis'],
    joinDate: '2011-09-09',
  },
  {
    id: 'chem2',
    name: 'Dr. Jennifer White',
    category: 'Chemistry',
    publications: 127,
    hIndex: 44,
    institution: 'UC Berkeley',
    keywords: ['Computational Chemistry', 'Materials Design', 'Nanotechnology'],
    joinDate: '2015-02-16',
  },
  {
    id: 'chem3',
    name: 'Dr. Daniel Park',
    category: 'Chemistry',
    publications: 95,
    hIndex: 34,
    institution: 'Columbia University',
    keywords: ['Biochemistry', 'Drug Design', 'Protein Engineering'],
    joinDate: '2017-11-28',
  },

  // Additional interdisciplinary researchers
  {
    id: 'cs6',
    name: 'Dr. Rachel Green',
    category: 'Computer Science',
    publications: 84,
    hIndex: 29,
    institution: 'Stanford University',
    keywords: ['Bioinformatics', 'Machine Learning', 'Healthcare AI'],
    joinDate: '2019-04-02',
  },
  {
    id: 'bio5',
    name: 'Dr. Kevin Johnson',
    category: 'Biology',
    publications: 108,
    hIndex: 39,
    institution: 'MIT',
    keywords: ['Synthetic Biology', 'Systems Engineering', 'Biocomputing'],
    joinDate: '2016-08-23',
  },
];

export const sampleLinks: Link[] = [
  // Strong CS collaborations
  { source: 'cs1', target: 'cs2', strength: 9, publications: 23, firstCollaboration: '2016-03-10', lastCollaboration: '2024-08-15' },
  { source: 'cs1', target: 'cs3', strength: 8, publications: 18, firstCollaboration: '2018-05-22', lastCollaboration: '2024-09-01' },
  { source: 'cs1', target: 'cs4', strength: 7, publications: 14, firstCollaboration: '2017-11-30', lastCollaboration: '2024-06-20' },
  { source: 'cs2', target: 'cs3', strength: 6, publications: 11, firstCollaboration: '2018-09-15', lastCollaboration: '2024-03-12' },
  { source: 'cs3', target: 'cs4', strength: 8, publications: 16, firstCollaboration: '2019-01-08', lastCollaboration: '2024-10-05' },
  { source: 'cs4', target: 'cs5', strength: 5, publications: 7, firstCollaboration: '2020-02-14', lastCollaboration: '2024-07-18' },

  // Strong Biology collaborations
  { source: 'bio1', target: 'bio2', strength: 10, publications: 34, firstCollaboration: '2013-06-20', lastCollaboration: '2024-09-28' },
  { source: 'bio1', target: 'bio4', strength: 8, publications: 19, firstCollaboration: '2017-09-05', lastCollaboration: '2024-08-11' },
  { source: 'bio2', target: 'bio3', strength: 7, publications: 13, firstCollaboration: '2015-04-17', lastCollaboration: '2024-05-22' },
  { source: 'bio3', target: 'bio4', strength: 6, publications: 10, firstCollaboration: '2018-07-12', lastCollaboration: '2024-04-09' },

  // Physics collaborations
  { source: 'phy1', target: 'phy2', strength: 7, publications: 15, firstCollaboration: '2014-10-25', lastCollaboration: '2024-07-03' },
  { source: 'phy1', target: 'phy3', strength: 9, publications: 22, firstCollaboration: '2016-08-14', lastCollaboration: '2024-09-19' },
  { source: 'phy2', target: 'phy3', strength: 5, publications: 8, firstCollaboration: '2018-03-21', lastCollaboration: '2024-02-15' },

  // Math collaborations
  { source: 'math1', target: 'math2', strength: 8, publications: 17, firstCollaboration: '2015-12-08', lastCollaboration: '2024-08-27' },
  { source: 'math1', target: 'math3', strength: 6, publications: 12, firstCollaboration: '2018-11-02', lastCollaboration: '2024-06-14' },
  { source: 'math2', target: 'math3', strength: 7, publications: 14, firstCollaboration: '2019-02-19', lastCollaboration: '2024-09-08' },

  // Chemistry collaborations
  { source: 'chem1', target: 'chem2', strength: 8, publications: 20, firstCollaboration: '2015-05-13', lastCollaboration: '2024-07-29' },
  { source: 'chem1', target: 'chem3', strength: 6, publications: 11, firstCollaboration: '2018-01-24', lastCollaboration: '2024-05-16' },
  { source: 'chem2', target: 'chem3', strength: 7, publications: 13, firstCollaboration: '2018-08-09', lastCollaboration: '2024-08-22' },

  // Interdisciplinary: CS-Biology (Bioinformatics)
  { source: 'cs1', target: 'bio1', strength: 9, publications: 21, firstCollaboration: '2016-07-18', lastCollaboration: '2024-09-12' },
  { source: 'cs2', target: 'bio1', strength: 7, publications: 15, firstCollaboration: '2017-04-06', lastCollaboration: '2024-06-30' },
  { source: 'cs3', target: 'bio2', strength: 6, publications: 10, firstCollaboration: '2019-05-29', lastCollaboration: '2024-07-11' },
  { source: 'cs6', target: 'bio1', strength: 8, publications: 16, firstCollaboration: '2019-08-15', lastCollaboration: '2024-09-25' },
  { source: 'cs6', target: 'bio4', strength: 7, publications: 12, firstCollaboration: '2020-03-22', lastCollaboration: '2024-08-07' },
  { source: 'bio5', target: 'cs1', strength: 6, publications: 9, firstCollaboration: '2018-10-11', lastCollaboration: '2024-05-28' },
  { source: 'bio5', target: 'cs2', strength: 5, publications: 7, firstCollaboration: '2019-06-04', lastCollaboration: '2024-04-19' },

  // Interdisciplinary: CS-Math
  { source: 'cs2', target: 'math1', strength: 8, publications: 19, firstCollaboration: '2016-11-23', lastCollaboration: '2024-09-14' },
  { source: 'cs3', target: 'math2', strength: 7, publications: 14, firstCollaboration: '2018-12-17', lastCollaboration: '2024-07-25' },
  { source: 'math3', target: 'cs1', strength: 6, publications: 11, firstCollaboration: '2019-03-05', lastCollaboration: '2024-06-08' },

  // Interdisciplinary: Physics-Math
  { source: 'phy1', target: 'math1', strength: 7, publications: 13, firstCollaboration: '2015-07-28', lastCollaboration: '2024-08-03' },
  { source: 'phy2', target: 'math2', strength: 6, publications: 9, firstCollaboration: '2017-02-14', lastCollaboration: '2024-05-19' },

  // Interdisciplinary: Chemistry-Biology
  { source: 'chem1', target: 'bio2', strength: 8, publications: 18, firstCollaboration: '2015-09-10', lastCollaboration: '2024-09-02' },
  { source: 'chem3', target: 'bio4', strength: 9, publications: 22, firstCollaboration: '2018-04-26', lastCollaboration: '2024-10-01' },
  { source: 'chem2', target: 'bio1', strength: 6, publications: 12, firstCollaboration: '2017-06-13', lastCollaboration: '2024-07-07' },

  // Interdisciplinary: Chemistry-CS
  { source: 'chem2', target: 'cs1', strength: 7, publications: 14, firstCollaboration: '2018-07-19', lastCollaboration: '2024-08-18' },
  { source: 'chem3', target: 'cs6', strength: 6, publications: 10, firstCollaboration: '2019-10-08', lastCollaboration: '2024-06-25' },

  // Interdisciplinary: Physics-CS (Quantum Computing)
  { source: 'phy1', target: 'cs2', strength: 9, publications: 24, firstCollaboration: '2016-02-11', lastCollaboration: '2024-09-21' },
  { source: 'phy3', target: 'cs4', strength: 5, publications: 8, firstCollaboration: '2019-11-27', lastCollaboration: '2024-05-05' },

  // Additional weak connections
  { source: 'cs5', target: 'bio3', strength: 4, publications: 5, firstCollaboration: '2021-01-15', lastCollaboration: '2024-03-28' },
  { source: 'math2', target: 'bio1', strength: 5, publications: 7, firstCollaboration: '2019-09-20', lastCollaboration: '2024-04-12' },
  { source: 'phy2', target: 'chem1', strength: 4, publications: 6, firstCollaboration: '2020-05-07', lastCollaboration: '2024-02-23' },
];

export const sampleData: NetworkData = {
  nodes: sampleNodes,
  links: sampleLinks,
};
