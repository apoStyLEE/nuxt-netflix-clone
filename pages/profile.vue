<template>
  <div class="mx-auto max-w-screen-2xl text-center pt-10">
    <h1 class="text-center text-white text-2xl">Kim İzliyor?</h1>

    <div class="flex gap-5 mt-5 text-xs justify-center">
      <div v-for="profile in userProfiles">
        <a href="#" @click.prevent="handleSelectProfile(profile)">
          <img src="/assets/images/profile1.jpg" class="w-16 mb-2" />
          <span>{{ profile.name }}</span>
        </a>
        <button
          class="block"
          v-if="manageProfile && !profile.isDefault"
          @click="handleDeleteProfile(profile.id)"
        >
          sil
        </button>
      </div>
      <div>
        <button @click="newProfileForm.showForm = !newProfileForm.showForm">
          <PlusCircleIcon class="text-white w-16 h-16 mb-2" />
          <span>Profil Ekle</span>
        </button>
        <div v-if="newProfileForm.showForm">
          <p class="text-white">Yeni bir profil ekle</p>
          <input type="text" v-model="newProfileForm.name" />
          <button @click="handleCreateUserProfile">Kaydet</button>
        </div>
      </div>
    </div>

    <button
      @click="manageProfile = !manageProfile"
      class="border border-gray-500 px-5 mt-10 text-sm"
    >
      Profilleri Yönet
    </button>
  </div>
</template>

<script setup lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/24/outline";

const { data: userProfiles, refresh } = useFetch("/api/app/userProfile");

import constants from "@/constants/starFlixConstants";

const newProfileForm = ref({
  showForm: false,
  name: "",
});

const manageProfile = ref(false);

const handleCreateUserProfile = async () => {
  await useFetch("/api/app/userProfile", {
    method: "POST",
    body: {
      name: newProfileForm.value.name,
    },
  });

  newProfileForm.value.showForm = false;
  newProfileForm.value.name = "";

  refresh();
};

const handleDeleteProfile = async (id: string) => {
  await useFetch(`/api/app/userProfile/${id}`, {
    method: "DELETE",
  });
  manageProfile.value = false;
  refresh();
};

const handleSelectProfile = (profile: any) => {
  const cookie = useCookie(constants.SELECTED_PROFILE_COOKIE_NAME, {
    maxAge: 60 * 60 * 24 * 30,
  });

  cookie.value = profile.id;

  navigateTo("/");
};
</script>
