<template>
  <Form
    class="starflix-form"
    :validation-schema="movieValidationSchema"
    @submit="handleSubmit"
    :initial-values="updateMovie"
  >
    <h1>{{ title }}</h1>

    <div class="form-control">
      <label>Genre</label>

      <Field name="genre" as="select" class="form-control">
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.title }}
        </option>
      </Field>
      <ErrorMessage name="genre" class="text-red-500" />
    </div>

    <div class="form-control">
      <label>Title</label>

      <Field name="title" class="form-control" />
      <ErrorMessage name="title" class="text-red-500" />
    </div>

    <div class="form-control">
      <label>Description</label>
      <Field name="description" as="textarea" class="form-control" />
      <ErrorMessage name="description" class="text-red-500" />
    </div>

    <div class="form-control">
      <label>Video Url</label>
      <Field name="videoUrl" class="form-control" />
      <ErrorMessage name="videoUrl" class="text-red-500" />
    </div>

    <div class="form-control">
      <label>Thumbnail Image</label>
      <Field name="thumbnailImage" class="form-control" />
      <ErrorMessage name="thumbnailImage" class="text-red-500" />
    </div>

    <div class="form-control">
      <label>Cover Image</label>
      <Field name="coverImage" class="form-control" />
      <ErrorMessage name="coverImage" class="text-red-500" />
    </div>

    <div class="form-control">
      <label>Duration</label>
      <Field name="duration" class="form-control" type="number" />
      <ErrorMessage name="duration" class="text-red-500" />
    </div>

    <div class="form-control">
      <label>Release Date</label>
      <Field name="releaseDate" class="form-control" type="date" />
      <ErrorMessage name="releaseDate" class="text-red-500" />
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <NuxtLink
        to="/admin/movies"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancel
      </NuxtLink>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {{ action == "create" ? "Add Movie" : "Update Movie" }}
      </button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import movieSchema, { type MovieModel } from "~/schemas/movieSchema";

const updateMovie = ref<MovieModel>();

const props = defineProps({
  title: {
    type: String,
  },
  action: {
    type: String, //create or update
  },
});

const movieValidationSchema = toTypedSchema(movieSchema.schema);
const { data: genres } = await useFetch("/api/admin/genres");
const route = useRoute();

const handleSubmit = async (values: any) => {
  if (props.action == "update") {
    await useFetch(`/api/admin/movie/`, {
      method: "PUT",
      body: values,
      query: {
        id: route.params.id,
      },
    });
    navigateTo("/admin/movies");
  } else {
    const { data: movie } = await useFetch("/api/admin/movie", {
      method: "POST",
      body: values,
    });
    navigateTo("/admin/movies");
  }
};

if (props.action == "update") {
  const { data: movie } = await useFetch(`/api/admin/movie/${route.params.id}`);

  const movieValue = movie.value;
  const movieEpisode = movieValue.Episods[0];

  updateMovie.value = {
    genre: movieValue.genre_id,
    title: movieValue.title,
    description: movieValue.description,
    videoUrl: movieEpisode.video_url,
    thumbnailImage: movieEpisode.thumbnail_image,
    coverImage: movieEpisode.cover_image,
    duration: movieEpisode.duration,
    releaseDate: movieEpisode.release_date,
  };
}
</script>

<style>
.starflix-form {
  @apply space-y-5;

  .form-control {
    label {
      @apply block font-medium;
    }

    .form-control {
      @apply border p-1 rounded-lg w-full;
    }
  }
}
</style>
