import React, { useState, useEffect } from 'react';
import  candidateService  from '../../services/candidateService';
import { toast } from 'sonner';

const CandidateProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bio: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Load existing profile data on initial mount to maintain persistence on refresh
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await candidateService.getMe();
        if (response.data) {
          setProfile({
            firstName: response.data.firstName || '',
            lastName: response.data.lastName || '',
            phoneNumber: response.data.phoneNumber || '',
            bio: response.data.bio || ''
          });
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        toast.error("Failed to load profile settings.");
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Build the structural multi-part form payload required by the C# backend
    const formData = new FormData();
    formData.append('firstName', profile.firstName);
    formData.append('lastName', profile.lastName);
    formData.append('phoneNumber', profile.phoneNumber);
    formData.append('bio', profile.bio);
    
    if (file) {
      formData.append('resume', file);
    }

    try {
      // Calls axios wrapper using explicit multipart/form-data rules
      await candidateService.updateProfile(formData);
      toast.success('Profile updated successfully! 🎉');
    } catch (error: any) {
      console.error("Update Error:", error);
      const errorMsg = error.response?.data?.message || 'Error updating profile. Check Backend Route!';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow rounded-lg border">
      <h2 className="text-2xl font-bold mb-6 text-[#102541]">Candidate Profile Management</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">First Name</label>
          <input 
            type="text"
            name="firstName" 
            placeholder="First Name" 
            value={profile.firstName} 
            onChange={handleInputChange} 
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Last Name</label>
          <input 
            type="text"
            name="lastName" 
            placeholder="Last Name" 
            value={profile.lastName} 
            onChange={handleInputChange} 
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Phone Number</label>
          <input 
            type="text"
            name="phoneNumber" 
            placeholder="Phone Number" 
            value={profile.phoneNumber} 
            onChange={handleInputChange} 
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Bio</label>
          <textarea 
            name="bio" 
            placeholder="Tell us about yourself..." 
            value={profile.bio} 
            onChange={handleInputChange} 
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            rows={4} 
          />
        </div>
        
        <div className="border-2 border-dashed p-4 mt-4 rounded bg-gray-50 border-gray-300">
          <label className="block font-bold mb-2 text-gray-700">Upload Resume (PDF/Doc)</label>
          <input 
            type="file" 
            accept=".pdf,.doc,.docx" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {file && <p className="mt-2 text-xs text-green-600 font-medium">Selected file: {file.name}</p>}
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default CandidateProfilePage;