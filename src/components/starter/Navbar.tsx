import Link from "next/link";
import React from "react";
import { CoolMode } from "../magicui/cool-mode";
import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = () => {
  const links = [
    { name: "Home", link: "/" },
    { name: "Features", link: "#features" },
    { name: "About", link: "/about" },
  ];
  return (
    <nav className="fixed w-full z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          EduOrbit
        </Link>
        <div className="flex items-center justify-between">
          {links.map((link) => (
            <CoolMode key={link.name}>
              <Link
                key={link.name}
                href={link.link}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            </CoolMode>
          ))}
          <Link
            href="#testimonials"
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium hidden md:flex transition-colors duration-200"
          >
            Testimonials
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <CoolMode>
            <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg px-3 py-2 text-sm font-bold transition-colors duration-200">
              <ClerkLoaded>
                <SignInButton forceRedirectUrl="/onboarding" mode="redirect">
                  <p className="hover:scale-120 hover:font-bold">
                    Start Learning
                  </p>
                </SignInButton>
              </ClerkLoaded>
              <ClerkLoading>loading...</ClerkLoading>
            </button>
          </CoolMode>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
