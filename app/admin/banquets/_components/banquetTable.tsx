"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import DeleteModal from "../../users/_components/DeleteModal";

interface Banquet {
  _id: string;
  title: string;
  location: string;
  capacity: number;
  price: number;
  image?: string;
  isAvailable: boolean;
}

interface Pagination {
  page: number;
  size: number;
  totalPages: number;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

const BanquetTable = ({
  banquets,
  pagination,
  search,
}: {
  banquets: Banquet[];
  pagination: Pagination;
  search?: string;
}) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(search || "");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSearchChange = () => {
    router.push(
      `/admin/banquets?page=1&size=${pagination.size}` +
        (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "")
    );
  };

  const makePagination = (): React.ReactElement[] => {
    const pages: React.ReactElement[] = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;

    const prevHref =
      `/admin/banquets?page=${currentPage - 1}&size=${pagination.size}` +
      (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "");

    pages.push(
      <Link
        key="prev"
        className={`px-3 py-1 border rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 pointer-events-none"
            : "bg-white text-blue-500 hover:bg-blue-100"
        }`}
        href={currentPage === 1 ? "#" : prevHref}
      >
        Previous
      </Link>
    );

    for (let i = 1; i <= totalPages; i++) {
      const href =
        `/admin/banquets?page=${i}&size=${pagination.size}` +
        (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "");

      pages.push(
        <Link
          key={i}
          className={`px-3 py-1 border rounded-md ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 hover:bg-blue-100"
          }`}
          href={href}
        >
          {i}
        </Link>
      );
    }

    const nextHref =
      `/admin/banquets?page=${currentPage + 1}&size=${pagination.size}` +
      (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "");

    pages.push(
      <Link
        key="next"
        className={`px-3 py-1 border rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 pointer-events-none"
            : "bg-white text-blue-500 hover:bg-blue-100"
        }`}
        href={currentPage === totalPages ? "#" : nextHref}
      >
        Next
      </Link>
    );

    return pages;
  };

  const onDelete = async (deleteId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5050/api/banquets/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success("Banquet deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete banquet");
    }
  };

  return (
    <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => onDelete(deleteId!)}
        title="Delete Banquet"
        description="Are you sure you want to delete this banquet?"
      />

      {/* Search */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchChange();
            }}
            placeholder="Search banquets..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />

          <button
            onClick={handleSearchChange}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Image</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Location</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y">
            {banquets.map((banquet) => {
              const imageUrl = banquet.image
                ? `${API_BASE}/uploads/${banquet.image}`
                : null;

              return (
                <tr key={banquet._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono">
                    {banquet._id}
                  </td>

                  <td className="px-6 py-4">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Banquet"
                        width={48}
                        height={48}
                        className="rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {banquet.title}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {banquet.location}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {banquet.capacity}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    Rs. {banquet.price}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        banquet.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {banquet.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/banquets/${banquet._id}`}
                        className="text-green-600 hover:underline"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/banquets/${banquet._id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => setDeleteId(banquet._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-5 flex justify-between items-center bg-gray-50 border-t">
        <div className="text-sm">
          Page <b>{pagination.page}</b> of <b>{pagination.totalPages}</b>
        </div>

        <div className="space-x-2">{makePagination()}</div>
      </div>
    </div>
  );
};

export default BanquetTable;