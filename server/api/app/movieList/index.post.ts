import { protectedEventHandler } from "~/server/helpers/protectedEventHandler";
import listService from "~/server/services/app/listService";
import constants from "@/constants/starFlixConstants";

export default protectedEventHandler(async (event) => {
  const body = await readBody(event);
  const profileId = getCookie(event, constants.SELECTED_PROFILE_COOKIE_NAME);

  await listService.addToList(
    event.context.user.id,
    parseInt(profileId!),
    parseInt(body.movieId),
    parseInt(body.episodId)
  );

  return true;
});
