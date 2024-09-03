import { protectedAdminEventHandler } from "~/server/helpers/protectedEventHandler";
import movieService from "~/server/services/admin/movieService";

export default protectedAdminEventHandler(async (event) => {
  const movieId = getRouterParam(event, "id");
  console.log(movieId + "zz");
  return await movieService.getMovie(parseInt(movieId!));
});
