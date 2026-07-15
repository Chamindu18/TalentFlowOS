import React, { useState, ChangeEvent, FormEvent } from 'react';
import { candidateApi } from '../../services/candidateApi';


interface UploadResponse {
    message: string;
    resumeUrl: string;
}

const ResumeUpload: React.FC = () => {
    
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [resumeUrl, setResumeUrl] = useState<string>('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        setUploading(true);
        setMessage('');
        try {
           
            const response = await candidateApi.uploadResume(file) as { data: UploadResponse };
            setMessage(response.data.message);
            setResumeUrl(response.data.resumeUrl);
        } catch (error: any) {
            setMessage(error.response?.data?.message || error.response?.data || 'Upload failed. Only PDF/Word documents are allowed.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Upload Your Resume/CV</h2>
            <p className="text-xs text-gray-500 mb-6">Supported file formats: .pdf, .doc, .docx</p>
            
            <form onSubmit={handleUpload} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer bg-gray-50">
                    <input 
                        type="file" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleFileChange}
                        className="mx-auto block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                
                {file && (
                    <div className="p-2 bg-blue-50 rounded text-xs text-blue-700 font-medium">
                        Selected File: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                )}

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
                >
                    {uploading ? 'Uploading your CV...' : 'Upload Resume'}
                </button>
            </form>

            {message && (
                <div className={`mt-4 p-3 rounded text-sm font-medium ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            {resumeUrl && (
                <div className="mt-4 p-3 bg-gray-100 rounded text-center">
                    <a 
                        href={`https://localhost:5001${resumeUrl}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-600 font-semibold hover:underline text-sm"
                    >
                        📄 View/Download Uploaded Resume
                    </a>
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;