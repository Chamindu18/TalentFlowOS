import React, { useState, useEffect } from 'react';

const CandidateAnalyticsPage = () => {
    
    const [analytics] = useState({ 
        applicationCount: 5, 
        profileViews: 12 
    });

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics & Insights</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Application Activity Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700">Application Activity</h2>
                    <p className="text-gray-500 mt-2">Total jobs applied by you</p>
                    <p className="text-4xl font-bold text-blue-600 mt-4">
                        {analytics.applicationCount}
                    </p>
                </div>

                {/* Profile Views Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-700">Profile Views</h2>
                    <p className="text-gray-500 mt-2">Times your profile was viewed</p>
                    <p className="text-4xl font-bold text-green-600 mt-4">
                        {analytics.profileViews}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CandidateAnalyticsPage;