"use client";

import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleCreateUser } from "@/lib/actions/admin/user-action";

export default function CreateUserForm() {

  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema)
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | undefined, onChange: any) => {

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

  const handleDismissImage = (onChange?: any) => {

    setPreviewImage(null);
    onChange?.(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: UserData) => {

    setError(null);
    setSuccess(null);

    startTransition(async () => {

      try {

        const formData = new FormData();

        formData.append("firstName", data.firstName || "");
        formData.append("lastName", data.lastName || "");
        formData.append("email", data.email);
        formData.append("password", data.password);

        if (data.profile) {
          formData.append("profile", data.profile);
        }

        const response = await handleCreateUser(formData);

        if (!response.success) {
          throw new Error(response.message);
        }

        setSuccess("User created successfully");

        reset();
        handleDismissImage();

        router.refresh();

      } catch (error: any) {
        setError(error.message || "Create user failed");
      }

    });

  };

  return (

    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create User
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {success && (
          <div className="text-green-600 text-sm">{success}</div>
        )}

        {/* Profile Image */}
        <div>

          <label className="block text-sm font-medium text-gray-600 mb-2">
            Profile Image
          </label>

          <div className="flex items-center gap-4">

            {previewImage ? (

              <div className="relative">

                <img
                  src={previewImage}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <Controller
                  name="profile"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <button
                      type="button"
                      onClick={() => handleDismissImage(onChange)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6"
                    >
                      ✕
                    </button>
                  )}
                />

              </div>

            ) : (

              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                Image
              </div>

            )}

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
                />
              )}
            />

          </div>

        </div>

        {/* First Name */}
        <div>
          <label className="text-sm text-gray-600">First Name</label>
          <input
            {...register("firstName")}
            placeholder="John"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="text-sm text-gray-600">Last Name</label>
          <input
            {...register("lastName")}
            placeholder="Doe"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            {...register("email")}
            placeholder="john@example.com"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending || isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          {pending ? "Creating..." : "Create User"}
        </button>

      </form>

    </div>
  );
}