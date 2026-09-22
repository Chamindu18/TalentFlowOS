import React, { useState, useEffect, useMemo } from "react";
import { User, Briefcase, Calendar, Clock, FileText, PlusCircle, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { applicationService } from "@/services/applicationService";

interface Application {
  id: string;
  candidateId: string;
  jobId: string;
  candidateName: string;
  jobTitle: string;
  companyName: string;
  status?: string;
  appliedAt: string;
  coverLetter?: string;
  createdAt: string;
  updatedAt: string;
}

interface InterviewInput {
  applicationId: string;
  candidateName: string;
  position: string;
  interviewDate: string;
  interviewTime: string;
  interviewerNotes: string;
  interviewType: string;
}

interface InterviewItem {
  id: string;
  candidateName: string;
  position: string;
  interviewDate: string;
  interviewTime: string;
  interviewType?: string;
  status?: number;
}

const InterviewScheduling: React.FC = () => {
  const [form, setForm] = useState<InterviewInput>({
    applicationId: "",
    candidateName: "",
    position: "",
    interviewDate: "",
    interviewTime: "",
    interviewerNotes: "",
    interviewType: "Technical",
  });

  const [interviews, setInterviews] = useState<InterviewItem[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [showOnlyShortlisted, setShowOnlyShortlisted] = useState(true);

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

  const fetchApplications = async () => {
    try {
      setApplicationsLoading(true);
      const response = await applicationService.getCompanyApplications();
      setApplications(response || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setApplicationsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInterviews(false);
      fetchApplications();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const shortlistedApplications = useMemo(() => 
    applications.filter(app => app.status === "Shortlisted"),
    [applications]
  );

  const displayApplications = showOnlyShortlisted ? shortlistedApplications : applications;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleApplicationSelect = (app: Application) => {
    setForm({
      ...form,
      applicationId: app.id,
      candidateName: app.candidateName,
      position: app.jobTitle,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.applicationId) {
      setStatusMessage({ text: "Please select a candidate application first.", isError: true });
      setTimeout(() => setStatusMessage(null), 4000);
      return;
    }
    if (!form.interviewDate || !form.interviewTime) {
      setStatusMessage({ text: "Please select both date and time for the interview.", isError: true });
      setTimeout(() => setStatusMessage(null), 4000);
      return;
    }
    try {
      const scheduledTime = new Date(`${form.interviewDate}T${form.interviewTime}:00`).toISOString();
      
      const backendPayload = {
        applicationId: form.applicationId,
        roundNumber: 1,
        interviewType: form.interviewType,
        notes: form.interviewerNotes,
        scheduledTime: scheduledTime,
        durationMinutes: 45,
        locationOrLink: "Microsoft Teams"
      };

      await axiosInstance.post("/interview/schedule", backendPayload);
      
      setStatusMessage({ text: `Success! Interview scheduled for ${form.candidateName}.`, isError: false });
      setForm({ applicationId: "", candidateName: "", position: "", interviewDate: "", interviewTime: "", interviewerNotes: "", interviewType: "Technical" });
      
      fetchInterviews(true); 
      fetchApplications();
    } catch (error) {
      console.error("Error scheduling interview:", error);
      setStatusMessage({ text: "Failed to schedule interview. Please try again.", isError: true });
    } finally {
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };
  
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-100 text-green-800 border-green-200";
      case "Applied":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Interview":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Offer":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
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

      {/* Candidate Selection Helper */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <User className="h-4 w-4 text-[#FF5B1F]" /> Select Shortlisted Candidate
          </h3>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={showOnlyShortlisted}
              onChange={(e) => setShowOnlyShortlisted(e.target.checked)}
              className="w-4 h-4 text-[#FF5B1F] border-slate-300 rounded focus:ring-[#FF5B1F] focus:ring-2"
            />
            <span className="text-slate-600">Shortlisted only ({shortlistedApplications.length})</span>
          </label>
        </div>
        {applicationsLoading ? (
          <div className="flex items-center justify-center py-4 text-slate-400 gap-2 text-sm">
            <Loader2 className="h-4 w-4 animate-spin text-[#FF5B1F]" /> Loading candidates...
          </div>
        ) : displayApplications.length === 0 ? (
          <div className="text-center py-4 text-xs font-semibold text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            {showOnlyShortlisted ? "No shortlisted candidates available for scheduling" : "No applications found"}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayApplications.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => handleApplicationSelect(app)}
                className={`p-3 rounded-xl border transition-all text-left ${
                  form.applicationId === app.id
                    ? "border-[#FF5B1F] bg-[#FFF3EC]/50 shadow-sm"
                    : "border-slate-100 hover:bg-slate-50 hover:border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-700 truncate">{app.candidateName}</h4>
                    <p className="text-xs text-slate-500 font-medium truncate">{app.jobTitle}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-md border ${getStatusBadge(app.status)} whitespace-nowrap shrink-0`}>
                    {app.status || "Applied"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 truncate">Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
              </button>
            ))}
          </div>
        )}
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
              placeholder="Auto-filled when selecting candidate above" 
              readOnly
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
              placeholder="Auto-filled when selecting candidate above"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-slate-400" /> Interview Type
            </label>
            <select 
              name="interviewType" 
              value={form.interviewType} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all text-slate-700"
              required
            >
              <option value="HR">HR Screening</option>
              <option value="Technical">Technical Assessment</option>
              <option value="Managerial">Managerial Round</option>
              <option value="Final">Final Interview</option>
            </select>
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
            disabled={!form.applicationId}
            className="w-full py-3 bg-[#FF5B1F] hover:bg-[#e04f1a] text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:bg-slate-200 disabled:cursor-not-allowed"
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