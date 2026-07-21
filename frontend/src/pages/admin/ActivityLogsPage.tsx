import { useEffect, useState } from "react";

import { adminService } from "@/services/admin.service";
import type { ActivityLog } from "@/types/activityLog";

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data =
        await adminService.getActivityLogs();

      setLogs(data);
    } catch (error) {
      console.error(
        "Failed to load activity logs",
        error
      );
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold">
        Activity Logs
      </h1>

      <p className="text-slate-500 mt-2">
        Monitor system activity and user actions.
      </p>

      <div className="mt-6">
        <p className="text-sm text-slate-500">
          Total Logs: {logs.length}
        </p>
      </div>

      <div className="bg-white rounded-xl border mt-8 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">
                Activity
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr
                key={index}
                className="border-t"
              >
                <td className="p-4">
                  {log.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {logs.length === 0 && (
        <div className="bg-white border rounded-xl p-8 mt-8 text-center text-slate-500">
          No activity logs found.
        </div>
      )}
    </div>
  );
}