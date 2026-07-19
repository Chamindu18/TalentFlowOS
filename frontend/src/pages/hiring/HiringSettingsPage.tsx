// 🎯 Change line 1 to this:
import { Bell, Mail } from "lucide-react";

export default function HiringSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hiring Preferences & Settings</h1>
        <p className="text-sm text-slate-500">Configure notifications for scorecards, applicant submittals, and feedback logs.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
        {/* Notification Group */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#FF5B1F]" /> Recruiting Alerts
          </h3>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-1 accent-[#FF5B1F]" />
              <div>
                <p className="text-sm font-medium text-slate-700">Scorecard Submissions</p>
                <p className="text-xs text-slate-500">Notify me immediately when an interviewer submits candidate evaluation scorecards.</p>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-1 accent-[#FF5B1F]" />
              <div>
                <p className="text-sm font-medium text-slate-700">Daily Schedule Summary</p>
                <p className="text-xs text-slate-500">Receive a morning breakdown of all interviews slated for today.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Integration Email Group */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#FF5B1F]" /> Calendar Integration
          </h3>
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium text-slate-700">Sync with Outlook / Google Calendar</p>
              <p className="text-xs text-slate-500">Automatically push interview time slots directly into your team schedule core blocks.</p>
            </div>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all">
              Connected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}