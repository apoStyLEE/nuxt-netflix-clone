<template>
  <div>
    <media-band :genres="genres" />
  </div>
</template>

<script lang="ts" setup>
const { data: genres } = await useFetch("/api/app/my");
</script>
