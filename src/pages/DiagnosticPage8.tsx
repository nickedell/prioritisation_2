import React from 'react';
import { Link } from 'react-router-dom';

const TestDiagnosticPage = () => {
  return (
    <div style={{ padding: '50px', backgroundColor: '#111827', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 'bold' }}>Diagnostic Page Test</h1>
      <p style={{ marginTop: '20px' }}>If you can see this, the routing to this page is working correctly.</p>
      <Link to="/prioritisation" style={{ color: '#60A5FA', marginTop: '20px', display: 'block' }}>
        Go to Prioritisation Page →
      </Link>
    </div>
  );
};

export default TestDiagnosticPage;