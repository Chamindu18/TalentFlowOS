import React, { useState } from 'react';

interface InterviewInput {
  candidateName: string;
  position: string;
  interviewDate: string;
  interviewTime: string;
  interviewerNotes: string;
}

const InterviewScheduling: React.FC = () => {
  const [form, setForm] = useState<InterviewInput>({
    candidateName: '',
    position: '',
    interviewDate: '',
    interviewTime: '',
    interviewerNotes: '',
  });

  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will wire up to your POST api/interview/schedule backend endpoint later
    setStatusMessage(`Success! Interview scheduled for ${form.candidateName}.`);
    setForm({ candidateName: '', position: '', interviewDate: '', interviewTime: '', interviewerNotes: '' });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '5px', fontWeight: '600' }}>Schedule an Interview</h1>
      <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Set up new assessment timelines and sync parameters directly with candidate records.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Scheduling Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Candidate Full Name</label>
            <input type="text" name="candidateName" value={form.candidateName} onChange={handleInputChange} style={inputStyle} required placeholder="Jane Doe" />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Target Job Position</label>
            <input type="text" name="position" value={form.position} onChange={handleInputChange} style={inputStyle} required placeholder="Senior Dotnet Developer" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={labelStyle}>Date</label>
              <input type="date" name="interviewDate" value={form.interviewDate} onChange={handleInputChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Time Slot</label>
              <input type="time" name="interviewTime" value={form.interviewTime} onChange={handleInputChange} style={inputStyle} required />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Focus Areas / Pre-interview Notes</label>
            <textarea name="interviewerNotes" value={form.interviewerNotes} onChange={handleInputChange} style={{ ...inputStyle, height: '80px', resize: 'none' }} placeholder="System architecture focus..." />
          </div>

          <button type="submit" style={btnStyle}>📅 Confirm & Schedule</button>

          {statusMessage && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '5px', fontWeight: '600', fontSize: '0.9rem' }}>
              {statusMessage}
            </div>
          )}
        </form>

        {/* Live Active Loops Preview Card */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#2c3e50', fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>Upcoming Assessment Loops</h2>
          <div style={{ borderLeft: '4px solid #3498db', paddingLeft: '15px', marginBottom: '15px' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>Alex Morgan — Product Lead</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#7f8c8d' }}>Tomorrow at 10:00 AM</p>
          </div>
          <div style={{ borderLeft: '4px solid #3498db', paddingLeft: '15px' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>Sam Smith — QA Automation</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#7f8c8d' }}>July 8, 2026 at 2:30 PM</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

// Layout configurations
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
  backgroundColor: '#27ae60',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '1rem',
};

export default InterviewScheduling;