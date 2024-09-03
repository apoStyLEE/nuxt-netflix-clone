import { protectedAdminEventHandler } from "~/server/helpers/protectedEventHandler";
import genreService from "~/server/services/admin/genreService";

export default protectedAdminEventHandler(async (event) => {
  return await genreService.listGenre();
});
