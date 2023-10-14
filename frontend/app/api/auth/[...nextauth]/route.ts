import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'redentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }
        console.log('debug point')
        console.log('credentials', credentials)
        console.log('req', req)
        return user
      },
    }),
  ],
  callbacks: {
    async jwt(data) {
      return { ...data.token, ...data.user }
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthOptions
