<template>
  <div>
    <div class="fixed inset-y-0 z-50 flex w-72 flex-col">
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6"
      >
        <div class="flex h-16 shrink-0 items-center">
          <img
            class="h-8 w-auto"
            src="@/assets/images/logo.png"
            alt="Your Company"
          />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-indigo-200 hover:bg-indigo-700 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                  >
                    <component
                      :is="item.icon"
                      class="text-indigo-200 group-hover:text-white h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <main class="py-10 pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { FolderIcon, HomeIcon } from "@heroicons/vue/24/outline";

const { data: authData } = useAuth();

if (!authData.value?.user.isAdmin) {
  navigateTo("/");
}

const navigation = [
  { name: "Dashboard", href: "/admin/", icon: HomeIcon },
  { name: "Genres", href: "/admin/genres", icon: FolderIcon },
  { name: "Movies", href: "/admin/movies", icon: FolderIcon },
];
</script>

<style>
.router-link-active {
  @apply bg-indigo-900 text-white;
}
</style>
