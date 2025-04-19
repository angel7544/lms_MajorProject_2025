# EduOrbit - Advanced Learning Management System

Welcome to EduOrbit! This repository contains the code for a comprehensive Learning Management System built with Next.js, Tailwind CSS, Shadcn UI, React Video, Prisma ORM, PostgreSQL, and Clerk.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction

EduOrbit is designed to provide a seamless learning experience for both teachers and students. The platform offers a range of features to facilitate course creation, enrollment, and completion. Our mission is to make high-quality education accessible to everyone through an intuitive and feature-rich platform.

## Features

### User Roles
- Choose between student and teacher roles during signup
- Teachers can create courses, publish content, issue certifications, and earn from course sales
- Students can enroll in courses (free or paid), track progress, and earn certificates upon completion

### Course Management
- Teachers can access Course Studio to customize course structure
- Options to make courses free or paid
- Publish chapters with videos, attachments, and explanations in Markdown format
- Progress tracking for both teachers and students

### Payment Integration
- Razorpay integration for secure course payments
- Dashboard for revenue tracking for teachers

### Search Functionality
- Advanced search courses by teacher name, title, or category
- Filter courses by price, duration, and rating

### Email Automation
- Welcome email upon signup
- Course enrollment confirmation email
- Course completion email with certificate download link
- Course update notifications for enrolled students
- Weekly progress reports for students

### User Profiles
- Shareable profiles showcasing enrolled courses, certifications, goals, and interests
- Customizable user settings
- Achievement badges and progress indicators

### Certifications
- Teachers can upload signatures for course certificates
- Certificates include teacher and portal owner signatures
- Blockchain verification for certificate authenticity (coming soon)

### UI/UX
- Clean user interface with black and white theme
- Toast notifications for user feedback
- Skeleton states for improved loading experience
- Responsive design for mobile, tablet, and desktop

### Navigation
- Dashboard for quick overview
- Course Studio for teachers
- Certificates section
- Profile management
- Settings page
- Analytics for teachers

### Additional Features
- Beautiful landing page
- Onboarding form for user interests and goals
- Real-time notifications
- Interactive course discussions
- Rich media support including videos, PDFs, and interactive quizzes

## Tech Stack
- **Next.js 14** ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
- **Tailwind CSS** ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
- **Shadcn UI** ![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-00a0e4?style=flat)
- **React Video** ![React Video](https://img.shields.io/badge/React_Video-61DAFB?style=flat&logo=react&logoColor=white)
- **Prisma ORM** ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
- **PostgreSQL** ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)
- **Clerk** ![Clerk](https://img.shields.io/badge/Clerk-3E70F7?style=flat)
- **Razorpay** ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat&logo=razorpay&logoColor=white)
- **React Hook Form** ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat)
- **Zod** ![Zod](https://img.shields.io/badge/Zod-3068B7?style=flat)
- **React Query** ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=react-query&logoColor=white)
- **Mux** ![Mux](https://img.shields.io/badge/Mux-FF2D20?style=flat)

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- pnpm or npm package manager

### Clone the Repository
```sh
git clone https://github.com/angel7544/lms.git
cd lms
```

### Install Dependencies
```sh
# Using pnpm
pnpm install

# Using npm
npm install
```

### Setup Environment Variables
Create a `.env` file in the root directory and add the necessary environment variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eduorbit"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Mux Video
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret

# Uploadthing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
```

### Run Database Schema Push
```sh
# Using pnpm
pnpm dlx prisma db push

# Using npm
npx prisma db push
```

### Run Schema Types Generation
```sh
# Using pnpm
pnpm dlx prisma generate

# Using npm
npx prisma generate
```

### Start the Application
```sh
# Using pnpm
pnpm dev

# Using npm
npm run dev
```

## Usage
To start using the application, navigate to `http://localhost:3000` in your browser.

## Database Management

### Setting Up a Local Database
```sh
# Install PostgreSQL locally or use Docker
# Docker example:
docker run --name eduorbit-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DB=eduorbit -p 5432:5432 -d postgres

# Verify database connection
# Using pnpm
pnpm dlx prisma studio

# Using npm
npx prisma studio
```

### Pushing Schema Changes
After making changes to the Prisma schema, push them to the database:
```sh
# Using pnpm
pnpm dlx prisma db push

# Using npm
npx prisma db push
```

### Running Migrations
For production environments, use migrations instead of direct pushing:
```sh
# Create a migration
# Using pnpm
pnpm dlx prisma migrate dev --name your_migration_name

# Using npm
npx prisma migrate dev --name your_migration_name

# Apply migrations in production
# Using pnpm
pnpm dlx prisma migrate deploy

# Using npm
npx prisma migrate deploy
```

### Reset Database
To reset your database (caution: deletes all data):
```sh
# Using pnpm
pnpm dlx prisma migrate reset

# Using npm
npx prisma migrate reset
```

## Project Structure
```
EduOrbit/
├── prisma/              # Prisma schema and migrations
├── public/              # Public assets
├── src/
│   ├── app/             # App routes and API endpoints
│   │   ├── (auth)/      # Authentication related pages
│   │   ├── (common)/    # Common pages (dashboard, courses, etc.)
│   │   │   ├── (student)/ # Student specific pages
│   │   │   └── (teacher)/ # Teacher specific pages
│   │   ├── api/         # API routes
│   │   └── ...
│   ├── components/      # Reusable components
│   │   ├── ui/          # UI components from Shadcn
│   │   └── ...
│   ├── lib/             # Utility libraries and functions
│   ├── hooks/           # Custom React hooks
│   ├── providers/       # React context providers
│   ├── actions/         # Server actions
│   └── ...
└── ...
```

## Deployment

EduOrbit can be deployed on various platforms. Here are instructions for deploying on Vercel:

### Deploying to Vercel

1. Create a Vercel account if you don't have one
2. Connect your GitHub repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy the application

```sh
# Using pnpm
pnpm run build
vercel --prod

# Using npm
npm run build
vercel --prod
```

## Contributing

We welcome contributions to EduOrbit! Please follow these steps to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## Contact

For any queries or support, please reach out to us:

- Project Maintainer: [Angel Singh](mailto:angelsingh2199@gmail.com)
- GitHub: [Ashutosh Kumar](https://github.com/ashukr321) [Angel Singh](https://github.com/angel7544)

---

Built with ❤️ by the EduOrbit Team