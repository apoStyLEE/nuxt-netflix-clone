import { protectedEventHandler } from "~/server/helpers/protectedEventHandler";
import genreService from "~/server/services/admin/genreService";

export default protectedEventHandler(async (event) => {
  return await genreService.getGenre(parseInt(event.context.params!.id));
});
