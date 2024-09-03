import { protectedEventHandler } from "~/server/helpers/protectedEventHandler";
import listService from "~/server/services/app/listService";
import constants from "@/constants/starFlixConstants";

export default protectedEventHandler(async (event) => {
  const profileId = getCookie(event, constants.SELECTED_PROFILE_COOKIE_NAME);

  return await listService.getMyList(
    event.context.user.id,
    parseInt(profileId!)
  );
});
