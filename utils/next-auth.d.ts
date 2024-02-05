import { UserType } from "@/app/api/libs/models/User";
import { Session,DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id: string;
      name: string | null | undefined;
      image:string | null | undefined;
      premium:boolean | undefined;
      byCredentials:boolean
    }
  }

  interface User extends UserType,DefaultUser {
    picture?:string | null | undefined
    avatar_url?:string | null | undefined
    error:string
    byCredentials:boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string | null | undefined;
    image:string | null | undefined;
    premium:boolean | undefined;
    byCredentials:boolean
  }
}