import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {NextApiRequest} from "next";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import Credentials from "next-auth/providers/credentials";
import userStore from "../../../store/user";

var username = "11";
export default NextAuth({
  // 로그인 인증 방식 설정하기
  providers: [
    CredentialsProvider({
      id: "id-password-credential",
      name: "id-password-credential",
      type: 'credentials',
      credentials: {
        id: { label: "Id", type: "text", placeholder: "id" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<any, any>, req: NextApiRequest){
        // const {userName, setUserName} = userStore()

        const id = credentials.id;
        const password = credentials.password;
        const loginData = {
          id: id,
          pw: password
        }
        var name = await null
        await axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/members/login", null, {params: loginData} ).then((res)=>{
          name = res.data;
        }).catch((e) => {
          throw new Error("로그인 정보 틀림")
        });
        const user = {
          id: id,
          name: name,
        }
        console.log(user.name)

        return user;
      },
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      console.log(token.user)
      user = token.user
      return token
    },
    async session(session, token, user) {
      console.log("session", session)
      session.session.user.name = session.token.token.user.name
      console.log(session.session.user.name )
      return session
    }
  }
})