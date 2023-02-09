// Librairies
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from 'helpers/mongodb';
import { verifyPassword } from 'helpers/auth';

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        // Connect to MongoDB
        const clientMongoDB = await connectToDatabase();

        // Check if user exist in DB
        const user = await clientMongoDB
          .db()
          .collection('utilisateurs')
          .findOne({ email: email });

        if (!user) {
          clientMongoDB.close();
          throw new Error('Impossible de vous authentifier.');
        }

        // Check the password with DB's password
        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          clientMongoDB.close();
          throw new Error('Impossible de vous authentifier.');
        }

        // Success
        clientMongoDB.close();
        return {
          email: user.email,
          name: user.pseudo,
          id: user._id,
          roles: user.roles,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return token;
    },
    session: async (session, user) => {
      session.user = user.user;
      return session;
    },
  },
});
