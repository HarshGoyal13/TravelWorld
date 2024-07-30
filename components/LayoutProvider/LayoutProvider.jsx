"use client";

import { usePathname } from 'next/navigation';
import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';
import Toast from '@/utils/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const LayoutProvider = ({ children }) => {
    const pathName = usePathname();
    const queryClient = new QueryClient();

    // Include home page and other pages except login, signup, and admin pages
    const shouldShowNavbarAndFooter = pathName !== "/login" && pathName !== "/signup" && !pathName.includes("/admin");

    return (
        <>
            <QueryClientProvider client={queryClient}>
                {shouldShowNavbarAndFooter && <Navbar />}
                <Toast />
                {children}
                {shouldShowNavbarAndFooter && <Footer />}
            </QueryClientProvider>
        </>
    );
};

export default LayoutProvider;
