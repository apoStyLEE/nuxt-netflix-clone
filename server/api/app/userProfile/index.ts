import { protectedEventHandler } from "~/server/helpers/protectedEventHandler";
import userProfileService from "~/server/services/app/userProfileService";

export default protectedEventHandler(async (event) => {
  return await userProfileService.listUserProfile(event.context.user.id);
});
