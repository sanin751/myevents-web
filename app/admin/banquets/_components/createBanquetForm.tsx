"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function CreateBanquetForm() {

  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (file: File | undefined) => {

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleDismissImage = () => {
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const form = e.currentTarget;

    setError(null);
    setSuccess(null);

    const rawFormData = new FormData(form);
    const formData = new FormData();

    formData.append("title", String(rawFormData.get("title")));
    formData.append("location", String(rawFormData.get("location")));
    formData.append("price", String(rawFormData.get("price")));
    formData.append("capacity", String(rawFormData.get("capacity")));

    const image = rawFormData.get("image") as File;

    if (image && image.size > 0) {
      formData.append("image", image);
    }

    startTransition(async () => {

      try {

        const res = await fetch("http://localhost:5050/api/banquets", {
          method: "POST",
          body: formData
        });

        const result = await res.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        setSuccess("Banquet created successfully");

        form.reset();
        handleDismissImage();

        router.refresh();

      } catch (error: any) {
        setError(error.message || "Create banquet failed");
      }

    });

  };

  return (

    <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Create New Banquet
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
            {success}
          </div>
        )}

        {/* Image Preview */}
        <div className="flex items-center gap-4">

          {previewImage ? (
            <div className="relative">

              <img
                src={previewImage}
                className="w-24 h-24 rounded-lg object-cover border"
              />

              <button
                type="button"
                onClick={handleDismissImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm"
              >
                ✕
              </button>

            </div>
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Image
            </div>
          )}

          <input
            ref={fileInputRef}
            name="image"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => handleImageChange(e.target.files?.[0])}
            className="text-white"
          />

        </div>

        {/* Banquet Name */}
        <div>
          <label className="text-sm text-gray-300">Banquet Name</label>
          <input
            name="title"
            placeholder="Royal Palace Banquet"
            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Capacity */}
        <div>
          <label className="text-sm text-gray-300">Guest Capacity</label>
          <input
            name="capacity"
            type="number"
            placeholder="500"
            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-sm text-gray-300">Starting Price</label>
          <input
            name="price"
            type="number"
            placeholder="200000"
            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm text-gray-300">Location</label>
          <input
            name="location"
            placeholder="Kathmandu"
            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition"
        >
          {pending ? "Creating..." : "Create Banquet"}
        </button>

      </form>

    </div>

  );
}