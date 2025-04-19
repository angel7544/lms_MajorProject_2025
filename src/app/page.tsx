"use client";
import GridPattern from "@/components/GridPattern";
import Link from "next/link";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import SparklesText from "@/components/magicui/sparkles-text";
import { MagicCard } from "@/components/magicui/magic-card";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/starter/Navbar";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      title: "Flexible User Roles",
      description:
        "Distinct student and teacher roles with tailored access and capabilities.",
      icon: "👥",
      colorClass: "text-blue-500",
      iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
      ringClass: "ring-1 ring-blue-400 dark:ring-blue-500/50",
    },
    {
      title: "Comprehensive Student Features",
      description:
        "Enroll in courses, earn certificates, and showcase achievements with public profiles.",
      icon: "🎓",
      colorClass: "text-indigo-500",
      iconBgClass: "bg-indigo-100 dark:bg-indigo-900/30",
      ringClass: "ring-1 ring-indigo-400 dark:ring-indigo-500/50",
    },
    {
      title: "Powerful Course Creation Tools",
      description:
        "Teachers can create, plan, and publish courses with videos, attachments, and pricing options.",
      icon: "🎨",
      colorClass: "text-purple-500",
      iconBgClass: "bg-purple-100 dark:bg-purple-900/30",
      ringClass: "ring-1 ring-purple-400 dark:ring-purple-500/50",
    },
    {
      title: "Automated Communication",
      description:
        "Automatic welcome, course enrollment, and certificate emails to keep users informed.",
      icon: "📧",
      colorClass: "text-pink-500",
      iconBgClass: "bg-pink-100 dark:bg-pink-900/30",
      ringClass: "ring-1 ring-pink-400 dark:ring-pink-500/50",
    },
    {
      title: "Flexible Course Pricing",
      description:
        "Offer free courses or set custom prices with integrated Razorpay payment processing.",
      icon: "💰",
      colorClass: "text-amber-500",
      iconBgClass: "bg-amber-100 dark:bg-amber-900/30",
      ringClass: "ring-1 ring-amber-400 dark:ring-amber-500/50",
    },
    {
      title: "Verifiable Certificates",
      description:
        "Generate and verify course completion certificates with unique URLs.",
      icon: "🏆",
      colorClass: "text-green-500",
      iconBgClass: "bg-green-100 dark:bg-green-900/30",
      ringClass: "ring-1 ring-green-400 dark:ring-green-500/50",
    },
  ];

  const { isSignedIn } = useAuth();

  const text = `Empower educators and learners with our innovative learning management system. Experience the future of education with EduOrbit's cutting-edge platform.`;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center">
        <GridPattern>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <Image 
                src="/logo192.png" 
                alt="Logo" 
                width={120} 
                height={120} 
                className="mb-6"
              />
              <div className="font-display text-5xl font-bold tracking-[-0.02em] text-black dark:text-white sm:text-6xl md:text-7xl mb-6 text-center max-w-4xl">
                <SparklesText
                  text="EduOrbit"
                  className="inline-block mr-2 text-black dark:text-white"
                />
                <br />
                <SparklesText
                  text="Redefining Education for the Connected World"
                  className="inline-block text-black dark:text-white"
                />
              </div>
            </div>
            <div className="mt-6 text-xl max-w-3xl mx-auto">
              <TextGenerateEffect words={text} />
            </div>
            <div className="flex justify-center mt-8">
              <div className="z-10 flex h-24 items-center justify-center">
                <div
                  className={cn(
                    "group rounded-full border text-base text-white transition-all ease-in hover:cursor-pointer border-white/5 bg-neutral-900 hover:bg-neutral-800"
                  )}
                >
                  <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-3 transition ease-out hover:duration-300 hover:text-neutral-400">
                    {isSignedIn ? (
                      <Link href="/dashboard">✨ Go to Dashboard</Link>
                    ) : (
                      <SignUpButton
                        forceRedirectUrl="/onboarding"
                        mode="redirect"
                      >
                        <div className="flex items-center">
                          <span className="mr-2">✨</span> Join EduOrbit Today
                          <ArrowRightIcon className="ml-2 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                        </div>
                      </SignUpButton>
                    )}
                  </AnimatedShinyText>
                </div>
              </div>
            </div>
          </div>
        </GridPattern>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <MagicCard
                key={feature.title}
                className={`cursor-pointer p-8 bg-white dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 relative overflow-hidden shadow-md ${feature.ringClass}`}
                gradientColor={"transparent"}
              >
                <div className="relative z-10">
                  <div className={`text-4xl mb-6 w-16 h-16 flex items-center justify-center rounded-full ${feature.iconBgClass}`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 ${feature.colorClass}`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: -50 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Elevate Your Teaching <br /> Amplify Your Learning
        </motion.h1>
      </LampContainer>

      {/* <FeaturesSection /> */}

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-950 dark:to-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800/30 rounded-lg p-8 shadow-md hover:shadow-lg ring-1 ring-gray-200 dark:ring-gray-700/50 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                &quot;EduOrbit has transformed the way I create and manage my
                online courses. The course studio is intuitive, and the
                integrated payment system makes it easy to monetize my
                expertise.&quot;
              </p>
              <p className="text-blue-500 font-semibold">
                - Dr. J. Manoj Kumar, Online Instructor
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/30 rounded-lg p-8 shadow-md hover:shadow-lg ring-1 ring-gray-200 dark:ring-gray-700/50 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                &quot;As a student, I love how easy it is to enroll in courses
                and track my progress. The shareable certificates and public
                profile feature have helped me showcase my skills to potential
                employers.&quot;
              </p>
              <p className="text-blue-500 font-semibold">
                - L. Vignesh, EduOrbit User
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800/30 rounded-lg overflow-hidden shadow-md hover:shadow-lg ring-1 ring-gray-200 dark:ring-gray-700/50 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:scale-105">
              <div className="h-64 bg-gray-200 dark:bg-gray-800 relative">
                <Image 
                  src="/images/team/john.jpg" 
                  alt="John Doe"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-blue-400">Founder & Lead Developer</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800/30 rounded-lg overflow-hidden shadow-md hover:shadow-lg ring-1 ring-gray-200 dark:ring-gray-700/50 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:scale-105">
              <div className="h-64 bg-gray-200 dark:bg-gray-800 relative">
                <Image 
                  src="/images/team/jane.jpg" 
                  alt="Jane Smith"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Jane Smith</h3>
                  <p className="text-blue-400">UX/UI Designer</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800/30 rounded-lg overflow-hidden shadow-md hover:shadow-lg ring-1 ring-gray-200 dark:ring-gray-700/50 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:scale-105">
              <div className="h-64 bg-gray-200 dark:bg-gray-800 relative">
                <Image 
                  src="/images/team/alex.jpg" 
                  alt="Alex Johnson"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Alex Johnson</h3>
                  <p className="text-blue-400">Content Strategy Lead</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800/30 rounded-lg overflow-hidden shadow-md hover:shadow-lg ring-1 ring-gray-200 dark:ring-gray-700/50 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:scale-105">
              <div className="h-64 bg-gray-200 dark:bg-gray-800 relative">
                <Image 
                  src="/images/team/sarah.jpg" 
                  alt="Sarah Williams"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Sarah Williams</h3>
                  <p className="text-blue-400">Education Consultant</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Learn More About Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-950 dark:to-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500">
            Ready to Transform Your Educational Experience?
          </h2>
          <div className="flex justify-center">
            <div className="z-10 flex items-center justify-center">
              <div
                className={cn(
                  "group rounded-lg border text-base transition-all duration-300 hover:cursor-pointer shadow-md hover:shadow-lg border-gray-200 dark:border-gray-700/50 bg-white hover:bg-gray-50 dark:bg-gray-800/30 dark:hover:bg-gray-800/50"
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-8 py-4 text-xl text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                  {isSignedIn ? (
                    <Link href="/dashboard" className="flex items-center">
                      <span className="mr-2">✨</span> Access Your Courses
                      <ArrowRightIcon className="ml-2 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    <SignUpButton
                      forceRedirectUrl="/onboarding"
                      mode="redirect"
                    >
                      <div className="flex items-center">
                        <span className="mr-2">✨</span> Join EduOrbit Today
                        <ArrowRightIcon className="ml-2 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                      </div>
                    </SignUpButton>
                  )}
                </AnimatedShinyText>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center items-center gap-5 py-10 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
        <span>© 2024 EduOrbit. All rights reserved.</span>
      </div>
    </div>
  );
}

const FeaturesSection = () => {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
};

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const items = [
  {
    title: "Custom Signatures",
    description:
      "Personalize certificates with custom signatures for a professional touch.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
  {
    title: "Lifetime Course Access",
    description:
      "Students and teachers enjoy full access to their courses anytime, anywhere.",
    header: <Skeleton />,
    className: "md:col-span-1",
  },
  {
    title: "Public Profiles",
    description:
      "Showcase achievements and expertise with shareable public profiles for students and teachers.",
    header: <Skeleton />,
    className: "md:col-span-1",
  },
  {
    title: "Secure Certificate Verification",
    description:
      "Ensure the authenticity of certificates with our public verification system.",
    header: <Skeleton />,
    className: "md:col-span-2",
  },
];
