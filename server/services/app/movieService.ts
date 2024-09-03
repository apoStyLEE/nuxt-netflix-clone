import prismaClient from "../../data/prismaClient";

export default {
  async listHomeMovie() {
    return await prismaClient.genres.findMany({
      include: {
        Medias: {
          include: {
            Episods: true,
          },
        },
      },
      where: {
        Medias: {
          some: {},
        },
      },
    });
  },
  async getMoviesWithGenreId(id: number) {
    return await prismaClient.genres.findMany({
      include: {
        Medias: {
          include: {
            Episods: true,
          },
        },
      },
      where: {
        id: id,
        Medias: {
          some: {},
        },
      },
    });
  },
};
