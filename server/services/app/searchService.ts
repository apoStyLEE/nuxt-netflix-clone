import prismaClient from "../../data/prismaClient";

export default {
  async searchMovie(keyword: string) {
    return await prismaClient.genres.findMany({
      include: {
        Medias: {
          include: {
            Episods: true,
          },
          where: {
            OR: [
              {
                title: {
                  contains: keyword,
                },
              },
              {
                description: {
                  contains: keyword,
                },
              },
            ],
          },
        },
      },
    });
  },
};
