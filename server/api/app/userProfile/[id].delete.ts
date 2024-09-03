import { protectedEventHandler } from "~/server/helpers/protectedEventHandler";
import userProfileService from "~/server/services/app/userProfileService";

export default protectedEventHandler(async (event) => {
  return await userProfileService.deleteProfile(
    event.context.user.id,
    parseInt(event.context.params!.id)
  );
});
