import * as zod from "zod";

const schema = zod.object({
  genre: zod.number({ message: "select genre" }),
  title: zod.string().min(3),
  description: zod.string().optional(),
  videoUrl: zod.string(),
  thumbnailImage: zod.string(),
  coverImage: zod.string(),
  duration: zod.number(),
  releaseDate: zod.coerce.date(),
});

type MovieModel = zod.infer<typeof schema>;

export default {
  schema,
};

export type { MovieModel };
