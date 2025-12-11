import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

function SuccessPopup({ open, onClose }: any) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center p-8">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />

        <h2 className="text-2xl font-semibold mb-2">Application Submitted!</h2>

        <p className="text-gray-600 mb-6">
          Thank you for applying. Our team will review your profile and contact
          you soon.
        </p>

        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
          onClick={onClose}
        >
          Okay
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessPopup;
