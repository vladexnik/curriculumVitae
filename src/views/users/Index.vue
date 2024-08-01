<template>
  <div class="about">
    <h1>Users List</h1>
  </div>
</template>


<script setup lang="ts">
  import { onMounted, reactive, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import { useUserStore } from "@/stores/user";

  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);
  const router = useRouter();
  const route = useRoute();


  onMounted(() => {
    const id = route.params.idc;
    console.log('accessToken', accessToken.value)
  }
  )

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
