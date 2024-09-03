import { protectedAdminEventHandler } from "~/server/helpers/protectedEventHandler";
import movieService from "~/server/services/admin/movieService";

export default protectedAdminEventHandler(async (event) => {
  return await movieService.listMovie();
});
