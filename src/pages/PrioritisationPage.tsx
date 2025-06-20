// src/pages/PrioritisationPage.tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageConfig } from '../App.tsx'; // Import the config type

// Component accepts setPageConfig as a prop
interface PrioritisationPageProps {
  setPageConfig: (config: PageConfig) => void;
}

const PrioritisationPage: React.FC<PrioritisationPageProps> = ({ setPageConfig }) => {

  // This useEffect hook sets the header title and buttons for this page
  useEffect(() => {
    setPageConfig({
      title: 'TOM Prioritisation Tool',
      // We can add the real import/export functions here later
      onImport: () => console.log("Importing for Prioritisation..."),
      onExport: () => console.log("Exporting from Prioritisation..."),
    });
    // Clear the config when the component unmounts
    return () => setPageConfig({ title: '' });
  }, [setPageConfig]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold">Prioritisation Page Content</h2>
      <p>This is where the prioritisation tool will go.</p>
      <div className="mt-8">
        <Link to="/">← Back to Maturity Diagnostic</Link>
      </div>
    </div>
  );
};

export default PrioritisationPage;