"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { UpdateUserData, updateUserSchema } from "../schema";
import { UserEditData } from "@/app/admin/users/schema";

export default function UpdateUserForm() {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    values: {
      firstName: "",
      lastName: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: UserEditData) => {
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();

      if (data.firstName) formData.append("firstName", data.firstName);
      if (data.lastName) formData.append("lastName", data.lastName);
      if (data.profile) formData.append("profile", data.profile);

      const response = await handleUpdateProfile(formData);

      if (!response.success) {
        throw new Error(response.message || "Update profile failed");
      }

      handleDismissImage();

      setSuccess("Profile updated successfully");

      setTimeout(() => {
        setSuccess(null);
      }, 3000);

    } catch (error: any) {
      setError(error.message || "Profile update failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <div className="w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Update Profile
        </h1>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {success && (
              <p className="text-green-400 text-sm">{success}</p>
            )}

            {/* Profile Preview */}
            <div className="flex justify-center">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    className="w-28 h-28 rounded-full object-cover border-4 border-purple-500"
                  />

                  <Controller
                    name="profile"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <button
                        type="button"
                        onClick={() => handleDismissImage(onChange)}
                        className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        ✕
                      </button>
                    )}
                  />
                </div>
              ) : (
                <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-gray-400 border border-white/10">
                  No Image
                </div>
              )}
            </div>

            {/* Upload */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Profile Image
              </label>

              <Controller
                name="profile"
                control={control}
                render={({ field: { onChange } }) => (
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(e) =>
                      handleImageChange(e.target.files?.[0], onChange)
                    }
                    className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-purple-600 file:text-white
                      hover:file:bg-purple-700"
                  />
                )}
              />

              {errors.profile && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.profile.message}
                </p>
              )}
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                First Name
              </label>

              <input
                type="text"
                {...register("firstName")}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              />

              {errors.firstName && (
                <p className="text-red-400 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Last Name
              </label>

              <input
                type="text"
                {...register("lastName")}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              />

              {errors.lastName && (
                <p className="text-red-400 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-semibold text-white
              bg-gradient-to-r from-blue-600 to-purple-600
              hover:from-blue-700 hover:to-purple-700
              transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}