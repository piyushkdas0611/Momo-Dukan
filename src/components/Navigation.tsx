'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <nav>
      <div className="icon">
        <Image src="/images/momo.png" alt="icon" width={50} height={50} />
        <h2>MOMO DUKAN</h2>
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;