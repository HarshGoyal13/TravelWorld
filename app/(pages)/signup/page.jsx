"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import Register from "../../../public/assets/register2.avif"
import Input from '@/ui/Input'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import { useRouter } from 'next/navigation'
import AXIOS_API from '@/utils/axiosAPI'
import toast from 'react-hot-toast'
import { HashLoader } from 'react-spinners'

const Page = () => {

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const {register, handleSubmit, formState:{errors}} = useForm({
      resolver: zodResolver(schema)
    })

    const onSubmit = async(data) => {
      
    if (Object.keys(errors)?.length > 0) {
      toast.error("Enter valid data")
      return
    }
    setLoading(true)
    try{

      await AXIOS_API.post('/register', data)
      toast.success("Success! Redirecting to login")

      setTimeout(() => {
        router.push("/login")
      }, 2500)
      setLoading(false)
    }catch(error){
      console.log(error)
      setLoading(false)
    }
    }


  return (
    <section className='px-5 xl:px-0 mt-[30px]'>
      <div className='max-w-[1150px] mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
        <div className='hidden lg:block'>
            <figure className='rounded-lg overflow-hidden'>
              <Image
                src={Register}
                alt="Register"
                className='object-cover w-[400px] h-[500px] ml-[100px]' 
                width={600}
                height={400} // Adjust height to a smaller value
              />
            </figure>
          </div>


          <div className='rounded-lg lg:pl-16 py-8 bg-white shadow-lg mt-[30px]'>
            <h3 className='text-headingColor text-[20px] leading-8 font-bold mb-8'>
              Create An <span className='text-blue-600'>Account</span> 💕
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  className="w-full px-4 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[14px] leading-6 text-headingColor placeholder:text-textColor"
                  required
                  register={register("username")}
                />
              </div>

              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  className="w-full px-4 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[14px] leading-6 text-headingColor placeholder:text-textColor"
                  required
                  register={register("email")}
                />
              </div>

              <div className="mb-4">
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="w-full px-4 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[14px] leading-6 text-headingColor placeholder:text-textColor"
                  required
                  register={register("password")}
                />
              </div>

              <div className="mt-6">
              <button
              type="submit"
              className="w-full bg-blue-700 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 flex items-center justify-center"
            >
              {loading ? <HashLoader size={25} color="#fff" /> : "Signup"}
            </button>
              </div>

              <p className="mt-4 text-textColor text-center">
                Already have an account? 
                <Link href='/login' className='text-primaryColor font-medium ml-1 text-blue-700'>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
