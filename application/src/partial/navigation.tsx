'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiHome, FiBarChart, FiUserPlus, FiLogOut } from 'react-icons/fi';
import * as crypto from 'crypto';

interface Navigation {
    name: string;
    href: string;
    current: boolean;
    icon: JSX.Element;
}

const navigation: Navigation[] = [
    { name: 'Gestión de ingresos y gastos', href: '/movements', current: true, icon: <FiHome style={{ color: 'white' }} /> },
    { name: 'Reportes', href: '/reports', current: false, icon: <FiBarChart style={{ color: 'white' }} /> },
    { name: 'Usuario', href: '/users', current: false, icon: <FiUserPlus style={{ color: 'white' }} /> },
    { name: 'Cerrar Sesión', href: '/', current: false, icon: <FiLogOut style={{ color: 'white' }} /> },
];

const role = (role: string) => {
    const _role = btoa(role).concat('??').concat('nestjs_app');
    const hash = crypto.createHash('sha256');
    hash.update(_role);
    return hash.digest('hex');
}

export default function AppNavigation() {
    const pathname = usePathname();
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        setUserRole(storedRole);
    }, []);

    // No renderizar hasta que userRole sea obtenido
    if (userRole === null) {
        return null;
    }

    // Eliminamos la barra inclinada final del pathname para una comparación más precisa
    const cleanPathname = pathname.replace(/\/$/, '');

    const filteredNavigation = userRole === role('admin')
        ? navigation
        : navigation.filter(n => n.href === '/movements' || n.href === '/');

    return (
        <>
            {pathname === '/' ? null : (
                <footer className="flex justify-center items-center fixed bottom-0 left-0 right-0 z-50 p-4">
                    <div className="flex flex-row border border-gray-400 rounded-full gap-2 bg-gray-800 p-2">
                        {filteredNavigation.map((n: Navigation, index: number) => (
                            <a
                                href={n.href}
                                className={`flex items-center gap-2 cursor-pointer px-4 py-1 rounded-full hover:bg-blue-500 ${cleanPathname === n.href ? 'bg-red-500' : ''}`}
                                key={index}
                            >
                                {n.icon}
                                <span className={`text-white ${cleanPathname === n.href ? 'font-bold' : ''}`}>{n.name}</span>
                            </a>
                        ))}
                    </div>
                </footer>
            )}
        </>
    );
}
