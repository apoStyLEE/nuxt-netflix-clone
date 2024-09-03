<template>
  <div class="bg-black h-screen p-8 text-gray-400">
    <nav class="flex items-center justify-between">
      <div class="flex items-center space-x-8">
        <NuxtLink to="/">
          <img src="@/assets/images/logo.png" class="h-10" />
        </NuxtLink>
      </div>
    </nav>
    <div class="content"><slot /></div>
  </div>
</template>
