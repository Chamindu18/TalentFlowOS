import React, { useEffect, useState } from 'react';

interface DashboardSummary {
  totalInterviewsScheduled: number;
  totalEvaluationsCompleted: number;
  totalDecisionsMade: number;
  acceptedCount: number;
  rejectedCount: number;
  conversionRate: number;
}

const HiringDashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Mock data mirroring your backend AnalyticsController response schema
        const mockData: DashboardSummary = {
          totalInterviewsScheduled: 15,
          totalEvaluationsCompleted: 9,
          totalDecisionsMade: 7,
          acceptedCount: 5,
          rejectedCount: 2,
          conversionRate: 71.4,
        };
        setSummary(mockData);
      } catch (error) {
        console.error("Error fetching hiring analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Loading Dashboard Metrics...</div>;
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '5px', fontWeight: '600' }}>Hiring Manager Dashboard</h1>
      <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Track and manage active interview loops, candidate evaluations, and final decisions.</p>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Interviews Scheduled</h3>
          <p style={cardValueStyle}>{summary?.totalInterviewsScheduled}</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Evaluations Filed</h3>
          <p style={cardValueStyle}>{summary?.totalEvaluationsCompleted}</p>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Decisions Logged</h3>
          <p style={cardValueStyle}>{summary?.totalDecisionsMade}</p>
        </div>

        <div style={{ ...cardStyle, borderLeft: '5px solid #2ecc71' }}>
          <h3 style={cardTitleStyle}>Offers Accepted</h3>
          <p style={{ ...cardValueStyle, color: '#2ecc71' }}>{summary?.acceptedCount}</p>
        </div>

        <div style={{ ...cardStyle, borderLeft: '5px solid #3498db' }}>
          <h3 style={cardTitleStyle}>Conversion Rate</h3>
          <p style={{ ...cardValueStyle, color: '#3498db' }}>{summary?.conversionRate}%</p>
        </div>

      </div>

      {/* Quick Actions Panel */}
      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h2 style={{ color: '#2c3e50', fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>Hiring Management Actions</h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button style={btnStyle}>🗓️ View Schedules</button>
          <button style={btnStyle}>📝 Add Evaluation</button>
          <button style={btnStyle}>🤝 Make Final Decision</button>
        </div>
      </div>
    </div>
  );
};

// Component styling declarations
const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  borderLeft: '5px solid #34495e',
};

const cardTitleStyle: React.CSSProperties = {
  margin: '0 0 10px 0',
  fontSize: '0.85rem',
  color: '#7f8c8d',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const cardValueStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#2c3e50',
};

const btnStyle: React.CSSProperties = {
  padding: '12px 20px',
  backgroundColor: '#34495e',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'background-color 0.2s',
};

export default HiringDashboard;