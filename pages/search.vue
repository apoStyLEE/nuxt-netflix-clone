<template>
  <div>
    <form @submit.prevent="handleSearchMovie" class="flex">
      <input v-model="keyword" class="p-2 rounded mr-2" />
      <button type="submit" class="p-2 rounded">Ara</button>
    </form>

    <media-band :genres="genres" />
  </div>
</template>

<script lang="ts" setup>
const keyword = ref();
const genres = ref([]);

const handleSearchMovie = async () => {
  const { data } = await useFetch("/api/app/searchMovie", {
    query: {
      keyword: keyword.value,
    },
  });

  genres.value = data.value;
};
</script>
