import React, { useState, useEffect } from "react";
import { Scale, FileText, Lock, Loader2, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface Application {
  id: string;
  candidateName: string;
  jobTitle: string;
  companyName: string;
  status: string;
  appliedAt: string;
}

interface DecisionInput {
  applicationId: string;
  managerId: string;
  decision: string;
  justification: string;
}

const HiringDecisions: React.FC = () => {
  const [form, setForm] = useState<DecisionInput>({
    applicationId: "",
    managerId: "",
    decision: "Hired",
    justification: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setApplicationsLoading(true);
      const response = await axiosInstance.get("/JobApplications/company");
      setApplications(response.data.data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setApplicationsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/api/hiring-decisions", form);
      
      setStatusMessage({ 
        text: `Final resolution locked: Candidate status set to "${form.decision}".`, 
        isError: false 
      });
      
      setForm({
        applicationId: "",
        managerId: "",
        decision: "Hired",
        justification: "",
      });
      
      fetchApplications();
    } catch (error) {
      console.error("Error executing hiring decision authorization:", error);
      setStatusMessage({ text: "Failed to record compliance sign-off. Please review API endpoint routing.", isError: true });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Panel */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Final Hiring Decisions</h1>
        <p className="text-sm text-slate-500">
          Log formal recruitment resolutions, job offer authorizations, or rejection parameters.
        </p>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Decision Authority Form Card */}
        <form 
          onSubmit={handleSubmit} 
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5"
        >
          {/* Application Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-slate-400" /> Select Application
            </label>
            {applicationsLoading ? (
              <div className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-400">
                Loading applications...
              </div>
            ) : (
              <select 
                name="applicationId" 
                value={form.applicationId} 
                onChange={handleInputChange} 
                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all text-slate-700 font-medium"
                required
              >
                <option value="">Select an application</option>
                {applications.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.candidateName} - {app.jobTitle} ({app.status})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Resolution Selector Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Scale className="h-4 w-4 text-slate-400" /> Select Final Resolution
            </label>
            <select 
              name="decision" 
              value={form.decision} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all text-slate-700 font-medium"
              required
            >
              <option value="Hired">🎉 Extend Official Job Offer (Hired)</option>
              <option value="Rejected">❌ Decline Candidate (Rejected)</option>
            </select>
          </div>

          {/* Justification Text Area Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-slate-400" /> Executive Justification / Business Case
            </label>
            <textarea 
              name="justification" 
              value={form.justification} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5B1F] focus:ring-2 focus:ring-[#FF5B1F]/10 transition-all h-40 resize-none placeholder-slate-400" 
              maxLength={2000} 
              required 
              placeholder="Candidate exceeded all technical baselines during structural loops. Team consensus is highly favorable for immediate onboarding..." 
            />
            <div className="flex justify-between items-center mt-1.5 text-xs text-slate-400">
              <span>Maximum 2000 characters (Matches SQL database capacity limits).</span>
              <span className="font-medium text-slate-500">{form.justification.length}/2000</span>
            </div>
          </div>

          {/* Dynamic Contextual Sign-Off Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting || !form.applicationId}
            className={`w-full py-3 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:bg-slate-200 ${
              form.decision === "Hired" 
                ? "bg-emerald-600 hover:bg-emerald-700" 
                : "bg-rose-600 hover:bg-rose-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Committing Sign-Off...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" /> Execute Sign-Off Resolution
              </>
            )}
          </button>

          {/* Conditional Status Messages Banner */}
          {statusMessage && (
            <div className={`p-4 border rounded-xl font-semibold text-sm flex items-center gap-2 animate-fade-in ${
              statusMessage.isError 
                ? "bg-red-50 border-red-200 text-red-800" 
                : "bg-blue-50 border-blue-200 text-blue-800 border-l-4 border-l-blue-500"
            }`}>
              {statusMessage.isError ? <ShieldAlert className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-blue-500" />}
              {statusMessage.text}
            </div>
          )}
        </form>

        {/* Right Column: Informational Compliance Policy Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-800">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h2 className="text-md font-bold">Compliance Notice</h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Logging a final resolution here updates the applicant tracking state across the entire core ecosystem. 
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            If an offer is authorized, automated system event triggers will instantly notify Human Resources to initialize standard corporate background checkpoints and provisioning pipelines.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default HiringDecisions;