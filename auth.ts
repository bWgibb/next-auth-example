import NextAuth from "next-auth"

// import Apple from "next-auth/providers/apple"
import AzureAd from "@auth/core/providers/azure-ad"
import GoogleProvider from "next-auth/providers/google"

import type { NextAuthConfig } from "next-auth"

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    // Apple,
    AzureAd({
      clientId: process.env.AUTH_AZURE_ID,
      clientSecret: process.env.AUTH_AZURE_SECRET,
      tenantId: process.env.AUTH_AZURE_TENANT,
    }),

    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
