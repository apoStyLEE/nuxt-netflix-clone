import { protectedEventHandler } from "~/server/helpers/protectedEventHandler";
import userProfileService from "~/server/services/app/userProfileService";
import constants from "@/constants/starFlixConstants";

export default protectedEventHandler(async (event) => {
  const profileId = getCookie(event, constants.SELECTED_PROFILE_COOKIE_NAME);

  if (profileId) {
    return await userProfileService.getProfile(
      event.context.user.id,
      parseInt(profileId)
    );
  }

  return null;
});
