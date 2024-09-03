import prismaClient from "../../data/prismaClient";

export default {
  async createDefaultProfile(userId: string, name: string) {
    const newUserProfile = await prismaClient.userProfile.findFirst({
      where: {
        userId,
        isDefault: true,
      },
    });

    if (newUserProfile) {
      return;
    }

    await prismaClient.userProfile.create({
      data: {
        userId,
        name,
        isDefault: true,
      },
    });
  },
  async listUserProfile(userId: string) {
    return prismaClient.userProfile.findMany({
      where: {
        userId,
      },
    });
  },
  async createProfile(userId: string, name: string) {
    await prismaClient.userProfile.create({
      data: {
        userId,
        name,
        isDefault: false,
      },
    });
  },
  async deleteProfile(userId: string, profileId: number) {
    await prismaClient.userProfile.delete({
      where: {
        id: profileId,
        userId: userId,
        isDefault: false,
      },
    });
  },
  async getProfile(userId: string, profileId: number) {
    console.log({ userId, profileId });
    return await prismaClient.userProfile.findFirst({
      where: {
        id: profileId,
        userId: userId,
      },
    });
  },
};
