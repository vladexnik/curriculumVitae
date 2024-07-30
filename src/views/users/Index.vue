<template>
  <div class="about">
    <h1>Users List</h1>
  </div>
</template>


<script setup lang="ts">
  // import { storeToRefs } from "pinia";
  // import { useAuthStore } from "../stores/modules/useAuth";
  import { onMounted, reactive, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";

  // const form = reactive({
  //   email: "",
  //   password: "",
  // });

  // const show_alert = ref<boolean>(false);
  // const alert_variant = ref<string>("bg-blue-500");
  // const alert_msg = ref<string>("Please wait! We are logging you in");

  // const authStore = useAuthStore();
  // const { user } = storeToRefs(authStore);
  // const { signInUser } = authStore;
  const router = useRouter();
  const route = useRoute();


  onMounted(() => {
    const id = route.params.idc;
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
