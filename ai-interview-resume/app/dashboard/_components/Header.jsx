"use client"
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import Image from 'next/image';

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo.svg'} width={80} height={100} alt='logo' />
      <ul className='hidden md:flex gap-6'>

        <li
          className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer
            ${path === '/dashboard' && 'text-primary font-bold'}`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer
            ${path === '/dashboard/questions' && 'text-primary font-bold'}`}
        >
          Q & A
        </li>
        <li
          className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer
            ${path === '/dashboard/upgrade' && 'text-primary font-bold'}`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-blue-500 hover:font-bold transition-all cursor-pointer
            ${path === '/dashboard/how' && 'text-primary font-bold'}`}
        >
          How it's Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
