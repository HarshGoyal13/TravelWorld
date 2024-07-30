"use client";

import Link from "next/link";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react";

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: session } = useSession()
    const userIconRef = useRef(null);

    const toggleModal = () => setShowModal((prev) => !prev);

    useEffect(() => {
        window.onscroll = () => {
            setIsScrolled(window.scrollY !== 0);
            return () => (window.onscroll = null);
        };
    }, []);

    return (
        <div className={`fixed z-50 h-16 w-full top-0 left-0 ${isScrolled ? "shadow-md backdrop-blur" : ""} roboto`}>
            <div className="h-full w-2/3 mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 transition-all">
                    <h1 className={`${isScrolled ? "text-blue-600" : "text-[#cec7c7]"} text-2xl font-bold`}>
                        TravelGod
                    </h1>
                    <AiOutlineHome
                        size={25}
                        color={`${isScrolled ? "rgb(37 99 235)" : "#cec7c7"}`}
                    />
                </Link>

                <div className="relative">
                    <div className="cursor-pointer" onClick={toggleModal} ref={userIconRef}>
                        <AiOutlineUser
                            size={30}
                            color={`${isScrolled ? "rgb(37 99 235)" : "#cec7c7"}`}
                        />
                    </div>
                    {showModal && (
                        <>
                       
                        <div className="absolute top-12 right-0 shadow-md flex flex-col gap-4 p-4 bg-white rounded-xl w-[160px]" onClick={toggleModal}>
                                {session?.user?.isAdmin &&
                                    <Link className="bg-red-500 text-white px-1 py-2 rounded-xl" href='/admin/dashboard'>
                                        Admin Dashboard
                                    </Link>
                                }
                            <Link href="/reservations">
                                Reservations
                            </Link>
                            <button onClick={() => signOut()} className="text-slate-500 text-center">
                                Sign Out
                            </button>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
