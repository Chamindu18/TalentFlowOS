import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import candidateService from "../../services/candidateService";
import { toast } from "sonner";

import {
  User,
  Phone,
  FileText,
  CheckCircle2,
} from "lucide-react";

const CandidateProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const completion =
  (profile.firstName ? 25 : 0) +
  (profile.lastName ? 25 : 0) +
  (profile.phoneNumber ? 25 : 0) +
  (profile.bio ? 25 : 0);

  async function fetchProfile() {
    try {
      const response = await candidateService.getMe();

      if (response.data) {
        setProfile({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          phoneNumber: response.data.phoneNumber || "",
          bio: response.data.bio || "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("firstName", profile.firstName);
    formData.append("lastName", profile.lastName);
    formData.append(
      "phoneNumber",
      profile.phoneNumber
    );
    formData.append("bio", profile.bio);

    try {
      await candidateService.updateProfile(formData);

      toast.success(
        "Profile updated successfully!"
      );

      fetchProfile();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (    <div className="mx-auto max-w-7xl space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-orange-500 p-8 text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          Candidate Profile
        </h1>

        <p className="mt-3 max-w-2xl text-slate-200">
          Keep your profile updated to improve recruiter visibility and
          increase your chances of getting shortlisted.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-3"
      >

        {/* LEFT PANEL */}

        <div className="space-y-6">

          {/* Avatar */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="flex flex-col items-center">

              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-100">

                <User className="h-14 w-14 text-orange-500" />

              </div>

              <h2 className="mt-5 text-2xl font-bold">

                {profile.firstName || "Candidate"}{" "}
                {profile.lastName}

              </h2>

              <p className="mt-1 text-slate-500">
                TalentFlow Candidate
              </p>

            </div>

          </div>

          {/* Profile Completion */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <h3 className="font-bold">
                Profile Completion
              </h3>

              <span className="font-bold text-orange-600">

                {completion}%

              </span>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">

              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                style={{
                  width: `${completion}%`,
                }}
              />

            </div>

            <div className="mt-6 space-y-3 text-sm">

              <div className="flex items-center gap-3">

                <CheckCircle2
                  className={`h-5 w-5 ${
                    profile.firstName
                      ? "text-green-500"
                      : "text-slate-300"
                  }`}
                />

                Personal Information

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle2
                  className={`h-5 w-5 ${
                    profile.bio
                      ? "text-green-500"
                      : "text-slate-300"
                  }`}
                />

                About Me

              </div>
            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="space-y-8 lg:col-span-2">

          {/* Personal Information */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <h2 className="mb-8 text-2xl font-bold">
              Personal Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  First Name

                </label>

                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-orange-500"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold">

                  Last Name

                </label>

                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-orange-500"
                />

              </div>

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold">

                  Phone Number

                </label>

                <div className="relative">

                  <Phone className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                  <input
                    type="text"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-orange-500"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* About Me */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <h2 className="mb-5 text-2xl font-bold">
              About Me
            </h2>

            <textarea
              rows={6}
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              placeholder="Tell recruiters about yourself..."
              className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-orange-500"
            />
          </div>           

          {/* Resume Summary */}

<div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

  <div className="mb-6 flex items-center gap-3">

    <div className="rounded-xl bg-orange-100 p-3">
      <FileText className="h-6 w-6 text-orange-500" />
    </div>

    <div>
      <h2 className="text-2xl font-bold">
        Resume
      </h2>

      <p className="text-sm text-slate-500">
        Manage your resume from the dedicated Resume page.
      </p>
    </div>

  </div>

  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

    <div className="flex items-center justify-between">

      <div>

        <p className="font-semibold">
          Current Resume
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Upload or replace your CV from the Resume page.
        </p>

      </div>

      <Link
          to="/candidate/resume"
          className="rounded-xl bg-orange-500 px-5 py-2 font-medium text-white transition hover:bg-orange-600"
      >
          Manage Resume
      </Link>

    </div>

  </div>

</div>

          {/* Save Button */}

          <div className="flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-xl
                bg-orange-500
                px-10
                py-3
                font-semibold
                text-white
                transition
                hover:bg-orange-600
                disabled:cursor-not-allowed
                disabled:bg-orange-300
              "
            >
              {loading
                ? "Saving Changes..."
                : "Save Changes"}
            </button>

          </div>

        </div>

      </form>

    </div>
  );
};

export default CandidateProfilePage;