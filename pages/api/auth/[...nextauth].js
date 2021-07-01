import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { compareHandler } from "../../../lib/auth";
import { db } from "../../../lib/connectDB";

export default NextAuth({
  session: {
    jws: true,
  },
  providers: [
    Providers.Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_KEY,
      clientSecret: process.env.AUTH_GOOGLE_SECRET_KEY,
    }),
    Providers.Credentials({
      async authorize(credentials) {
        const user = await db
          .collection("users")
          .where("email", "in", [credentials.email])
          .get();
        const userData = [];
        user.forEach((user) => {
          userData.push(user.data());
        });
        if (userData.length == 0) {
          throw new Error("User not found");
        }

        const isCorrect = await compareHandler(
          credentials.password,
          userData[0].password
        );
        if (!isCorrect) {
          throw new Error("Invalid password");
        }
        return {
          email: userData[0].email,
          name: userData[0].name,
        };
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.id = user.id;
      const userData = await db
        .collection("users")
        .where("email", "in", [user.email])
        .get();
      if (userData.empty) {
        const userDetails = await db.collection("users").add({
          email: user.email,
          name: user.name,
          likes: [],
          carts: [],
        });
        return {
          user: {
            userID: userDetails.id,
            email: user.email,
            name: user.name,
          },
        };
      }
      var result;
      userData.forEach((user) => {
        result = {
          user: {
            userID: user.id,
            email: user.data().email,
            name: user.data().name,
          },
        };
      });
      return result;
    },
  },
});
