"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import SuccessPopup from "./SuccessPopup";

function ApplyModal({ open, onClose, opening }: any) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    coverLetter: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.fullName || !formData.phone || !resume) {
      alert("Please fill in all required fields and upload your resume.");
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("phone", formData.phone);
      submitData.append("coverLetter", formData.coverLetter);
      submitData.append("resume", resume);

      const response = await fetch(`/api/jobs/${opening._id}/apply`, {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      // Reset form
      setFormData({ fullName: "", phone: "", coverLetter: "" });
      setResume(null);

      // Show success popup
      setShowSuccess(true);
    } catch (error: any) {
      console.error("Application error:", error);
      alert(error.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!opening) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Apply for <span className="italic">{opening.title}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <p className="text-gray-700">
              <strong>Location:</strong> {opening.location}
            </p>

            <p className="text-gray-700">
              <strong>Job Type:</strong> {opening.type}
            </p>

            <p className="text-gray-700">
              <strong>Workplace:</strong> {opening.workplaceType}
            </p>

            <p className="text-gray-700">
              <strong>Experience:</strong>{" "}
              {opening.experience?.min === 0 && opening.experience?.max === 0
                ? "Fresher"
                : opening.experience?.min === opening.experience?.max
                ? `${opening.experience?.min} years`
                : `${opening.experience?.min}-${opening.experience?.max} years`}
            </p>

            {/* Form */}
            <div className="space-y-3 mt-6">
              <input
                type="text"
                name="fullName"
                placeholder="Your Name *"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number *"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />

              <textarea
                name="coverLetter"
                placeholder="Cover Letter (Optional)"
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md h-24"
              />

              {/* Resume Upload */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Upload Resume (PDF/DOCX) *
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full border p-2 rounded-md"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  required
                />

                {resume && (
                  <p className="text-sm text-green-600 mt-1">
                    Selected: {resume.name}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Popup */}
      <SuccessPopup
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose(); // close modal automatically
        }}
      />
    </>
  );
}

export default ApplyModal;
