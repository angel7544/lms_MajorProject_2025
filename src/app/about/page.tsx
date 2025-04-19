"use client";
import Navbar from "@/components/starter/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

const TeamMember = ({
  name,
  role,
  bio,
  image,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl hover:from-white hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300"
    >
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full border-2 border-blue-500 hover:border-blue-600 dark:hover:border-blue-400 transition-colors duration-300">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-2xl font-bold text-blue-500 dark:text-blue-400">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{role}</p>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-center">{bio}</p>
    </motion.div>
  );
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & Lead Developer",
      bio: "John is a full-stack developer with over 10 years of experience in educational technology. He founded EduOrbit with the vision of making education accessible to everyone.",
      image: "/images/team/john.jpg",
    },
    {
      name: "Jane Smith",
      role: "UX/UI Designer",
      bio: "Jane is a passionate designer who believes in creating intuitive and engaging user experiences. She has designed digital interfaces for educational platforms for 6 years.",
      image: "/images/team/jane.jpg",
    },
    {
      name: "Alex Johnson",
      role: "Content Strategy Lead",
      bio: "Alex has a background in education and technology. He works with course creators to help them develop effective learning materials and strategies.",
      image: "/images/team/alex.jpg",
    },
    {
      name: "Sarah Williams",
      role: "Education Consultant",
      bio: "With a PhD in Educational Technology, Sarah advises on learning methodologies and helps shape the platform's approach to online education.",
      image: "/images/team/sarah.jpg",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors duration-200"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text"
          >
            About EduOrbit
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          >
            EduOrbit was founded with a mission to transform online education by providing a platform that connects passionate educators with eager learners worldwide.
          </motion.p>
        </div>

        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
          >
            Our Mission
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center"
          >
            At EduOrbit, we believe that education should be accessible, engaging, and effective. 
            Our platform is designed to empower educators to share their knowledge and expertise, 
            while providing learners with the tools they need to grow both personally and professionally. 
            We're committed to continuous innovation and improvement, always seeking new ways to enhance 
            the learning experience for our community.
          </motion.p>
        </div>

        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-5 py-10 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
        <span>© 2024 EduOrbit. All rights reserved.</span>
      </div>
    </div>
  );
} 