import React from 'react';

const CandidateSettingsPage = () => {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>
            
            <div className="max-w-3xl space-y-6">
                {/* Account Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
                    <p className="text-gray-500 mt-1"></p>
                    <div className="mt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Change Password</button>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                    <p className="text-gray-500 mt-1"></p>
                    <div className="mt-4 flex items-center">
                        <input type="checkbox" id="email-notif" className="w-5 h-5 text-blue-600" />
                        <label htmlFor="email-notif" className="ml-3 text-gray-700">Receive email notifications</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateSettingsPage;