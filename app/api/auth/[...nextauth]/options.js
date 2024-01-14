import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "../../libs/mongodb";
import User from "../../libs/models/User"
import bcrypt from 'bcrypt'
import axios from "axios"

export const authOptions = {

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password"
        }
      },
      async authorize(credentials) {
        try {
          
          if(!credentials?.email || !credentials?.password ) return null
          
          await connectDB()

          const user = await User.findOne({ email: credentials.email })
          
          if(!user) return {error:'No such user exist'}

          if(!user?.password) return {error:'Please connect with SSO provider'}
          
          const match = await bcrypt.compare(
            credentials.password, user.password
          )

          if (match) {
            delete user.password
            return user
          }
          
        }
        catch (error) {
          throw new Error('Internal error')
        }
      }
    }),
    GoogleProvider({
      profile(profile) {
        return {
          ...profile,
          id: profile.sub
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GithubProvider({
      profile(profile) {
        return profile
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  
  // pages: {
  //   signIn: "/signIn"
  // },

  callbacks: {

    async signIn({user,account}){

       if(account?.provider === 'google' || account?.provider === 'github'){

        try{

            let body = {
              fullname:user.name,
              email:user.email,
              freeUses:0,
              premium:false,
              provider:account.provider
            }

            const {data} = await axios.post('http://localhost:3000/api/users',body)
            user.id = data?.user?._id
            return user

        }catch(error){
          return null
        }
       }

       if(user.error) return null

       return user
    },
    async jwt({ token, user }) {
      
      if (user) {
        token.id = user.id
        token.name = user?.fullname ? user.fullname : user.name
        token.image = user?.picture ? user.picture : user.avatar_url
        return token
      }
      return token
    },
    async session({ session, token }) {
      
      if (token) {
        session.user.id = token.id
        session.user.image = token.image ? token.image : token.avatar_url
        return session
      }
      return session
    }
  }
}

export default NextAuth(authOptions)