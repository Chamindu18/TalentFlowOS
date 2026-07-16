import React, { useState, useEffect } from 'react';
import candidateService from '../../services/candidateService';
import { toast } from 'sonner';

const SettingsPage: React.FC = () => {
  const [receiveNotifications, setReceiveNotifications] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await candidateService.getMe();
       
        if (response.data && response.data.receiveNotifications !== undefined) {
          setReceiveNotifications(response.data.receiveNotifications);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  
  const handleNotificationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setReceiveNotifications(isChecked);

    try {
      await candidateService.updateNotifications(isChecked);
      toast.success(isChecked ? "Notifications enabled! 🔔" : "Notifications disabled! 🔕");
    } catch (error: any) {
      console.error("Notification Update Error:", error);
      toast.error("Failed to update notification settings.");
     
      setReceiveNotifications(!isChecked);
    }
  };

  const handleChangePasswordClick = () => {
   
    const oldPassword = prompt("Enter Old Password:");
    const newPassword = prompt("Enter New Password:");

    if (oldPassword && newPassword) {
      setLoading(true);
      candidateService.changePassword(oldPassword, newPassword)
        .then(() => {
          toast.success("Password changed successfully! 🔐");
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response?.data?.message || "Error changing password.");
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#102541] mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Account Settings Section */}
        <div className="bg-white p-6 shadow rounded-xl border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Account Settings</h2>
          <button
            onClick={handleChangePasswordClick}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {loading ? "Processing..." : "Change Password"}
          </button>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-6 shadow rounded-xl border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="notifications"
              checked={receiveNotifications}
              onChange={handleNotificationChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="notifications" className="text-gray-700 font-medium select-none">
              Receive email notifications
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;