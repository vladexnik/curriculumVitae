<template>
  <div class="about">
    <h1>Users List</h1>
    <button
      class="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      @click="signOut"
    >
      Log out
    </button>
  </div>
</template>


<script setup lang="ts">
  import { onMounted, reactive, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import { useUserStore } from "@/stores/user";

  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);
  const { logout } = userStore;
  const router = useRouter();
  const route = useRoute();

  const signOut = () => {
    logout();
    router.push({ path: "/login" });
  }


  onMounted(() => {
    const id = route.params.idc;
    console.log('accessToken INDEX', accessToken.value)
  }
  )

</script>
