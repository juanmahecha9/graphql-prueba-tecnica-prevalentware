'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import AppNavigation from './navigation';


export default function AppEnvelope({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const userRole = typeof window !== 'undefined' ? localStorage.getItem('role') : null;


    return (
        <>
            <header className="bg-blue-500 p-4 text-white">
                <h1>Mi Aplicación</h1>
            </header>

            <section className="flex-1 p-4">
                {children}
            </section>


        </>
    );
}
