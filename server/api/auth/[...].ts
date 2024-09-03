import { NuxtAuthHandler } from "#auth";
import GithubProvider from "next-auth/providers/github";
import userProfileService from "~/server/services/app/userProfileService";
const appConfig = useAppConfig();

export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: appConfig.github_client_id,
      clientSecret: appConfig.github_client_secret,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user }) => {
      await userProfileService.createDefaultProfile(user.id, user.name!);

      return true;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isAdmin: session.user.email == "ugraskan@gmail.com",
        },
      };
    },
  },
});
