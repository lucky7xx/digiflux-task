import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      authorization: {
        // for forcing to sign with google everytime
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session(session, token) {
      if (token) {
        // Extract user information from the token
        const user = token.user;
        // Here, you can access the user's unique identifier (e.g., email)
        const userId = user.email; // You can change this to use a different unique identifier
        // Check if the user has signed in before
        if (!session.users.includes(userId)) {
          // Add the user's unique identifier to the list of signed-in users
          session.users.push(userId);
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
