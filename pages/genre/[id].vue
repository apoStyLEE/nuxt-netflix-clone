<template>
  <div>
    <media-band :genres="genres" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: genres } = await useFetch(
  "/api/app/genreMovies/" + route.params.id
);
</script>
