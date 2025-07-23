import Link from "next/link";
import React, { useState } from "react";
import { CoolMode } from "../magicui/cool-mode";
import { ClerkLoaded, ClerkLoading, SignInButton } from "@clerk/nextjs";
import { ThemeToggle } from "../ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import SparklesText from "../magicui/sparkles-text";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "Features", link: "#features" },
    { name: "About", link: "/about" },
  ];
  return (
    <nav className="fixed w-full z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          <SparklesText text="EduOrbit" className="text-xl font-bold text-gray-900 dark:text-white" sparklesCount={12} />
        </Link>
        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-between">
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
        {/* Right Section (ThemeToggle, SignIn, Hamburger) */}
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
          {/* Hamburger Icon for Mobile - now after Start Learning */}
          <div className="md:hidden flex items-center">
            <button
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 z-20 shadow-lg animate-fade-in">
          <div className="flex flex-col items-center py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.link}
                className="w-full text-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#testimonials"
              className="w-full text-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
