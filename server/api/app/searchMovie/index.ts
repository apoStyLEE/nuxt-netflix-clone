import { protectedEventHandler } from "~/server/helpers/protectedEventHandler";
import searchService from "~/server/services/app/searchService";

export default protectedEventHandler(async (event) => {
  const query = getQuery(event);
  const keyword = query.keyword;
  if (!keyword) return null;
  return await searchService.searchMovie(keyword.toString());
});
