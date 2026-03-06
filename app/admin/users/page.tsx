import Link from "next/link";
import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import UserTable from "./_components/UserTable";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const page = (searchParams.page as string) || "1";
  const size = (searchParams.size as string) || "10";
  const search = (searchParams.search as string) || "";

  const response = await handleGetAllUsers(page, size, search);

  if (!response.success) {

    if (response.message?.includes("Unauthorized")) {
      redirect("/login");
    }

    throw new Error(response.message || "Failed to load users");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Users Management
            </h1>

            <p className="text-gray-400 mt-2">
              Manage all registered users in the system
            </p>
          </div>

          {/* Create User Button */}
          <Link
            href="/admin/users/create"
            className="bg-gradient-to-r from-blue-600 to-purple-600 
            hover:from-blue-700 hover:to-purple-700
            text-white font-semibold px-5 py-3 rounded-lg
            transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            + Create User
          </Link>
        </div>

        {/* Users Table */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl">

          <UserTable
            users={response.data}
            pagination={response.pagination}
            search={search}
          />

        </div>

      </div>

    </main>
  );
}