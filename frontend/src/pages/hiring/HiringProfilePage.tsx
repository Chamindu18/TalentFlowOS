import { User, Building2, Briefcase, Calendar } from "lucide-react";

export default function HiringProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hiring Manager Profile</h1>
        <p className="text-sm text-slate-500">Manage your internal talent acquisition workspace profiles.</p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="h-24 w-24 bg-[#FFF3EC] text-[#FF5B1F] rounded-full flex items-center justify-between p-6">
          <User className="h-12 w-12 mx-auto" />
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-xl font-bold text-slate-800">Kavindu Wickramathilaka</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> Engineering</span>
            <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> Technical Hiring Manager</span>
          </div>
        </div>
      </div>

      {/* Recruitment Metrics Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-sm">
            <span>Assigned Open Positions</span>
            <Briefcase className="h-4 w-4" />
          </div>
          <p className="text-3xl font-bold text-slate-800">4 Active</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-sm">
            <span>Interviews Completed This Month</span>
            <Calendar className="h-4 w-4" />
          </div>
          <p className="text-3xl font-bold text-slate-800">12 Panels</p>
        </div>
      </div>
    </div>
  );
}