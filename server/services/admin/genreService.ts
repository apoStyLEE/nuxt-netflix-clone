import prismaClient from "../../data/prismaClient";

export default {
  async listGenre() {
    return await prismaClient.genres.findMany();
  },
  async getGenre(id: number) {
    return await prismaClient.genres.findFirst({
      where: {
        id,
      },
    });
  },
};
