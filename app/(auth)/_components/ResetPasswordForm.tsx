'use client'

import { useForm } from "react-hook-form";
import { ResetPasswordDTO, ResetPasswordSchema } from "../reset-password/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { handleResetPassword } from "@/lib/api/auth";

export default function ResetPasswordForm({
  token,
}: {
  token: string;
}) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordDTO>({
    resolver: zodResolver(ResetPasswordSchema)
  });

  const router = useRouter();

  const onSubmit = async (data: ResetPasswordDTO) => {

    try {

      const response = await handleResetPassword(token, data.newPassword);

      if (response.success) {
        toast.success("Password reset successfully");
        router.replace("/login");
      } else {
        toast.error(response.message || "Failed to reset password");
      }

    } catch (error) {
      toast.error((error as Error).message || "Unexpected error");
    }

  };

  return (

    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/images/bgg.png')" }}
    >

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-xl"
      >

        {/* Logo */}
        <div className="mb-6 text-center">
          <img
            src="/images/logo.png"
            alt="My Events"
            className="mx-auto h-20"
          />
        </div>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>

        {/* New Password */}
        <div className="mb-4">

          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>

          <input
            type="password"
            {...register("newPassword")}
            placeholder="Enter new password"
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-purple-700"
          />

          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}

        </div>

        {/* Confirm Password */}
        <div className="mb-4">

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>

          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm password"
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-purple-700"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}

        </div>

        {/* Links */}
        <div className="flex justify-between text-sm mb-6">

          <Link
            href="/login"
            className="text-purple-700 hover:underline"
          >
            Back to Login
          </Link>

          <Link
            href="/auth/request-password-reset"
            className="text-purple-700 hover:underline"
          >
            Request another reset
          </Link>

        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-purple-900 text-white rounded font-semibold hover:bg-purple-800 transition"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>

      </form>

    </div>

  );
}