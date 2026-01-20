"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RegisterData, registerSchema } from "../schema";
import { handleRegister } from "@/lib/actions/auth-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { email } from "zod";

export default function RegisterForm() {
        const router=useRouter()
        const {register, handleSubmit, formState: { errors}} = useForm<RegisterData>(
        {
          resolver: zodResolver(registerSchema)
        }
      );
       const OnSubmit=async(data:RegisterData)=>{
        const res = await handleRegister(data)
        console.log(res)
        router.push("/login")
       }
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" style={{ backgroundImage: "url('/images/bgg.png')" }}>
      <form className="w-full max-w-sm text-center">

      
        <div className="mb-6">
          <img
            src="/images/logo.png"
            alt="My Events"
            className="mx-auto h-24" 
          />
        </div>

        <h2 className="text-xl font-semibold mb-6">
          Create a New Account
        </h2>

       
        <div className="space-y-4">
          
     
      <div className="flex gap-3">
 
  <div className="w-1/2">
    <input
      type="text"
      placeholder="First Name"
      {...register("name")}
      className={`w-full px-4 py-3 rounded outline-none bg-gray-100
        focus:ring-2 focus:ring-green-500
        ${errors.name ? "border border-red-500" : ""}`}
    />
    {errors.name && (
      <span className="text-red-500 text-sm mt-1 block">
        {errors.name.message}
      </span>
    )}
  </div>

  
  <div className="w-1/2">
    <input
      type="text"
      placeholder="Last Name"
      {...register("name")}
      className={`w-full px-4 py-3 rounded outline-none bg-gray-100
        focus:ring-2 focus:ring-green-500
        ${errors.name ? "border border-red-500" : ""}`}
    />
    {errors.name && (
      <span className="text-red-500 text-sm mt-1 block">
        {errors.name.message}
      </span>
    )}
  </div>
</div>


          
          <input
            type="text"
            placeholder="Email"
            {...register("email")}
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-green-500"
          />
            {
            errors.email && 
            <span className="text-red-500">
              {errors.email.message}
            </span>
          }

   
          <input
            type="password"
            placeholder="New Password"
            {...register("password")}
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-green-500"
          />
            {
            errors.password && 
            <span className="text-red-500">
              {errors.password.message}
            </span>
          }

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="w-full px-4 py-3 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-green-500"
          />
            {
            errors.confirmPassword && 
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          }

      
          <button className="w-full py-3 bg-green-500 text-white rounded font-semibold hover:bg-green-400 transition" 
          onClick={handleSubmit(OnSubmit)}>
            Create Account

          </button>

          
          <Link
            href="/login"
            className="block text-sm text-blue-500 hover:underline"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
