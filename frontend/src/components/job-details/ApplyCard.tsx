import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { applicationService } from "@/services/applicationService";

interface Props {
  jobId: string;
}

export default function ApplyCard({
  jobId,
}: Props) {
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState("");

  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);

      await applicationService.create({
        jobId,
        coverLetter,
      });

      alert("Application submitted successfully!");

      navigate("/candidate/applications");

    } catch (error) {
      console.error(error);

      alert("Failed to submit application.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        Apply for this Job
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Include a short cover letter to improve your application.
      </p>

      <textarea
        rows={8}
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Write your cover letter..."
        className="mt-5 w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-orange-500"
      />

      <Button
        onClick={handleApply}
        disabled={loading}
        className="mt-5 w-full bg-orange-500 hover:bg-orange-600"
      >
        {loading ? "Submitting..." : "Apply Now"}
      </Button>

    </div>
  );
}