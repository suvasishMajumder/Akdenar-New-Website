"use client";
import Footer from "@/components/Footer";
import {
  CreateContactInput,
  createContactSchema,
} from "@/lib/validations/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  HelpCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";

const page = () => {
  return (
    <>
      <main className="w-full sm:container mx-auto">
        <InnovationHero />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
};

export default page;

function InnovationHero() {
  return (
    <section className="w-full flex lg:mt-6 justify-center my-14 md:mt-18 md:mb-14 lg:min-h-screen items-center relative overflow-hidden">
      <div className="h-[calc(100vh-6rem)] md:h-auto  mt-5 sm:mt-0 mx-2 sm:mx-0 lg:h-[calc(100vh-10rem)] w-full relative">
        {/* Background Image */}
        <img
          src="/contact-page/hero-img.png"
          alt="Background"
          className="w-full h-full sm:h-[70vh] md:h-[80vh] rounded-3xl object-cover"
        />

        {/* Glass Box */}
        <div
          className="
          absolute inset-0 w-full h-full
          flex items-center justify-center
          px-4 sm:px-6
        "
        >
          <div
            className="
            w-full max-w-4xl xl:max-w-5xl
            bg-white/10 backdrop-blur-2xl 
            rounded-3xl sm:rounded-[30px]
            p-6 sm:p-10 md:p-14 
            border border-white/20
            shadow-[0_0_40px_rgba(255,255,255,0.2)]
            text-center
          "
          >
            {/* Title */}
            <h1
              className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              font-extrabold 
              text-white leading-snug md:leading-tight
            "
            >
              GET IN TOUCH
            </h1>

            {/* Subtitle */}
            <p
              className="
              text-white/90 
              text-sm sm:text-base md:text-lg
              mt-4 sm:mt-6 
              max-w-2xl mx-auto 
              leading-relaxed
            "
            >
              We're here to help and answer any question you might have. We look
              forward to hearing from you and exploring opportunities for
              collaboration.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateContactInput>({
    resolver: zodResolver(createContactSchema),
    mode: "onChange",
  });

  // ----------- HANDLE SUBMIT -----------
  const onSubmit = async (values: CreateContactInput) => {
    try {
      const res = await axios.post("/api/contact", values);
      console.log(res);
      if (res.status === 201) {
        reset();
        alert("Message sent successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ---------------- LEFT: CONTACT FORM ---------------- */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-2xl font-semibold mb-8">Send Us Messages</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter Name"
                className={`w-full mt-2 px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-orange-400 outline-none 
                                ${
                                  errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter email..."
                className={`w-full mt-2 px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-orange-400 outline-none 
                                ${
                                  errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium">
                Phone Number (Optional)
              </label>
              <input
                type="text"
                {...register("phone")}
                placeholder="Enter phone number..."
                className={`w-full mt-2 px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-orange-400 outline-none 
                                ${
                                  errors.phone
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium">Your Message</label>
              <textarea
                rows={4}
                {...register("message")}
                placeholder="Type your message..."
                className={`w-full mt-2 px-4 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-orange-400 outline-none 
                                ${
                                  errors.message
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
              ></textarea>
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>

        {/* ---------------- RIGHT: INFORMATION + MAP ---------------- */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Our Information</h3>

            <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <li className="flex gap-2">
                <MapPin size={18} className="text-gray-700 mt-1" />
                Third Floor, 69, New Mangalpuri, New Delhi, Delhi 110030, India
              </li>
              <li className="flex gap-2">
                <Phone size={18} className="text-gray-700 mt-1" />
                +91-92026 52922
              </li>
              <li className="flex gap-2">
                <Mail size={18} className="text-gray-700 mt-1" />
                support@akdenar.com
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <Instagram className="text-gray-700 cursor-pointer hover:text-orange-500 transition" />
              <Facebook className="text-gray-700 cursor-pointer hover:text-orange-500 transition" />
              <Linkedin className="text-gray-700 cursor-pointer hover:text-orange-500 transition" />
            </div>
          </div>

          {/* Map Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h4 className="font-semibold mb-3">Find us here</h4>

            <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
              Map
            </div>

            <div className="flex gap-2 items-start mt-4 text-sm text-gray-700">
              <MapPin className="text-blue-600" size={18} />
              <p>
                India - New Delhi
                <br />
                Third Floor, 69, New Mangalpuri, Saket, 65/123, New Delhi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "How can I partner with your company?",
      a: "We’re always looking for meaningful partnerships. Email us at partnerships@akdenar.com with details about your organization and how you envision working together.",
    },
    {
      q: "What’s your average response time?",
      a: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our office directly.",
    },
    {
      q: "Do you offer office tours?",
      a: "Yes! We offer tours at our major offices. Contact the local office location to schedule a visit at least one week in advance.",
    },
    {
      q: "How do I apply for a job?",
      a: "Visit our careers page to see all open positions and apply directly. You can also reach out to careers@akdenar.com for future opportunities.",
    },
  ];

  return (
    <section className="w-full px-6 md:px-12 py-10 max-w-6xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-3">
          Looking for quick answers? Check out our most common questions.
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {faqs.map((item, i) => (
          <div key={i} className="flex gap-4">
            {/* Icon */}
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-fit h-fit">
              <HelpCircle size={20} />
            </div>

            {/* Content */}
            <div>
              <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
