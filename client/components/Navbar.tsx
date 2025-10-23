"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { href: "/member/dashboard", label: "Members" },
  ];

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">Dashboard App</div>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:text-gray-200 ${pathname.startsWith(link.href) ? "underline font-semibold" : ""}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
