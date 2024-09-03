import movieSchema from "~/schemas/movieSchema";
import { protectedAdminEventHandler } from "~/server/helpers/protectedEventHandler";
import movieService from "~/server/services/admin/movieService";

export default protectedAdminEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    movieSchema.schema.safeParse(body)
  );

  if (!result.success) throw result.error.issues;

  return await movieService.createMovie(result.data);
});
