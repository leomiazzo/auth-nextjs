import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
//import { saltAndHashPassword } from "@/utils/password"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        
         let user = null
 
        // logic to salt and hash password
        //const pwHash = saltAndHashPassword(credentials.password)
 
        // logic to verify if the user exists
        //user = await getUserFromDb(credentials.email, pwHash)
 
         const response = await fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               email: credentials.email,
               password: credentials.password
            })
         })

         console.log(response)

         if (!response.ok)
            return null;

         user = await response.json();

         return user;
      },
    }),
  ],
  callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.token = user.token;
         }

         return token;
      },
      async session({ session, token }) {
         session.token = token.token as string;

         return session;
      }
  }
})