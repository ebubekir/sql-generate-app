import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwtDecode from 'jwt-decode'
import moment from 'moment'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      // @ts-ignore
      async authorize(credentials) {
        const result = await fetch('http://0.0.0.0:8000/login', {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `username=${credentials?.email}&password=${credentials?.password}`,
        }).then((res) => res.json())

        if (result?.status_code === 401) {
          return null
        }

        return {
          access_token: result.access_token,
          ...jwtDecode(result.access_token),
        }
      },
    }),
  ],
  callbacks: {
    async jwt(data) {
      return { ...data.token, ...data.user }
    },
    async session({ session, token }) {
      // @ts-ignore
      const tokenDecoded: {
        user_id: number
        full_name: string
        created_at: string
        email: string
        exp: number
        // @ts-ignore
      } = jwtDecode(token.access_token)

      if (moment() > moment.unix(tokenDecoded.exp)) {
        throw new Error('Token expired.')
      }

      session.user = token
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: 'af56bb95311dbe3f95ed298353687aa89791804e2b59fbfdb9f21db7594ad43a',
} satisfies NextAuthOptions

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
