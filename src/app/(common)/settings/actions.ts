"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import WelcomeToEduOrbit from "../../../../emails/WelcomeToEduOrbit";

export const onboarding = async () => {
  try {
    const { userId } = auth();
    if (!userId) {
      return { message: "Unauthorized" };
    }
    const user = await prisma.user.findUnique({
      where: {
        authId: userId,
      },
    });
    if (!user) {
      return { message: "User not found" };
    }

    const transport = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Welcome To EduOrbit Portal (Role Change)",
      html: render(
        WelcomeToEduOrbit({
          name: user?.name || user.email.split("@")[0],
          role: "TEACHER",
        })
      ),
    };

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw new Error("Error sending email");
      }
    });
  } catch (error) {
    throw new Error("Error in onboarding");
  }
};
