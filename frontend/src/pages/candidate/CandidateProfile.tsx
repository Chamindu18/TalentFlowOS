import React, { useState } from 'react';
import { candidateService } from '../../services/candidateService';

const CandidateProfilePage: React.FC = () => {
  const candidateId = "11111111-2222-3333-4444-555555555555"; 

  const [profile, setProfile] = useState<CandidateProfile>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bio: ''
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await candidateService.updateProfile(candidateId, profile);
      setMessage('Profile updated successfully!');

      if (file) {
        setMessage('Updating profile and uploading resume...');
        await candidateService.uploadResume(candidateId, file);
        setMessage('Profile and Resume updated successfully! 🎉');
      }
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', color: '#333' }}>
      <h2 style={{ marginBottom: '20px' }}>Candidate Profile Management</h2>
      {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red', fontWeight: 'bold' }}>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>First Name</label>
          <input type="text" name="firstName" value={profile.firstName} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
          <input type="text" name="lastName" value={profile.lastName} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
          <input type="text" name="phoneNumber" value={profile.phoneNumber} onChange={handleInputChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Bio</label>
          <textarea name="bio" value={profile.bio} onChange={handleInputChange} rows={4} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', border: '1px dashed #bbb', borderRadius: '4px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload Resume (PDF/Doc)</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
          {file && <p style={{ fontSize: '12px', margin: '5px 0 0', color: '#555' }}>Selected: {file.name}</p>}
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          {loading ? 'Saving...' : 'Save Profile & Upload CV'}
        </button>
      </form>
    </div>
  );
};

export default CandidateProfilePage;