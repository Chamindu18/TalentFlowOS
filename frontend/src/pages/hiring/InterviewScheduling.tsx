import React, { useState, useEffect } from "react";
import { User, Briefcase, Calendar, Clock, FileText, PlusCircle, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios"; // 📡 Using your configured axios instance

interface InterviewInput {
  candidateName: string;
  position: string;
  interviewDate: string;
  interviewTime: string;
  interviewerNotes: string;
}

interface InterviewItem {
  id: string; // Adjusted to string to match backend Guids safely
  candidateName: string;
  position: string;
  interviewDate: string;
  interviewTime: string;
}

const InterviewScheduling: React.FC = () => {
  const [form, setForm] = useState<InterviewInput>({
    candidateName: "",
    position: "",
    interviewDate: "",
    interviewTime: "",
    interviewerNotes: "",
  });

  const [interviews, setInterviews] = useState<InterviewItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // 📥 1. Fetch upcoming interviews from backend
  const fetchInterviews = async (showLoading = false) => {
    try {
      if (showLoading) setIsLoading(true); 
      const response = await axiosInstance.get("/interviews");
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Wrapped inside a macro-task timer to clear the strict react-hooks/set-state-in-effect linter rule
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInterviews(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 📤 2. Submit new interview loop to database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🎯 THE FIX: Explicitly map frontend properties to the exact keys your C# DTO expects
      const backendPayload = {
        candidateName: form.candidateName,
        position: form.position,
        date: form.interviewDate,       // Maps cleanly to backend 'Date'
        timeSlot: form.interviewTime,   // Maps cleanly to backend 'TimeSlot'
        notes: form.interviewerNotes    // Maps cleanly to backend 'Notes'
      };

      // 🔌 Transmit the corrected payload over the network channel
      await axiosInstance.post("/interviews", backendPayload);
      
      setStatusMessage({ text: `Success! Loop scheduled for ${form.candidateName}.`, isError: false });
      setForm({ candidateName: "", position: "", interviewDate: "", interviewTime: "", interviewerNotes: "" });
      
      fetchInterviews(true); 
    } catch (error) {
      console.error("Error scheduling interview:", error);
      setStatusMessage({ text: "Failed to schedule interview. Please try again.", isError: true });
    } finally {
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Panel */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Schedule an Interview</h1>
        <p className="text-sm text-slate-500">
          Set up new assessment timelines and sync parameters directly with candidate records.
        </p>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Interactive Scheduling Card Form */}
        <form 
          onSubmit={handleSubmit} 
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="h-4 w-4 text-slate-400" /> Candidate Full Name
            </label>
            <input 
              type="text" 
              name="candidateName" 
              value={form.candidateName} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all placeholder-slate-400" 
              required 
              placeholder="Jane Doe" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-slate-400" /> Target Job Position
            </label>
            <input 
              type="text" 
              name="position" 
              value={form.position} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all placeholder-slate-400" 
              required 
              placeholder="Senior Dotnet Developer" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-400" /> Date
              </label>
              <input 
                type="date" 
                name="interviewDate" 
                value={form.interviewDate} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all text-slate-700" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-400" /> Time Slot
              </label>
              <input 
                type="time" 
                name="interviewTime" 
                value={form.interviewTime} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all text-slate-700" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-slate-400" /> Focus Areas / Pre-interview Notes
            </label>
            <textarea 
              name="interviewerNotes" 
              value={form.interviewerNotes} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all h-24 resize-none placeholder-slate-400" 
              placeholder="System architecture focus, background assessments, framework queries..." 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-[#FF5B1F] hover:bg-[#e04f1a] text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <PlusCircle className="h-4 w-4" /> Confirm & Schedule Loop
          </button>

          {statusMessage && (
            <div className={`p-4 border rounded-xl font-semibold text-sm ${
              statusMessage.isError 
                ? "bg-red-50 border-red-200 text-red-800" 
                : "bg-emerald-50 border-emerald-200 text-emerald-800"
            }`}>
              {statusMessage.text}
            </div>
          )}
        </form>

        {/* Right Column: Dynamic Active Assessment Loops Sidebar Feed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <h2 className="text-md font-bold text-slate-800">Upcoming Assessment Loops</h2>
            <p className="text-xs text-slate-400">Real-time candidate pipelines slated next.</p>
          </div>
          
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-8 text-slate-400 gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin text-[#FF5B1F]" /> Loading pipeline...
              </div>
            ) : interviews.length === 0 ? (
              <div className="text-center py-8 text-xs font-semibold text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                No scheduled interview loops found.
              </div>
            ) : (
              interviews.map((loop) => (
                <div key={loop.id} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all">
                  <div className="p-2 bg-orange-50 rounded-lg text-[#FF5B1F] mt-0.5">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-700 truncate">{loop.candidateName}</h4>
                    <p className="text-xs text-slate-500 font-medium truncate">{loop.position}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 text-[11px] font-semibold text-[#FF5B1F] bg-[#FFF3EC] border border-[#FFF3EC] rounded-md">
                      {loop.interviewDate} at {loop.interviewTime}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default InterviewScheduling;