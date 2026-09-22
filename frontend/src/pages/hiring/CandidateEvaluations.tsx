import React, { useState, useEffect, useMemo } from "react";
import { User, Award, FileText, Save, Loader2, ClipboardList, CheckCircle, AlertCircle } from "lucide-react";
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

interface EvaluationInput {
  applicationId: string;
  candidateName: string;
  score: number;
  notes: string;
}

const CandidateEvaluations: React.FC = () => {
  const [form, setForm] = useState<EvaluationInput>({
    applicationId: "",
    candidateName: "",
    score: 5,
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [showOnlyShortlisted, setShowOnlyShortlisted] = useState(true);

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
    fetchApplications();
  }, []);

  const shortlistedApplications = useMemo(() => 
    applications.filter(app => app.status === "Shortlisted" || app.status === "Interview"),
    [applications]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "score" ? parseInt(value, 10) : value });
  };

  const handleApplicationSelect = (app: Application) => {
    setForm({
      ...form,
      applicationId: app.id,
      candidateName: app.candidateName,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.applicationId) {
      setStatusMessage({ text: "Please select a candidate application first.", isError: true });
      setTimeout(() => setStatusMessage(null), 4000);
      return;
    }
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/api/evaluations", form);
      
      setStatusMessage({ 
        text: `Evaluation submitted successfully for ${form.candidateName} with a score of ${form.score}/10!`, 
        isError: false 
      });
      
      setForm({ applicationId: "", candidateName: "", score: 5, notes: "" });
    } catch (error) {
      console.error("Error submitting evaluation scorecard:", error);
      setStatusMessage({ text: "Failed to submit evaluation scorecard. Please try again.", isError: true });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Panel */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Candidate Evaluations</h1>
        <p className="text-sm text-slate-500">
          Log candidate performance scores and overall structural assessment takeaways.
        </p>
      </div>

      {/* Candidate Selection Helper */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <User className="h-4 w-4 text-[#FF5B1F]" /> Select Candidate
          </h3>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={showOnlyShortlisted}
              onChange={(e) => setShowOnlyShortlisted(e.target.checked)}
              className="w-4 h-4 text-[#FF5B1F] border-slate-300 rounded focus:ring-[#FF5B1F] focus:ring-2"
            />
            <span className="text-slate-600">Shortlisted/Interview only ({shortlistedApplications.length})</span>
          </label>
        </div>
        {applicationsLoading ? (
          <div className="flex items-center justify-center py-4 text-slate-400 gap-2 text-sm">
            <Loader2 className="h-4 w-4 animate-spin text-[#FF5B1F]" /> Loading candidates...
          </div>
        ) : shortlistedApplications.length === 0 ? (
          <div className="text-center py-4 text-xs font-semibold text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            No candidates available for evaluation
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {shortlistedApplications.map((app) => (
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
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-md border whitespace-nowrap shrink-0 ${
                    app.status === "Shortlisted" ? "bg-green-100 text-green-800 border-green-200" :
                    app.status === "Interview" ? "bg-purple-100 text-purple-800 border-purple-200" :
                    "bg-slate-100 text-slate-800 border-slate-200"
                  }`}>
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
        
        {/* Left Column: Evaluation Scorecard Form */}
        <form 
          onSubmit={handleSubmit} 
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5"
        >
          {/* Candidate Name Input */}
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

          {/* Score Selector Input dropdown */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-slate-400" /> Overall Score (1 - 10)
            </label>
            <select 
              name="score" 
              value={form.score} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all text-slate-700"
            >
              {[...Array(10)].map((_, i) => {
                const val = i + 1;
                let label = "Clear Pass";
                if (val >= 9) label = "Exceptional Mastery";
                else if (val <= 3) label = "Poor / Deficient";
                else if (val <= 5) label = "Marginal Threshold";

                return (
                  <option key={val} value={val}>
                    {val} — ({label})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Evaluation Notes and character counters */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-slate-400" /> Evaluation Notes & Technical Takeaways
            </label>
            <textarea 
              name="notes" 
              value={form.notes} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all h-36 resize-none placeholder-slate-400" 
              maxLength={2000} 
              required 
              placeholder="Strong problem-solving skills, solid understanding of EF Core concurrency tokens..." 
            />
            <div className="flex justify-between items-center mt-1.5 text-xs text-slate-400">
              <span>Maximum 2000 characters (Matches database limits).</span>
              <span className="font-medium text-slate-500">{form.notes.length}/2000</span>
            </div>
          </div>

          {/* Action Submit button wrapper tracking processing state */}
          <button 
            type="submit" 
            disabled={isSubmitting || !form.applicationId}
            className="w-full py-3 bg-[#FF5B1F] hover:bg-[#e04f1a] disabled:bg-slate-200 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processing Scorecard...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Submit Scorecard Matrix
              </>
            )}
          </button>

          {/* Dynamic Status Notification Banners */}
          {statusMessage && (
            <div className={`p-4 border rounded-xl font-semibold text-sm flex items-center gap-2 animate-fade-in ${
              statusMessage.isError 
                ? "bg-red-50 border-red-200 text-red-800" 
                : "bg-emerald-50 border-emerald-200 text-emerald-800"
            }`}>
              {statusMessage.isError ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
              {statusMessage.text}
            </div>
          )}
        </form>

        {/* Right Column: Evaluation Criteria Guide Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#FF5B1F]">
            <ClipboardList className="h-5 w-5" />
            <h2 className="text-md font-bold text-slate-800">Grading Standard Guide</h2>
          </div>
          <p className="text-xs text-slate-400">Apply objective performance matrices across architectural scoring categories.</p>
          
          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/30">
              <h4 className="text-xs font-bold text-emerald-800 mb-0.5">Score 9 - 10: Architectural Mastery</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Demonstrates absolute mastery of systemic principles with zero architectural oversight required.</p>
            </div>

            <div className="p-3 rounded-xl border border-blue-100 bg-blue-50/30">
              <h4 className="text-xs font-bold text-blue-800 mb-0.5">Score 7 - 8: Competent & Autonomous</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Solid core competencies matching team expectations. Capable of shipping standard features cleanly.</p>
            </div>

            <div className="p-3 rounded-xl border border-amber-100 bg-amber-50/30">
              <h4 className="text-xs font-bold text-amber-800 mb-0.5">Score 5 - 6: Conditional / Mentoring Needed</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Meets basic technical baselines but requires constant mentoring or paired oversight loops.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CandidateEvaluations;