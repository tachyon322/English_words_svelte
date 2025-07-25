import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ["http://localhost:5173"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "User",
        input: false,
      },
      points: {
        type: "number",
        required: true,
        defaultValue: 0,
      },
      currentStreak: {
        type: "number",
        required: true,
        defaultValue: 0,
      },
      lastActiveDate: {
        type: "date",
        required: false,
      },
      guideCompleted: {
        type: "boolean"
      }
    },
  },
});
