import prismaClient from "../../data/prismaClient";

export default {
  async addToList(
    userId: string,
    profileId: number,
    movieId: number,
    episodId: number
  ) {
    return await prismaClient.lists.create({
      data: {
        user_id: userId,
        profile_id: profileId,
        media_id: movieId,
        episods_id: episodId,
        added_date: new Date(),
      },
    });
  },
  async removeToList(
    userId: string,
    profileId: number,
    movieId: number,
    episodId: number
  ) {
    return await prismaClient.lists.deleteMany({
      where: {
        user_id: userId,
        profile_id: profileId,
        media_id: movieId,
        episods_id: episodId,
      },
    });
  },
  async getToList(
    userId: string,
    profileId: number,
    movieId: number,
    episodId: number
  ) {
    return await prismaClient.lists.findFirst({
      where: {
        user_id: userId,
        profile_id: profileId,
        media_id: movieId,
        episods_id: episodId,
      },
    });
  },
  async getMyList(userId: string, profileId: number) {
    const myList = await prismaClient.lists.findMany({
      where: {
        user_id: userId,
        profile_id: profileId,
      },
    });

    if (!myList) {
      return null;
    }

    const mediaIds = myList.map((list) => list.media_id!);

    return await prismaClient.genres.findMany({
      include: {
        Medias: {
          include: {
            Episods: true,
          },
          where: {
            id: {
              in: mediaIds,
            },
          },
        },
      },
      where: {
        // id: {
        //   in: myList.map((list) => list.media_id!),
        // },
        Medias: {
          some: {
            id: {
              in: mediaIds,
            },
          },
        },
      },
    });
  },
};
