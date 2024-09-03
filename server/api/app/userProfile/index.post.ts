import { protectedEventHandler } from "~/server/helpers/protectedEventHandler";
import userProfileService from "~/server/services/app/userProfileService";

export default protectedEventHandler(async (event) => {
  const body = await readBody(event);

  return await userProfileService.createProfile(
    event.context.user.id,
    body.name
  );
});
