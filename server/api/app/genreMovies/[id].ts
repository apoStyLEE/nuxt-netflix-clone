import { protectedEventHandler } from "~/server/helpers/protectedEventHandler";
import movieService from "~/server/services/app/movieService";

export default protectedEventHandler(async (event) => {
  return await movieService.getMoviesWithGenreId(
    parseInt(event.context.params!.id)
  );
});
