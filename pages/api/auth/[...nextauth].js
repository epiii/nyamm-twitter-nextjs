import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        // ...add more providers here
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.tag = session.user.name
                .split(" ")
                .join("")
                .toLocaleLowerCase()

            session.user.uid = token.sub
            return session
        }
    }
})