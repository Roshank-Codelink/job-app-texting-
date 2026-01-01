
import { verifyOTP } from '@/api_config/SigninApi/loginapi';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const credentialsConfig = CredentialsProvider({
    name: 'Credentials',
    credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
        otp: { label: 'OTP', type: 'text', placeholder: 'Enter your OTP' },
    },


    async authorize(credentials) {

        try {
            const { email, otp } = credentials as any;
            console.log("Email:", email);
            console.log("OTP:", otp);

            const response = await verifyOTP(email, otp);

            console.log("Verify OTP Response", response);

            if (response.error) {
                console.error("Verify OTP Error", response.data.message);
                return null;
            }

            // Check if the response has the expected structure
            if (!response.data || !response.data.data) {
                console.error("Invalid response structure", response.data);
                return null;
            }

            return {
                id: response.data.data.id,
                email: response.data.data.email,
                name: response.data.data.name,
                role: response.data.data.role,
                token: response.data.data.token,
                companyName: response.data.data.companyName,
            }

        } catch (error) {
            console.error("Authorize error", error);
            return null;
        }
    }
});


const config: NextAuthConfig = {
    providers: [credentialsConfig],
    pages: {
        signIn: "/employer-signin",
    },
    callbacks: {
        async jwt({ token, user, trigger, session, account }: any) {
            if (trigger === "update" && session) {
                console.log("Session updated", session);
                token.user = session.user;
                token.role = session.user?.role;
                return token;
            }
            if (account?.provider === "credentials" && user) {
                token.user = user;
                token.role = user.role; // Store role at top level for middleware access
            }
            return token;
        },


        async session({ session, token }: any) {
            if (token.user) {
                session.user = {
                    ...session.user,
                    ...token.user,
                };
            }
            return session;
        },

    },
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
    session: {
        strategy: 'jwt',
    },
    debug: process.env.NODE_ENV === 'development',
}

const { handlers, auth, signIn, signOut } = NextAuth(config);

export default handlers;
export { config, handlers, auth, signIn, signOut };