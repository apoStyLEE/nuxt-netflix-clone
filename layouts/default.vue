<template>
  <div class="bg-black h-screen p-8 text-gray-400">
    <nav class="flex items-center justify-between">
      <div class="flex items-center space-x-8">
        <NuxtLink to="/">
          <img src="@/assets/images/logo.png" class="h-10" />
        </NuxtLink>
        <div class="flex space-x-4">
          <NuxtLink to="/about" class="hover:text-white">Home</NuxtLink>
          <NuxtLink to="/about" class="hover:text-white">Series</NuxtLink>
          <NuxtLink to="/about" class="hover:text-white">Films</NuxtLink>
          <NuxtLink to="/my/list" class="hover:text-white">My List</NuxtLink>
        </div>
      </div>

      <div>
        <a
          href="#"
          class="hover:text-white"
          @click="signOut"
          v-if="profileData"
          >{{ profileData.name }}</a
        >
        <NuxtLink to="/login" class="hover:text-white" v-else>Login</NuxtLink>
      </div>
    </nav>

    <div class="flex space-x-10 mt-10">
      <div class="sidebar w-10">
        <ul class="space-y-7">
          <li>
            <NuxtLink to="/search" class="hover:text-white"
              ><MagnifyingGlassIcon class="h-6 w-6"
            /></NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="hover:text-white"
              ><HomeIcon class="h-6 w-6"
            /></NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="hover:text-white"
              ><FilmIcon class="h-6 w-6"
            /></NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="hover:text-white"
              ><ArrowPathRoundedSquareIcon class="h-6 w-6"
            /></NuxtLink>
          </li>
        </ul>
      </div>
      <div class="content grow"><slot /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  MagnifyingGlassIcon,
  FilmIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/vue/24/outline";

const { signOut, data: authData } = useAuth();

if (!authData.value) {
  navigateTo("/login");
}

const { data: profileData } = await useFetch("/api/app/userProfile/get");

if (!profileData.value) {
  navigateTo("/profile");
}
</script>
