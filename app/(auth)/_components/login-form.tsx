"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginData, loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
    const router=useRouter()
    const {register, handleSubmit, formState: { errors}} = useForm<LoginData>(
    {
      resolver: zodResolver(loginSchema)
    }
  );
   const OnSubmit=async(data:LoginData)=>{
    alert(data.email)
    router.push("/auth/dashboard")
   }
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" style={{ backgroundImage: "url('/images/bgg.png')" }} >
      <div className="w-full max-w-sm text-center">
        
        
        <div className="mb-8">
          <img
            src="/images/logo.png" 
            alt="My Events"
            className="mx-auto h-24"
          />
        </div>

      
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            {...register("email")}
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-purple-700"
          />
          {
            errors.email && 
            <span className="text-red-500">
              {errors.email.message}
            </span>
          }

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-purple-700"
            
          />
          {
            errors.password && 
            <span className="text-red-500">
              {errors.password.message}
            </span>
          }

          <button className="w-full py-3 bg-purple-900 text-white rounded font-semibold hover:bg-purple-800 transition" 
          onClick={handleSubmit(OnSubmit)}>
            Log In
          </button>

          <Link
            href="/forgot-password"
            className="block text-sm text-white hover:underline"
          >
            Forgotten password?
          </Link>

          <Link
            href="/register"
            className="block w-full py-3 bg-green-500 text-white rounded font-semibold hover:bg-green-400 transition"
          >
            Create New Account
          </Link>
        </div>

        <div className="mt-10 text-xs text-gray-500 flex justify-center gap-6">
          <span>About</span>
          <span>Help</span>
        </div>
      </div>
    </div>
  );
}
