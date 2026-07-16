import React, { useState } from 'react';

interface FeedbackInput {
  interviewId: string;
  interviewerName: string;
  comments: string;
  recommendation: string;
}

const InterviewFeedback: React.FC = () => {
  const [form, setForm] = useState<FeedbackInput>({
    interviewId: 'b3a8d11c-5678-4cd4-823b-12d45f6a7b8c', // Mock active interview GUID
    interviewerName: '',
    comments: '',
    recommendation: 'Move Forward',
  });

  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will connect directly to your POST api/feedback/submit backend endpoint later
    setStatusMessage(`Feedback submitted successfully! Recommendation: ${form.recommendation}.`);
    setForm({ interviewId: 'b3a8d11c-5678-4cd4-823b-12d45f6a7b8c', interviewerName: '', comments: '', recommendation: 'Move Forward' });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '5px', fontWeight: '600' }}>Interview Feedback Loop</h1>
      <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Submit centralized commentary, observations, and pipeline path recommendations post-interview assessment.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Feedback Submission Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Interviewer / Reviewer Name</label>
            <input type="text" name="interviewerName" value={form.interviewerName} onChange={handleInputChange} style={inputStyle} required placeholder="Sarah Jenkins" />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Pipeline Recommendation</label>
            <select name="recommendation" value={form.recommendation} onChange={handleInputChange} style={inputStyle}>
              <option value="Move Forward">🟢 Move Forward (Next Round / Offer)</option>
              <option value="Hold">🟡 Put on Hold (Consider for Other Roles)</option>
              <option value="Reject">🔴 Reject (Does Not Match Requirements)</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Detailed Feedback & Candidate Observations</label>
            <textarea name="comments" value={form.comments} onChange={handleInputChange} style={{ ...inputStyle, height: '140px', resize: 'none' }} maxLength={2000} required placeholder="Excellent coding structure displayed during the live technical challenge. Answered domain questions confidently..." />
            <small style={{ color: '#95a5a6', display: 'block', marginTop: '5px' }}>Maximum 2000 characters (Matches Fluent API constraint).</small>
          </div>

          <button type="submit" style={btnStyle}>📣 Log Interview Feedback</button>

          {statusMessage && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e2f0d9', color: '#385723', borderRadius: '5px', fontWeight: '600', fontSize: '0.9rem' }}>
              {statusMessage}
            </div>
          )}
        </form>

        {/* Informational Guidelines Sidebar */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#2c3e50', fontSize: '1.2rem', marginBottom: '15px', fontWeight: '600' }}>Reviewer Responsibilities</h2>
          <p style={{ color: '#34495e', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 15px 0' }}>
            Please ensure all input feedback stays purely objective and tracks directly against target role competency requirements.
          </p>
          <div style={{ padding: '12px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '500' }}>
            ⚠️ <strong>SLA Reminder:</strong> Feedback records must be compiled and submitted within 24 hours of matching assessment loop completions.
          </div>
        </div>

      </div>
    </div>
  );
};

// Design declarations
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
  backgroundColor: '#d35400',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '1rem',
};

export default InterviewFeedback;