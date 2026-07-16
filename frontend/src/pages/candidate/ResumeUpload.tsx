import React, {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { candidateApi } from "../../services/candidateApi";

interface UploadResponse {
  message: string;
  resumeUrl: string;
}

const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [resumeUrl, setResumeUrl] =
    useState("");

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleUpload = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (!file) {
      setMessage(
        "Please select a resume first."
      );
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const response =
        (await candidateApi.uploadResume(
          file
        )) as {
          data: UploadResponse;
        };

      setMessage(response.data.message);

      setResumeUrl(
        response.data.resumeUrl
      );

      setFile(null);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ??
          error.response?.data ??
          "Upload failed. Only PDF, DOC and DOCX files are allowed."
      );
    } finally {
      setUploading(false);
    }
  };

  return (    <div className="mx-auto max-w-6xl space-y-8">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-orange-500 p-8 text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          Resume Management
        </h1>

        <p className="mt-3 max-w-2xl text-slate-200">
          Upload and manage the resume recruiters will see when reviewing your applications.
        </p>

      </div>

      <form
        onSubmit={handleUpload}
        className="grid gap-8 lg:grid-cols-3"
      >

        {/* Left Side */}

        <div className="space-y-6">

          {/* Current Resume */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="rounded-xl bg-orange-100 p-3">

                <FileText className="h-6 w-6 text-orange-500" />

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Current Resume
                </h2>

                <p className="text-sm text-slate-500">
                  Recruiters will download this file.
                </p>

              </div>

            </div>

            {resumeUrl ? (

              <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

                <div className="flex items-center gap-3">

                  <CheckCircle2 className="h-6 w-6 text-green-600" />

                  <div>

                    <p className="font-semibold text-green-700">
                      Resume Uploaded
                    </p>

                    <p className="text-sm text-green-600">
                      Your latest resume is available.
                    </p>

                  </div>

                </div>

              </div>

            ) : (

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">

                <div className="flex items-center gap-3">

                  <AlertCircle className="h-6 w-6 text-slate-400" />

                  <div>

                    <p className="font-semibold text-slate-700">
                      No Resume Uploaded
                    </p>

                    <p className="text-sm text-slate-500">
                      Upload your latest CV to improve your profile.
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* Tips */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="mb-4 text-lg font-bold">
              Tips
            </h3>

            <ul className="space-y-3 text-sm text-slate-600">

              <li>✔ PDF is the preferred format.</li>

              <li>✔ DOC and DOCX are also supported.</li>

              <li>✔ Maximum file size: 5 MB.</li>

              <li>✔ Keep your resume updated.</li>

            </ul>

          </div>

        </div>

        {/* Right Side */}

        <div className="space-y-6 lg:col-span-2">

          {/* Upload Card */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center gap-3">

              <div className="rounded-xl bg-orange-100 p-3">

                <Upload className="h-6 w-6 text-orange-500" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Upload New Resume
                </h2>

                <p className="text-sm text-slate-500">
                  Replace your current resume with a newer version.
                </p>

              </div>

            </div>

            <label
              className="
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-3xl
                border-2
                border-dashed
                border-orange-300
                bg-orange-50
                p-12
                transition
                hover:bg-orange-100
              "
            >

              <Upload className="mb-4 h-14 w-14 text-orange-500" />

              <p className="text-lg font-semibold">
                Drag & Drop your Resume
              </p>

              <p className="mt-2 text-sm text-slate-500">
                or click to browse files
              </p>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

            </label>

            {file && (

              <div className="mt-6 rounded-2xl bg-orange-50 p-5">

                <p className="font-semibold text-orange-700">
                  Selected File
                </p>

                <p className="mt-2 text-sm text-orange-600">
                  {file.name}
                </p>

                <p className="text-xs text-orange-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            )}            {/* Upload Button */}

            <button
              type="submit"
              disabled={uploading || !file}
              className="
                mt-8
                w-full
                rounded-xl
                bg-orange-500
                py-3
                text-lg
                font-semibold
                text-white
                transition
                hover:bg-orange-600
                disabled:cursor-not-allowed
                disabled:bg-orange-300
              "
            >
              {uploading
                ? "Uploading Resume..."
                : "Upload Resume"}
            </button>

            {/* Status Message */}

            {message && (

              <div
                className={`mt-6 rounded-2xl border p-5 ${
                  message.toLowerCase().includes("success")
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >

                <div className="flex items-center gap-3">

                  {message.toLowerCase().includes("success") ? (

                    <CheckCircle2 className="h-6 w-6 text-green-600" />

                  ) : (

                    <AlertCircle className="h-6 w-6 text-red-600" />

                  )}

                  <p
                    className={`font-medium ${
                      message.toLowerCase().includes("success")
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {message}
                  </p>

                </div>

              </div>

            )}

            {/* View Resume */}

            {resumeUrl && (

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      Uploaded Resume
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Your latest resume is ready for recruiters.
                    </p>

                  </div>

                  <a
                    href={`https://localhost:5001${resumeUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-500
                      px-6
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-orange-600
                    "
                  >
                    View / Download Resume
                  </a>

                </div>

              </div>

            )}

          </div>

        </div>

      </form>

    </div>
  );
};

export default ResumeUpload;