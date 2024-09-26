import { DefaultUser } from "next-auth"

declare module "next-auth" {
   interface Session {
      token: string;
   }

   interface User extends DefaultUser {
      token: string;
   }
}