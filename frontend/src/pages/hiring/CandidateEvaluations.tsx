import React, { useState } from 'react';

interface EvaluationInput {
  applicationId: string;
  candidateName: string;
  score: number;
  notes: string;
}

const CandidateEvaluations: React.FC = () => {
  const [form, setForm] = useState<EvaluationInput>({
    applicationId: 'e2b9c7a4-1234-4bc8-912a-7bf38dca12a4', // Mock active application GUID
    candidateName: '',
    score: 5,
    notes: '',
  });

  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'score' ? parseInt(value, 10) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will connect directly to your POST api/evaluation/create backend endpoint later
    setStatusMessage(`Evaluation submitted successfully for ${form.candidateName} with a score of ${form.score}/10!`);
    setForm({ applicationId: 'e2b9c7a4-1234-4bc8-912a-7bf38dca12a4', candidateName: '', score: 5, notes: '' });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '5px', fontWeight: '600' }}>Candidate Evaluations</h1>
      <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Log candidate performance scores and overall structural assessment takeaways.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Evaluation Scorecard Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Candidate Name</label>
            <input type="text" name="candidateName" value={form.candidateName} onChange={handleInputChange} style={inputStyle} required placeholder="John Doe" />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Overall Score (1 - 10)</label>
            <select name="score" value={form.score} onChange={handleInputChange} style={inputStyle}>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} - {i + 1 === 10 ? 'Exceptional' : i + 1 === 1 ? 'Poor' : 'Clear'}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Evaluation Notes & Technical Takeaways</label>
            <textarea name="notes" value={form.notes} onChange={handleInputChange} style={{ ...inputStyle, height: '120px', resize: 'none' }} maxLength={2000} required placeholder="Strong problem-solving skills, solid understanding of EF Core concurrency tokens..." />
            <small style={{ color: '#95a5a6', display: 'block', marginTop: '5px' }}>Maximum 2000 characters (Matches database limit).</small>
          </div>

          <button type="submit" style={btnStyle}>💾 Submit Scorecard</button>

          {statusMessage && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#d1ecf1', color: '#0c5460', borderRadius: '5px', fontWeight: '600', fontSize: '0.9rem' }}>
              {statusMessage}
            </div>
          )}
        </form>

        {/* Evaluation Criteria Guide Card */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#2c3e50', fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>Assessment Grading Standard</h2>
          <ul style={{ paddingLeft: '20px', color: '#34495e', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '10px' }}><strong>9 - 10:</strong> Demonstrates mastery of system architecture principles with zero oversight needed.</li>
            <li style={{ marginBottom: '10px' }}><strong>7 - 8:</strong> Solid technical competency; matches required team productivity standards.</li>
            <li style={{ marginBottom: '10px' }}><strong>5 - 6:</strong> Meets minimum technical thresholds but requires continuous mentoring.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

// Layout design definitions
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
  backgroundColor: '#2980b9',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '1rem',
};

export default CandidateEvaluations;