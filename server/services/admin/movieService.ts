import { MovieModel } from "~/schemas/movieSchema";
import prismaClient from "../../data/prismaClient";
import MovieTypes from "~/schemas/movieTypes";

export default {
  async listMovie() {
    return await prismaClient.media.findMany({
      include: {
        Episods: true,
        genre: true,
      },
    });
  },
  async getMovie(id: number) {
    return await prismaClient.media.findFirst({
      where: {
        id,
      },
      include: {
        Episods: true,
        genre: true,
      },
    });
  },
  async createMovie(movie: MovieModel) {
    const movieData = await prismaClient.media.create({
      data: {
        genre_id: movie.genre,
        type: MovieTypes.MOVIE,
        title: movie.title,
        description: movie.description, //
      },
    });

    if (movieData) {
      await prismaClient.episods.create({
        data: {
          media_id: movieData.id,
          episode_number: 0,
          season_number: 0,
          duration: movie.duration,
          release_date: movie.releaseDate,
          video_url: movie.videoUrl,
          thumbnail_image: movie.thumbnailImage,
          cover_image: movie.coverImage,
        },
      });
    }

    return movieData;
  },
  async updateMovie(id: number, movie: MovieModel) {
    const movieData = await prismaClient.media.update({
      where: {
        id,
      },
      include: {
        Episods: true,
      },
      data: {
        genre_id: movie.genre,
        title: movie.title,
        description: movie.description,
      },
    });

    await prismaClient.episods.update({
      where: {
        media_id: id,
        id: movieData.Episods[0].id,
      },
      data: {
        duration: movie.duration,
        release_date: movie.releaseDate,
        video_url: movie.videoUrl,
        thumbnail_image: movie.thumbnailImage,
        cover_image: movie.coverImage,
      },
    });

    return movieData;
  },
  async getMoviesWithGenreId(id: number) {
    return await prismaClient.media.findMany({
      include: {
        Episods: true,
        genre: true,
      },
      where: {
        genre_id: id,
      },
    });
  },
};
