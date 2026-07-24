import { useEffect, useState } from "react";

import { adminService } from "@/services/admin.service";
import type { Notification } from "@/types/notification";

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data =
        await adminService.getNotifications();

      setNotifications(data);
    } catch (error) {
      console.error(
        "Failed to load notifications",
        error
      );
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">
        Notifications
      </h1>

      <p className="text-slate-500 mt-2">
        View system notifications and
        important updates.
      </p>

      <div className="mt-6">
        <p className="text-sm text-slate-500">
          Total Notifications:
          {" "}
          {notifications.length}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {notifications.map(
          (notification, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border p-5 shadow-sm"
            >
              <h3 className="font-semibold text-lg">
                {notification.title}
              </h3>

              <p className="mt-2 text-slate-600">
                {notification.message}
              </p>
            </div>
          )
        )}
      </div>

      {notifications.length === 0 && (
        <div className="bg-white border rounded-xl p-8 mt-8 text-center text-slate-500">
          No notifications found.
        </div>
      )}
    </div>
  );
}