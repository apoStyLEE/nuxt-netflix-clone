<template>
  <h1>Protected</h1>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });
</script>
