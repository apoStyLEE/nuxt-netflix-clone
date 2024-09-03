<template>
  <div
    v-if="show"
    class="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-90 p-36"
  >
    <div class="h-[30rem] relative">
      <div>
        <h1 class="text-5xl uppercase">{{ movie.title }}</h1>
        <div class="w-2/3 mt-5">
          <img
            :src="'/images/samples/' + movie.Episods[0].thumbnail_image"
            class="object-cover"
          />

          <p>
            {{ movie.description }}
          </p>

          <NuxtLink :to="'/genre/' + movie.genre.id">
            <p class="text-gray-600 mt-2">
              {{ movie.genre.title }}
            </p>
          </NuxtLink>

          <button
            class="border border-gray-500 px-5 mt-5 bg-gray-800 w-52"
            @click="showVideo = true"
          >
            Oynat
          </button>

          <ul class="mt-5 space-y-3">
            <li>
              <NuxtLink to=""
                ><FilmIcon class="w-5 h-5 mr-1 inline" /> Tanıtım</NuxtLink
              >
            </li>
            <li>
              <Button @click="handleRemoveToList" v-if="listToMovie">
                <BookmarkSlashIcon class="w-5 h-5 mr-1 inline" />
                Listemden Çikar</Button
              >

              <Button @click="handleAddToList" v-else>
                <BookmarkIcon class="w-5 h-5 mr-1 inline" />
                Listeme Ekle</Button
              >
            </li>
          </ul>
        </div>
      </div>
      <button
        class="absolute bottom-0 right-0 flex items-center hover:text-white"
        @click="show = false"
      >
        <ArrowLeftCircleIcon class="w-5 h-5 text-red-700 mr-1" />Geri
      </button>
    </div>

    <div
      @mouseover="showCloseVideoButton = true"
      @mouseout="showCloseVideoButton = false"
      class="border"
      v-if="showVideo"
    >
      <video
        :src="movie.Episods[0].video_url"
        class="absolute top-0 bottom-0 left-0 right-0 w-full h-screen"
        autoplay
        controls
      />
      <button
        class="absolute right-5 z-10 top-10 border bg-gray-800 px-3"
        v-show="showCloseVideoButton"
        @click="showVideo = false"
      >
        Kapat
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftCircleIcon,
  FilmIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@heroicons/vue/24/outline";

const show = defineModel<boolean>("show");
const showCloseVideoButton = ref(false);
const showVideo = ref(false);

const props = defineProps<{
  movie: any;
}>();

const { data: listToMovie, refresh } = await useFetch("/api/app/movieList/", {
  query: {
    movieId: props.movie.id,
    episodId: props.movie.Episods[0].id,
  },
});

const handleAddToList = async () => {
  const { data } = await useFetch("/api/app/movieList", {
    method: "POST",
    body: {
      movieId: props.movie.id,
      episodId: props.movie.Episods[0].id,
    },
  });

  refresh();
};

const handleRemoveToList = async () => {
  const { data } = await useFetch("/api/app/movieList", {
    method: "DELETE",
    body: {
      movieId: props.movie.id,
      episodId: props.movie.Episods[0].id,
    },
  });

  refresh();
};
</script>
