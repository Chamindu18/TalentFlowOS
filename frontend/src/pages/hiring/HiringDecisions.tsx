import React, { useState } from 'react';

interface DecisionInput {
  applicationId: string;
  managerId: string;
  decision: string;
  justification: string;
}

const HiringDecisions: React.FC = () => {
  const [form, setForm] = useState<DecisionInput>({
    applicationId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', // Mock Application GUID
    managerId: 'cd7b8a12-3456-789a-bcde-f0123456789a',     // Mock Manager GUID
    decision: 'Accepted',
    justification: '',
  });

  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will connect directly to your POST api/hiringdecision/make backend endpoint later
    setStatusMessage(`Final resolution locked: Candidate status set to "${form.decision}".`);
    setForm({
      applicationId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      managerId: 'cd7b8a12-3456-789a-bcde-f0123456789a',
      decision: 'Accepted',
      justification: '',
    });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '5px', fontWeight: '600' }}>Final Hiring Decisions</h1>
      <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Log formal recruitment resolutions, job offer authorizations, or rejection parameters.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Decision Authority Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Select Final Resolution</label>
            <select name="decision" value={form.decision} onChange={handleInputChange} style={inputStyle}>
              <option value="Accepted">🎉 Extend Official Job Offer (Accepted)</option>
              <option value="Rejected">❌ Decline Candidate (Rejected)</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Executive Justification / Business Case</label>
            <textarea name="justification" value={form.justification} onChange={handleInputChange} style={{ ...inputStyle, height: '150px', resize: 'none' }} maxLength={2000} required placeholder="Candidate exceeded all technical baselines during structural loops. Team consensus is highly favorable for immediate onboarding..." />
            <small style={{ color: '#95a5a6', display: 'block', marginTop: '5px' }}>Maximum 2000 characters (Matches SQL database capacity limits).</small>
          </div>

          <button type="submit" style={{ ...btnStyle, backgroundColor: form.decision === 'Accepted' ? '#27ae60' : '#c0392b' }}>
            🔒 Execute Sign-Off Resolution
          </button>

          {statusMessage && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#ebf5fb', color: '#2e4053', borderRadius: '5px', fontWeight: '600', fontSize: '0.9rem', borderLeft: '4px solid #3498db' }}>
              {statusMessage}
            </div>
          )}
        </form>

        {/* Informational Policy Box */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#2c3e50', fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>Compliance Notice</h2>
          <p style={{ color: '#34495e', fontSize: '0.95rem', lineHeight: '1.6', margin: '0' }}>
            Logging a final resolution here updates the applicant tracking state across the entire ecosystem. If an offer is authorized, automated notifications will sync with Human Resources to initialize standard onboarding protocols.
          </p>
        </div>

      </div>
    </div>
  );
};

// CSS Declarations
const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: '600',
  fontSize: '0.9rem',
  color: '#34495e',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontSize: '0.95rem',
};

const btnStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '1rem',
  transition: 'background-color 0.2s',
};

export default HiringDecisions;