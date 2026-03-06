"use client";

import { useForm } from "react-hook-form";
import { RequestPasswordResetDTO, RequestPasswordResetSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordReset } from "@/lib/api/auth";
import { toast } from "react-toastify";

export default function Page() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RequestPasswordResetDTO>({
    resolver: zodResolver(RequestPasswordResetSchema)
  });

  const onSubmit = async (data: RequestPasswordResetDTO) => {
    try {
      const response = await requestPasswordReset(data.email);

      if (response.success) {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(response.message || "Failed to request password reset.");
      }

    } catch (error) {
      toast.error((error as Error).message || "Failed to request password reset.");
    }
  };

  return (

    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/images/bgg.png')" }}
    >

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-xl text-center"
      >

        {/* Logo */}
        <div className="mb-6">
          <img
            src="/images/logo.png"
            alt="My Events"
            className="mx-auto h-20"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Request Password Reset
        </h2>

        {/* Email Input */}
        <div className="text-left mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>

          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-purple-700"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-purple-900 text-white rounded font-semibold hover:bg-purple-800 transition"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>

      </form>

    </div>
  );
}