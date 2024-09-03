<template>
  <div>
    <div>
      <div v-for="genre in genres">
        <h1 class="text-4xl mt-2 mb-2">{{ genre.title }}</h1>
        <ul class="grid grid-cols-6 gap-5">
          <li v-for="movie in genre.Medias">
            <NuxtLink
              @click.prevent="handleOpenMovieDetails(movie, genre)"
              class="block overflow-hidden border-2 border-black hover:border-gray-200"
            >
              <img
                :src="'/images/samples/' + movie.Episods[0].thumbnail_image"
                class="object-cover w-full h-40"
              />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <media-modal
      v-model:show="show"
      v-if="currentMovie"
      :movie="currentMovie"
    />
  </div>
</template>

<script lang="ts" setup>
const show = ref();
const currentMovie = ref();

defineProps<{
  genres: any;
}>();

watch(show, (val) => {
  if (!val) {
    currentMovie.value = null;
  }
});

const handleOpenMovieDetails = (movie: any, genre: any) => {
  movie.genre = genre;
  currentMovie.value = movie;
  show.value = true;
};
</script>
