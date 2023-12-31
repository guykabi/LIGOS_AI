import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import bcrypt from 'bcrypt'

export const authOptions = {
  
  providers: [
    CredentialsProvider({
      name:'Credentials',
      credentials: {
        email:{
          label:"Email",
          type:"text",
          placeholder:"Enter email"
        },
        password:{
          label:"Password",
          type:"password",
          placeholder:"Enter password"
        }
      },
      async authorize(credentials){
        try{
           const user = await User.findOne({email:credentials.email}).lean()
           if(user){
            const match = await bcrypt.compare(
              credentials.password,user.password
              )

              if(match){
                delete user.password
                return user
              }
           }
           
        }
        catch(error){
          return null
        }
      }
    }),
    GoogleProvider({
      profile(profile){
        return {
          ...profile,
          id:profile.sub
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_SECRET
    }),
    GithubProvider({
      profile(profile){
        return profile
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  callbacks:{
    async jwt({ token, user}) {
      if(user){
        token.name = user?.fullname ? user.fullname : user.name
        return token
      }
      return token
    },
    async session({session,token}) {
      if(token){
        session.user.image = token.image
        return session
      }
      return session
    }
  }
}

export default NextAuth(authOptions)