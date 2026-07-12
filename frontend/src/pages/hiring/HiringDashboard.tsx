import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🧭 Navigation engine route mapper
import api from "@/lib/axios"; // 🔌 Central Axios configuration instance
import { 
  Calendar, 
  FileText, 
  Gavel, 
  CheckCircle2, 
  TrendingUp, 
  Briefcase, 
  ClipboardList, 
  AlertCircle, 
  Clock, 
  Play, 
  Loader2,
  BarChart3,
  MessageSquare // 🎯 Added this icon for the feedback route link
} from "lucide-react";

interface DashboardSummary {
  totalInterviewsScheduled: number;
  totalEvaluationsCompleted: number;
  totalDecisionsMade: number;
  acceptedCount: number;
  rejectedCount: number;
  conversionRate: number;
}

interface TodayInterview {
  id: number;
  candidateName: string;
  interviewType: string;
  timeLabel: string;
  status: "Scheduled" | "In Progress" | "Completed";
}

const HiringDashboard: React.FC = () => {
  const [todayInterviews, setTodayInterviews] = useState<TodayInterview[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // 🚀 Hook mapping browser routing paths

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 📊 Fetches dynamic counts from your backend analytics summary
        const summaryResponse = await api.get<DashboardSummary>("/analytics/summary");
        setSummary(summaryResponse.data);

        // 📅 Fetches today's live interview items from your scheduling controller
        const interviewsResponse = await api.get<TodayInterview[]>("/interview/today");
        setTodayInterviews(interviewsResponse.data);
      } catch (error) {
        console.error("Error fetching hiring data from database:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-500 font-medium text-sm">
        <Loader2 className="h-6 w-6 animate-spin text-[#FF5B1F]" />
        Loading Workspace Metrics...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Welcome Title Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hiring Manager Dashboard</h1>
        <p className="text-sm text-slate-500">
          Track and manage active interview loops, candidate evaluations, and final decisions.
        </p>
      </div>

      {/* 📊 Premium Metrics Ribbon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1: Scheduled Loops */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interviews</span>
            <p className="text-2xl font-bold text-slate-800">{summary?.totalInterviewsScheduled || 0}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 2: Evaluations Filed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Evaluations</span>
            <p className="text-2xl font-bold text-slate-800">{summary?.totalEvaluationsCompleted || 0}</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <FileText className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 3: Decisions Logged */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Decisions</span>
            <p className="text-2xl font-bold text-slate-800">{summary?.totalDecisionsMade || 0}</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Gavel className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 4: Offers Accepted */}
        <div className="bg-white p-5 rounded-2xl border border-l-4 border-l-emerald-500 border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Offers Open</span>
            <p className="text-2xl font-bold text-slate-800">{summary?.acceptedCount || 0}</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        {/* KPI 5: Conversion Matrix Gauge */}
        <div className="bg-white p-5 rounded-2xl border border-l-4 border-l-orange-500 border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Conversion</span>
            <p className="text-2xl font-bold text-slate-800">{summary?.conversionRate || 0}%</p>
          </div>
          <div className="p-3 bg-[#FFF3EC] text-[#FF5B1F] rounded-xl">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ⚡ Quick Commands Hub Row */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-[#FF5B1F]" />
          <h2 className="text-sm font-bold text-slate-800">Hiring Management Actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => navigate("/hiring/interviews")}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 border border-slate-200/60"
          >
            <Calendar className="h-3.5 w-3.5" /> View Schedules
          </button>
          
          {/* 🎯 New Connected Feedback Loop Gateway Link */}
          <button 
            onClick={() => navigate("/hiring/feedback")}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 border border-slate-200/60"
          >
            <MessageSquare className="h-3.5 w-3.5" /> Record Feedback
          </button>

          <button 
            onClick={() => navigate("/hiring/evaluations")}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 border border-slate-200/60"
          >
            <ClipboardList className="h-3.5 w-3.5" /> Add Evaluation
          </button>
          
          <button 
            onClick={() => navigate("/hiring/decisions")}
            className="px-4 py-2 bg-[#FF5B1F] hover:bg-[#e04f1a] text-white rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Gavel className="h-3.5 w-3.5" /> Make Final Decision
          </button>
        </div>
      </div>

      {/* 🏢 Main Workspace Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Grid Content: Pipelines and Charts (col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section A: Urgent Pending Action Feed */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-800">Pending Actions Workflow</h2>
            </div>
            
            <div className="space-y-3">
              {/* Card A1: Feedback Submission Request */}
              <div className="flex items-center justify-between p-4 bg-amber-50/50 border border-amber-200/70 rounded-xl gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1">File Scorecard Matrix</h4>
                  <p className="text-xs text-slate-600">
                    Jane Doe completed her technical assessment loop. Please submit her evaluation scorecard.
                  </p>
                </div>
                <button 
                  onClick={() => navigate("/hiring/evaluations")}
                  className="px-3 py-1.5 bg-white hover:bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold whitespace-nowrap shadow-xs transition-all"
                >
                  Add Scorecard
                </button>
              </div>

              {/* Card A2: Final Resolution Request */}
              <div className="flex items-center justify-between p-4 bg-blue-50/40 border border-blue-200/60 rounded-xl gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-blue-800 flex items-center gap-1">Closing Authority Sign-Off</h4>
                  <p className="text-xs text-slate-600">
                    John Doe has 3 finalized evaluations. Time to record the closing hiring decision.
                  </p>
                </div>
                <button 
                  onClick={() => navigate("/hiring/decisions")}
                  className="px-3 py-1.5 bg-white hover:bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-xs font-bold whitespace-nowrap shadow-xs transition-all"
                >
                  Make Decision
                </button>
              </div>
            </div>
          </div>

          {/* Section B: Dynamic Graphic Analytics Vector Chart */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-[#FF5B1F]" /> Hiring Analytics Overview
                </h2>
                <p className="text-xs text-slate-400">Real-time cycle distribution across tracking pipelines.</p>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center">
              {/* Dynamic Bar Vectors */}
              <div className="flex items-end gap-10 h-36 justify-center w-full pb-2 border-b border-slate-200/80">
                {/* Bar 1: Schedules */}
                <div className="flex flex-col items-center gap-2 group justify-end h-full">
                  <span className="text-xs font-bold text-blue-600 transition-all opacity-80 group-hover:opacity-100">
                    {summary?.totalInterviewsScheduled || 0}
                  </span>
                  <div 
                    style={{ height: `${Math.min((summary?.totalInterviewsScheduled || 0) * 10, 110) || 6}px` }}
                    className="w-10 bg-blue-500 hover:bg-blue-600 rounded-t-lg shadow-xs transition-all duration-500 cursor-pointer"
                  />
                </div>

                {/* Bar 2: Evaluations */}
                <div className="flex flex-col items-center gap-2 group justify-end h-full">
                  <span className="text-xs font-bold text-purple-600 transition-all opacity-80 group-hover:opacity-100">
                    {summary?.totalEvaluationsCompleted || 0}
                  </span>
                  <div 
                    style={{ height: `${Math.min((summary?.totalEvaluationsCompleted || 0) * 10, 110) || 6}px` }}
                    className="w-10 bg-purple-500 hover:bg-purple-600 rounded-t-lg shadow-xs transition-all duration-500 cursor-pointer"
                  />
                </div>

                {/* Bar 3: Decisions */}
                <div className="flex flex-col items-center gap-2 group justify-end h-full">
                  <span className="text-xs font-bold text-amber-600 transition-all opacity-80 group-hover:opacity-100">
                    {summary?.totalDecisionsMade || 0}
                  </span>
                  <div 
                    style={{ height: `${Math.min((summary?.totalDecisionsMade || 0) * 10, 110) || 6}px` }}
                    className="w-10 bg-amber-500 hover:bg-amber-600 rounded-t-lg shadow-xs transition-all duration-500 cursor-pointer"
                  />
                </div>

                {/* Bar 4: Offers */}
                <div className="flex flex-col items-center gap-2 group justify-end h-full">
                  <span className="text-xs font-bold text-[#FF5B1F] transition-all opacity-80 group-hover:opacity-100">
                    {summary?.acceptedCount || 0}
                  </span>
                  <div 
                    style={{ height: `${Math.min((summary?.acceptedCount || 0) * 10, 110) || 6}px` }}
                    className="w-10 bg-[#FF5B1F] hover:bg-[#e04f1a] rounded-t-lg shadow-xs transition-all duration-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Graphical Text Node Matrix Labels */}
              <div className="flex justify-center gap-10 w-full mt-3 font-semibold text-[10px] text-slate-400 uppercase tracking-wider text-center">
                <span className="w-10 text-blue-600/90">Schedules</span>
                <span className="w-10 text-purple-600/90">Evals</span>
                <span className="w-10 text-amber-600/90">Decisions</span>
                <span className="w-10 text-[#FF5B1F]/90">Offers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Grid Content: Live Agenda Timeline Feed (col-span-1) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 h-full">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#FF5B1F]" /> Today's Interviews
            </h2>
            <p className="text-xs text-slate-400">Upcoming assessment loops scheduled for today.</p>
          </div>
          
          <div className="space-y-3 pt-1">
            {todayInterviews.length === 0 ? (
              <div className="py-10 text-center text-xs font-semibold text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                🎉 No interviews remaining for today!
              </div>
            ) : (
              todayInterviews.map((interview) => {
                const borderStyles = {
                  "Scheduled": "border-l-sky-500 bg-sky-50/20",
                  "In Progress": "border-l-[#FF5B1F] bg-[#FFF3EC]/20 animate-pulse",
                  "Completed": "border-l-slate-400 bg-slate-50/50 grayscale"
                };

                const badgeStyles = {
                  "Scheduled": "bg-sky-50 text-sky-700 border-sky-100",
                  "In Progress": "bg-orange-50 text-[#FF5B1F] border-orange-100",
                  "Completed": "bg-slate-100 text-slate-600 border-slate-200"
                };

                return (
                  <div 
                    key={interview.id} 
                    className={`p-3.5 border border-slate-100 border-l-4 rounded-xl shadow-xs space-y-2 transition-all hover:bg-slate-50/80 ${borderStyles[interview.status] || "border-l-slate-400"}`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 truncate">{interview.candidateName}</h4>
                      <p className="text-xs text-slate-400 font-medium truncate">{interview.interviewType}</p>
                    </div>
                    
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold border rounded-md ${badgeStyles[interview.status]}`}>
                      {interview.status === "Scheduled" && <Clock className="h-3 w-3" />}
                      {interview.status === "In Progress" && <Play className="h-3 w-3 fill-current" />}
                      {interview.status === "Completed" && <CheckCircle2 className="h-3 w-3" />}
                      {interview.timeLabel}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HiringDashboard;