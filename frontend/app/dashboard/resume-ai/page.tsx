"use client";

import { Check, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

type ResumeAnalysis = {
  atsScore: number;
  detectedSkills: string[];
  missingSkills: string[];
  targetRoles: string[];
  yearsOfExperience: number;
  suggestions: string[];
};

export default function ResumeAIPage() {
  const [fileName, setFileName] = useState("");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    setFileName(file.name);
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to analyze resume");
      }

      window.localStorage.setItem("career-copilot-resume-analysis", JSON.stringify(data));
      setAnalysis(data);
    } catch (caughtError) {
      setAnalysis(null);
      setError(caughtError instanceof Error ? caughtError.message : "Unable to analyze resume");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  return (
    <main>
      <h1 className="mb-4 text-5xl font-bold">
        Resume AI
      </h1>

      <p className="mb-8 max-w-3xl text-gray-400">
        Upload your resume to estimate ATS strength, detect key skills, and surface gaps before applying.
      </p>

      <div className="rounded-3xl border border-gray-800 bg-gray-950 p-8">
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition ${
            isDragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-700 hover:border-blue-500"
          }`}
        >
          <input {...getInputProps()} />

          <UploadCloud className="mx-auto mb-4 text-blue-400" size={42} />

          <h2 className="mb-3 text-2xl font-bold">
            Upload Your Resume
          </h2>

          <p className="text-gray-400">
            Drag and drop a TXT, PDF, or DOCX resume here, or click to upload.
          </p>
        </div>

        {loading && (
          <p className="mt-8 text-xl text-blue-400">
            Analyzing resume...
          </p>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-900 bg-red-950/30 p-5 text-red-300">
            {error}
          </div>
        )}

        {analysis && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-2 text-xl font-semibold">
                Uploaded Resume
              </h3>

              <p className="text-blue-400">
                {fileName}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-2 text-gray-400">
                  ATS Score
                </h3>

                <p className="text-5xl font-bold text-green-400">
                  {analysis.atsScore}%
                </p>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-4 text-gray-400">
                  Skills Detected
                </h3>

                <div className="space-y-2">
                  {analysis.detectedSkills.map((skill) => (
                    <p key={skill} className="flex items-center gap-2">
                      <Check size={16} className="text-green-400" />
                      {skill}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-4 text-gray-400">
                  Missing Skills
                </h3>

                <div className="space-y-2">
                  {analysis.missingSkills.map((skill) => (
                    <p key={skill} className="flex items-center gap-2">
                      <X size={16} className="text-red-400" />
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-4 text-gray-400">
                  Suggested Target Roles
                </h3>

                <div className="flex flex-wrap gap-2">
                  {analysis.targetRoles.map((role) => (
                    <span key={role} className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="mb-2 text-gray-400">
                  Experience Detected
                </h3>

                <p className="text-5xl font-bold text-white">
                  {analysis.yearsOfExperience}+ yrs
                </p>

                <p className="mt-3 text-sm text-gray-400">
                  Used to filter jobs where you meet the minimum experience.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h3 className="mb-4 text-2xl font-bold">
                AI Suggestions
              </h3>

              <div className="space-y-3 text-gray-300">
                {analysis.suggestions.map((suggestion) => (
                  <p key={suggestion}>
                    - {suggestion}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
